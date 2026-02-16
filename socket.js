import io from 'socket.io-client'

// Use environment variable for production deployment
// TODO: correct below for on deployment
// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000'
const SOCKET_URL = 'http://localhost:3000'

// Create Socket.io client instance with configuration
export const socket = io(SOCKET_URL, {
  // Disable auto-connection for manual control
  autoConnect: false,
  // Reconnection settings for network reliability
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

// Helper functions for connection management
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}
