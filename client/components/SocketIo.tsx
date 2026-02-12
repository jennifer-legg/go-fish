//Developed with help from https://medium.com/@dlrnjstjs/building-a-real-time-chat-application-with-react-and-socket-io-078d69d4dd6e
import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'
import Themedbutton from './themedUI/themedButon.tsx'
import Player from '../../models/player.ts'
import StartGameOptions from './StartGameOptions.tsx'
import { connect } from 'superagent'

interface Props {
  username: string
}

export default function SocketIo({ username }: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<null | Player>(null)
  const [gameId, setGameId] = useState<string>('')
  const [isJoined, setIsJoined] = useState<boolean>(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    // Player join notification
    socket.on('playerJoined', (data) => {
      console.log('joined a room', data)
      //Todo: what happens on player joining?
    })

    // Player leave notification
    socket.on('playerLeft', (data) => {
      console.log('left a room', data)
      //Todo: what happens on player leaving?
    })

    // Player list updates
    socket.on('players', (players) => {
      setPlayers(players)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('userJoined')
      socket.off('userLeft')
      socket.off('roomUsers')
      disconnectSocket()
    }
  }, [])

  const handleLeaveGame = () => {
    disconnectSocket()
    setIsJoined(false)
    setCurrentPlayer(null)
    setPlayers([])
  }

  const handleCreateNewGame = () => {
    const player = connectPlayer()
    //Todo: Create random string function
    const gameId = randomString
    socket.emit('newGameId')
  }

  const handleJoinExistingGame = () => {
    const player = connectPlayer()
    socket.emit('joinGame', { gameId, player })
  }

  const connectPlayer = () => {
    connectSocket()
    const player: Player = { gameId, username, hand: [], sets: 0 }
    setCurrentPlayer(player)
    return player
  }

  return (
    <>
      {!isConnected && !gameId && (
        <StartGameOptions
          createNew={handleCreateNewGame}
          joinExisting={handleJoinExistingGame}
        />
      )}

      <p>User is {isConnected ? 'connected' : 'disconnected'}</p>
    </>
  )
}
