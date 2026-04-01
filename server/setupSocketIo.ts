import { Server } from 'socket.io'
import Player from '../models/player'
import Response, { CallbackFunction } from '../models/response'
import dealCards, { DealCardsResult } from '../client/util/dealCards'
import { Deck } from '../models/deck'
import { Game } from '../models/game'
import * as dbPlayer from './db/player'
import * as dbGame from './db/game'

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
        //1. TODO: GameId should not already be in use
          //Add game to database
          addGameToDatabase(deck, (game: Game | undefined) => {
            if (game) {
              notifyGameUpdate(game)
            } else {
              //Notify the user that the game could not be joined and disconnect
              callBack({
                status: 'failed',
                reason: 'Invalid access code',
              })
              socket.disconnect()
        }
          })
          // addPlayerToGame(gameId, currentPlayer)
          // //Notify all players that the game has been joined
          // notifyPlayerDetails(gameId)
          // callBack({ status: 'ok' })
        } 
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
        if (
          //criteria above
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

    const notifyPlayerDetails = (
      gameId: string,
      updatedPlayer: Player,
      playerArr: Player[],
    ) => {
      //Update current player
      io.to(socket.id).emit('updateCurrentPlayer', updatedPlayer)
      //Send updated player list to all users in the room
      io.to(gameId).emit('players', playerArr)
    }

    const notifyGameUpdate = (game: Game) => {
      //Send updated pond to all users/players in the game room
      io.to(game.gameId).emit('gameUpdated', game.pond)
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
  deck: Deck,
  callback: (game: Game | undefined) => void,
) => {
  try {
    const gameSaved = await dbGame.addNewGame(deck.cards)
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
