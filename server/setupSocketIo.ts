import { Server } from 'socket.io'

export default function setupSocketIO(io: Server): void {
  //Client connections
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
    })
  })
}
