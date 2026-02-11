// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import Themedbutton from './themedUI/themedButon.tsx'
import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'

function App() {
  // const { data: deck } = useGetShuffledDeck()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    // Cleanup on component unmount
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      disconnectSocket()
    }
  }, [])

  const handleConnect = () => {
    if (isConnected) {
      disconnectSocket()
      setIsConnected(false)
    } else {
      connectSocket()
      setIsConnected(true)
    }
  }

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
        <Themedbutton onClick={handleConnect}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Themedbutton>
        <p>User is {isConnected ? 'connected' : 'disconnected'}</p>
      </div>
    </>
  )
}

export default App
