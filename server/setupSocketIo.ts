import { Server } from 'socket.io'
import Player, { PlayerCollection } from '../models/player'
import Response from '../models/response'

//Initialise storage for connected players
const players: PlayerCollection = {}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    //When a player joins a game (a socket io room)
    socket.on('joinGame', ({ gameId, currentPlayer, maxPlayers }, callBack) => {
      //Check if the game has less than the specified number of players, adds player if not at max
      const roomSize: number = Object.values(players).filter(
        (player) => player.gameId === gameId,
      ).length
      if (roomSize < maxPlayers) {
        //Add player to storage
        const updatedPlayer: Player = {
          ...currentPlayer,
          gameId,
          id: socket.id,
        }
        players[socket.id] = updatedPlayer
        //Join the specified game if game has less than specified number of players
        socket.join(gameId)

        //Notify other players in the game about the new player
        io.to(gameId).emit('playerJoinedGame', updatedPlayer)

        //Send updated player list to all users in the room
        const playersInGame: Player[] = Object.values(players).filter(
          (player) => player.gameId === gameId,
        )
        io.to(gameId).emit('players', playersInGame)
        //Notify the user that the game has been joined
        const response: Response = { status: 'ok' }
        callBack(response)
      } else {
        //Notify the user that the game could not be joined and disconnect
        const response: Response = { status: 'failed' }
        callBack(response)
        socket.disconnect()
      }
    })

    //When a player disconnects
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
      const player = players[socket.id]
      if (player) {
        //Send update about player having left to remaining players in game (socket room)
        socket.to(player.gameId).emit('playerLeftGame', player)
        //Remove player from storage
        delete players[socket.id]
        //Update players list for front-end
        const remainingPlayersInGame: Player[] = Object.values(players).filter(
          (p) => p.gameId === player.gameId,
        )
        io.to(player.gameId).emit('playerLeftGame', remainingPlayersInGame)
      }
    })
  })
}
