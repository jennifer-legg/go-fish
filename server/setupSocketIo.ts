import { Server } from 'socket.io'
import Player from '../models/player'
import { CallbackClientsideFn } from '../models/response'
import { Deck } from '../models/deck'
import { Game } from '../models/game'
import * as dbPlayer from './db/player'
import * as dbGame from './db/game'
import { joinGame } from './joinGame'

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
      (
        { currentPlayer, deck }: StartGameArg,
        callBack: CallbackClientsideFn,
      ) => {
        //-- TODO: GameId should not already be in use
        startGame({ currentPlayer, deck }, callBack)
      },
    )

    // When a player joins an established game
    socket.on(
      'joinGame',
      (
        { gameId, currentPlayer, maxPlayers }: JoinGameArg,
        callBack: CallbackClientsideFn,
      ) => {
        joinGame(
          { gameId, currentPlayer, maxPlayers, socketId: socket.id },
          ({ status, reason, player, game, allPlayers }) => {
            if (player && allPlayers && game && status === 'ok') {
              //If join is successful, join room and send details of player and updated player list to room
              socket.join(game.gameId)
              notifyPlayerDetails(game.gameId, player, allPlayers)
              notifyGameUpdate(game)
              callBack({ status: 'ok' })
            } else {
              callBack({ status, reason: reason ? reason : 'Server error' })
            }
          },
        )
      },
    )

    //When a player disconnects
    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.id} disconnected. Reason: ${reason}`)
      runDisconnect()
    })

    const runDisconnect = async () => {
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

    const startGame = async (
      { currentPlayer, deck }: StartGameArg,
      callBack: CallbackClientsideFn,
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
            //Notify the user that the game could not be joined
            callBack({
              status: 'failed',
              reason: 'Unable to start the game',
            })
          }
        } else {
          //Notify the user that the game could not be joined
          callBack({
            status: 'failed',
            reason: 'Unable to create game',
          })
        }
      } catch (err) {
        console.log(err instanceof Error ? err.message : 'start game failed')
        callBack({
          status: 'failed',
          reason: 'Server error',
        })
      }
    }
  })
}
