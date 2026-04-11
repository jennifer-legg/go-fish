import { Server } from 'socket.io'
import Player from '../models/player'
import { CallbackFunction } from '../models/response'
import { Deck } from '../models/deck'
import { Game } from '../models/game'
import * as dbPlayer from './db/player'
import * as dbGame from './db/game'
import dealCards from '../client/util/dealCards'

interface StartGameArg {
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
      ({ currentPlayer, deck }: StartGameArg, callBack: CallbackFunction) => {
        //-- TODO: GameId should not already be in use
        startGame({ currentPlayer, deck }, callBack)
      },
    )

    // When a player joins an established game
    socket.on(
      'joinGame',
      (
        { gameId, currentPlayer, maxPlayers }: JoinGameArg,
        callBack: CallbackFunction,
      ) => {
        joinGame({ gameId, currentPlayer, maxPlayers }, callBack)
      },
    )

    //When a player disconnects
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
      disconnect()
    })

    const disconnect = async () => {
      try {
        //Change player's status in database
        const disconnectedPlayer = await dbPlayer.changeActiveStatus(
          false,
          socket.id,
        )
        //Notify remaining players that player has disconnected
        if (disconnectedPlayer) {
          io.to(disconnectedPlayer.gameId).emit(
            'playerInactive',
            disconnectedPlayer,
          )
        }
      } catch (err) {
        console.log(
          err instanceof Error
            ? err.message
            : 'Change status to inactive failed',
        )
      }
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
      //Send updated game to all users/players in the game room
      io.to(game.gameId).emit('updateGameDetails', game)
    }

    const joinGame = async (
      { gameId, currentPlayer, maxPlayers }: JoinGameArg,
      callBack: CallbackFunction,
    ) => {
      //-- TODO -- http query to check if username is in use in real time
      try {
        //Get game/player data from database, checking the following criteria:
        //1. Game should already be in database
        //2. Game should have at least one player
        //3. Game should have less than the max number of players
        //4. Username should not be in use within the established game.
        const allPlayers = await dbPlayer.getAllPlayersInGame(gameId)
        const game = await dbGame.getGameById(gameId)
        if (
          game &&
          allPlayers.length != 0 &&
          allPlayers.length < maxPlayers &&
          allPlayers.filter(
            (player) => player.username === currentPlayer.username,
          ).length === 0
        ) {
          //If game will be at max players with addition of this joining player,
          //deal cards from game pond to each player and add remaining cards to game pond
          if (allPlayers.length + 1 === maxPlayers) {
            //Deal cards from game pond
            const { hands, pond } = dealCards(maxPlayers, game.pond)
            //Add hands and players to database
            const updatedOpponent = await dbPlayer.editPlayer({
              ...allPlayers[0],
              hand: hands[1],
            })
            const updatedPlayer = await dbPlayer.addNewPlayer({
              ...currentPlayer,
              hand: hands[0],
              socketId: socket.id,
              gameId,
              isActive: true,
            })
            //Update pond in database
            const updatedGame = await dbGame.editPondInGame({
              pond,
              gameId,
            })
            if (updatedPlayer && updatedOpponent && updatedGame) {
              //Join socket room and update client for all players with game/player details
              socket.join(gameId)
              notifyPlayerDetails(gameId, updatedPlayer, [
                updatedOpponent,
                updatedPlayer,
              ])
              notifyGameUpdate(updatedGame)
            } else {
              callBack({
                status: 'failed',
                reason: 'Server error',
              })
              socket.disconnect()
            }
          } else {
            //Add currentplayer to database
            const updatedPlayer = await dbPlayer.addNewPlayer({
              ...currentPlayer,
              socketId: socket.id,
            })
            //Notify all players that the game has been joined
            if (updatedPlayer) {
              socket.join(gameId)
              notifyPlayerDetails(gameId, updatedPlayer, [
                ...allPlayers,
                updatedPlayer,
              ])
              notifyGameUpdate(game)
            }
          }
          callBack({ status: 'ok' })
        } else {
          const reason: string =
            !game || allPlayers.length != 0
              ? 'Game does not exist'
              : allPlayers.length < maxPlayers
                ? 'Game already has the maximum number of players'
                : 'Username is already in use. Choose a new username'
          callBack({
            status: 'failed',
            reason,
          })
          socket.disconnect()
        }
      } catch (err) {
        console.log(err instanceof Error ? err.message : 'Join game failed')
        callBack({
          status: 'failed',
          reason: 'Server error',
        })
        socket.disconnect()
      }
    }

    const startGame = async (
      { currentPlayer, deck }: StartGameArg,
      callBack: CallbackFunction,
    ) => {
      try {
        //Add game to database
        const newGame: Game | undefined = await dbGame.addNewGame(deck.cards)
        if (newGame) {
          //Add player to database
          const newPlayer: Player | undefined = await dbPlayer.addNewPlayer({
            ...currentPlayer,
            gameId: newGame.gameId,
            socketId: socket.id,
            isActive: true,
          })
          if (newPlayer) {
            //Join socket.io room, gameId is the room name
            socket.join(newGame.gameId)
            //Notify players of updated player data
            notifyPlayerDetails(newGame.gameId, newPlayer, [newPlayer])
            //Notify players of update game data
            notifyGameUpdate({
              gameId: newGame.gameId,
              pond: newGame.pond,
            })
            callBack({ status: 'ok' })
          } else {
            //Notify the user that the game could not be joined and disconnect
            callBack({
              status: 'failed',
              reason: 'Unable to start the game',
            })
            socket.disconnect()
          }
        } else {
          //Notify the user that the game could not be joined and disconnect
          callBack({
            status: 'failed',
            reason: 'Unable to create game',
          })
          socket.disconnect()
        }
      } catch (err) {
        console.log(err instanceof Error ? err.message : 'start game failed')
        callBack({
          status: 'failed',
          reason: 'Server error',
        })
        socket.disconnect()
      }
    }
  })
}
