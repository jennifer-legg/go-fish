import { Server } from 'socket.io'
import Player, { PlayerCollection } from '../models/player'
import Response, { CallbackFunction } from '../models/response'
import dealCards, { DealCardsResult } from '../client/util/dealCards'
import { Deck } from '../models/deck'
import { Game, GameWithPlayers, GameCollection } from '../models/game'
import * as dbPlayer from './db/player'
import * as dbGame from './db/game'

//Initialise storage for connected players and game
const playerStorage: PlayerCollection = {}
const gameStorage: GameCollection = {}

interface StartGameArg {
  gameId: string
  currentPlayer: Player
  deck: Deck
}

interface JoinGameArg {
  gameId: string
  currentPlayer: Player
  maxPlayers: number
}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    //When a player starts a new game
    socket.on(
      'startGame',
      (
        { gameId, currentPlayer, deck }: StartGameArg,
        callBack: CallbackFunction,
      ) => {
        //1. GameId should not already be in use
        if (!gameStorage[gameId]) {
          //Add new game to storage
          gameStorage[gameId] = {
            gameId,
            pond: deck.cards,
          }
          //Add game to database
          addGameToDatabase(gameId, deck)
          addPlayerToGame(gameId, currentPlayer)
          //Notify all players that the game has been joined
          notifyPlayerDetails(gameId, playerStorage[socket.id])
          callBack({ status: 'ok' })
        } else {
          //Notify the user that the game could not be joined and disconnect
          callBack({
            status: 'failed',
            reason: 'Invalid access code',
          })
          socket.disconnect()
        }
      },
    )

    //When a player joins an established game
    socket.on(
      'joinGame',
      (
        { gameId, currentPlayer, maxPlayers }: JoinGameArg,
        callBack: CallbackFunction,
      ) => {
        //1. Username should not be in use within the established game
        //2. Game should have less than the specified number of players
        //3. GameId should already be in use
        const playersInGame = Object.values(playerStorage).filter(
          (player) => player.gameId === gameId,
        )
        const usernameTaken =
          playersInGame.filter(
            (player) => player.username === currentPlayer.username,
          ).length >= 1
        //Check if room has less than max players and if username is taken
        if (
          playersInGame.length < maxPlayers &&
          playersInGame.length >= 1 &&
          !usernameTaken
        ) {
          //Add player to storage and join room
          addPlayerToGame(gameId, currentPlayer)
          //Deal cards to players if game at max number of players
          if (playersInGame.length + 1 === maxPlayers) {
            const { hands, pond }: DealCardsResult = dealCards(
              2,
              gameStorage[gameId].pond,
            )
            //Add pond to game storage in database
            updatePond({ gameId, pond })
            //Add hands to player storage
            //Notify all players that the game has been joined
            notifyPlayerDetails(gameId, playerStorage[socket.id])
            callBack({ status: 'ok' })
          } else {
            //Notify the user that the game could not be joined and disconnect
            const reason: string = usernameTaken
              ? 'Unable to join game, username already in use.'
              : playersInGame.length < 1
                ? 'Invalid access code'
                : playersInGame.length >= maxPlayers
                  ? 'Unable to join game, max players reached'
                  : 'Error joining game'
            const response: Response = { status: 'failed', reason }
            callBack(response)
            socket.disconnect()
          }
        }
      },
    )

    //Logging into an established or new game
    const addPlayerToGame = async (gameId: string, currentPlayer: Player) => {
      //Add player to global storage
      const updatedPlayer: Player = {
        ...currentPlayer,
        gameId,
        socketId: socket.id,
      }
      playerStorage[socket.id] = updatedPlayer
      //Add joined player socketid to gamestorage
      gameStorage[gameId].playersSocketId.push(socket.id)
      //Join the specified game
      socket.join(gameId)
      //Add player to database
      console.log(updatedPlayer, 'one')
      addPlayerToDatabase(updatedPlayer)
    }

    const notifyPlayerDetails = (gameId: string, updatedPlayer: Player) => {
      //Notify other players in the game about the new player
      io.to(gameId).emit('playerJoinedGame', updatedPlayer)
      //Send updated player list to all users in the room
      const updatedPlayersInGame: Player[] = Object.values(
        playerStorage,
      ).filter((player) => player.gameId === gameId)
      io.to(gameId).emit('players', updatedPlayersInGame)
    }

    //When a player disconnects
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
      const player = playerStorage[socket.id]
      if (player) {
        //Send update about player having left to remaining players in game (socket room)
        socket.to(player.gameId).emit('playerLeftGame', player)
        //Remove player from storage
        delete playerStorage[socket.id]
        //Update players list for front-end
        const remainingPlayersInGame: Player[] = Object.values(
          playerStorage,
        ).filter((p) => p.gameId === player.gameId)
        io.to(player.gameId).emit('playerLeftGame', remainingPlayersInGame)
      }
    })
  })
}

const addGameToDatabase = async (
  gameId: string,
  deck: Deck,
  callback: (game: Game | undefined) => void,
) => {
  try {
    const gameSaved = await dbGame.addGame({
      pond: deck.cards,
      gameId,
    })
    callback(gameSaved)
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'failed')
  }
}

const addPlayerToDatabase = async (player: Player) => {
  try {
    const playerSaved = await dbPlayer.addNewPlayer(player)
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'failed')
  }
}

const editPlayerInDatabase = async (player: Player) => {
  try {
    const playerEdited = await dbPlayer.editPlayer(player)
    console.log(playerEdited)
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'failed')
  }
}

const updatePond = async (game: Game) => {
  try {
    const gameEdited = await dbGame.editPondInGame(game)
    console.log(gameEdited)
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'failed')
  }
}
