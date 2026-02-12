import { Server } from 'socket.io'

//Socket.io server functions
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
    })
  })
}
