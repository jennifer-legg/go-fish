import { Server } from 'socket.io'
import Player, { RivalPlayer } from '../models/player'
import Response from '../models/response'
import { Game, GameCollection } from '../models/game'
import { p } from 'motion/react-client'

//Initialise storage for connected players
const activeGames: GameCollection = {}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(activeGames.testing, 'on connection')
    console.log(`a user connected ${socket.id}`)

    //When a player joins a game (a socket io room)
    socket.on('joinGame', ({ gameId, currentPlayer, maxPlayers }, callBack) => {
      //Add socket id and game id to the player object
      const updatedPlayer: Player = {
        ...currentPlayer,
        id: socket.id,
        gameId,
      }
      //Check if the game exists already
      if (gameId in activeGames) {
        const currentGame = activeGames[gameId]
        //If it exists, check if the game has less than the specified number of players.
        //If it has less than max, add player to game. If not, fail connection.
        console.log(currentGame.players.length < maxPlayers)
        if (currentGame.players.length < maxPlayers) {
          //Add player to game storage
          currentGame.players = [...currentGame.players, currentPlayer]
          console.log(activeGames.testing.players, 'after add')
          //Add player to room
          socket.join(gameId)
          //Notify all players in the game that a player has joined
          io.to(gameId).emit('playerJoinedGame', updatedPlayer.username)
          //Send updated player list to users except current user
          socket.to(gameId).emit(
            'rivalPlayers',
            currentGame.players.map((player) => {
              if (player.id !== updatedPlayer.id) {
                return {
                  username: player.username,
                  numCards: player.hand.length,
                  sets: player.sets,
                } as RivalPlayer
              }
            }),
          )
          //Send updated player with id to current player
          io.to(socket.id).emit('currentPlayer', updatedPlayer)
          //Notify the user that the game has been joined
          const response: Response = { status: 'ok' }
          callBack(response)
        } else {
          //Notify the user that the game could not be joined and disconnect
          const response: Response = { status: 'failed' }
          callBack(response)
          socket.disconnect()
        }
      } else {
        //If it doesn't exist, create game object with no cards/deck and add to storage
        const newGame: Game = {
          players: [{ ...updatedPlayer, id: socket.id }],
          pond: [],
        }
        activeGames[gameId] = newGame
        console.log(activeGames.testing.players, 'after creation')
        //Add player to room
        socket.join(gameId)
        //Notify all players in the game that a player has joined
        io.to(gameId).emit('playerJoinedGame', updatedPlayer.username)
        //Send updated player with id to current player
        io.to(socket.id).emit('currentPlayer', updatedPlayer)
        //Notify player that new game has been created
        const response: Response = { status: 'ok' }
        callBack(response)
      }
    })

    //When a player disconnects
    socket.on('disconnect', (gameId: string) => {
      console.log(`user ${socket.id} disconnected`)
      if (gameId in activeGames) {
        const player = activeGames[gameId].players.filter((player) => player.id)
        if (player) {
          //Check if there are any other players in the game
          if (activeGames[gameId].players.length > 1) {
            //Keep game active
            //Send update about player having left to remaining players in game (socket room)
            socket.to(gameId).emit('playerLeftGame', player)
            //TODO: Remove player from storage - should some values be left to continue game on rejoin?
            activeGames[gameId].players = activeGames[gameId].players.filter(
              (player) => player.id != socket.id,
            )
            //Advise remaining player that player has left, and send list of remaining players
            const remainingPlayersInGame: string[] = activeGames[
              gameId
            ].players.map((player) => player.username)
            io.to(gameId).emit('playerLeftGame', remainingPlayersInGame)
          } else {
            //Delete game
            delete activeGames[gameId]
            //Disconnect all remaining players in room
            io.in(gameId).disconnectSockets(true)
          }
        }
      }
    })
  })
}
