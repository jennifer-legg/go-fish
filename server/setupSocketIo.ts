import { Server } from 'socket.io'
import Player, { PlayerCollection } from '../models/player'

//Initialise storage for connected players
const players: PlayerCollection = {}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    //When a player joins a game (a socket io room)
    socket.on('joinGame', ({ gameId, currentPlayer }) =>
      //Add player to storage
      {
        const updatedPlayer: Player = {
          ...currentPlayer,
          gameId,
          id: socket.id,
        }
        players[socket.id] = updatedPlayer
        console.log(players)

        //Join the specified game
        socket.join(gameId)

        //Notify other players in the game about the new player
        io.to(gameId).emit('playerJoinedGame', updatedPlayer)

        //Send updated player list to all users in the room
        const playersInGame: Player[] = Object.values(players).filter(
          (player) => player.gameId === gameId,
        )
        io.to(gameId).emit('players', playersInGame)
      },
    )

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
