import { Server } from 'socket.io'
import Player from '../models/player'
import Response from '../models/response'
import { Game, GameCollection } from '../models/game'

//Initialise storage for connected players
const activeGames: GameCollection = {}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    //When a player joins a game (a socket io room)
    socket.on('joinGame', ({ gameId, currentPlayer, maxPlayers }, callBack) => {
      //Add socket id to the player object
      const updatedPlayer: Player = {
        ...currentPlayer,
        id: socket.id,
      }
      //Check if the game exists already
      if (gameId in activeGames) {
        const currentGame = activeGames[gameId]
        //If it exists, check if the game has less than the specified number of players.
        //If it has less than max, add player to game. If not, fail connection.
        if (currentGame.players.length < maxPlayers) {
          //Add player to game storage
          currentGame.players = [...currentGame.players, currentPlayer]
          //Add player to room
          socket.join(gameId)
          //Notify other players in the game about the new player
          io.to(gameId).emit('playerJoinedGame', updatedPlayer)
          //Send updated player list to all users in the room
          // const playersInGame: Player[] = Object.values(players).filter(
          //   (player) => player.gameId === gameId,
          // )
          // io.to(gameId).emit('players', playersInGame)
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
        //Add player to room
        socket.join(gameId)
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
            //TODO: Update storage
            //Advise remaining player that player has left, and send list of remaining players
            const remainingPlayersInGame: string[] = activeGames[
              gameId
            ].players.map((player) => player.username)
            io.to(gameId).emit('playerLeftGame', remainingPlayersInGame)
          } else {
            //Delete game
            delete activeGames[gameId]
          }
        }
      }
    })
  })
}
