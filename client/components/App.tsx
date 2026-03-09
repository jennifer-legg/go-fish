import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'
import Player from '../../models/player.ts'
import Response from '../../models/response.ts'
import Landing from './Landing.tsx'

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const numPlayers = 2
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    username: 'testing',
    sets: 0,
    hand: [],
    gameId: '',
    id: '',
  })
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    // Player join notification. If player joining is current player, update currentPlayer as id has been added
    socket.on('playerJoinedGame', (player) => {
      console.log(`${player.id} joined room`)
      if (currentPlayer.username === player?.username) {
        setCurrentPlayer(player)
      }
    })

    // Player leave notification
    socket.on('playerLeftGame', (player) => {
      console.log(`${player.id} left room`)
    })

    // Player list updates
    socket.on('players', (players) => {
      console.log('set players', players)
      setPlayers(players)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('playerJoined')
      socket.off('playerLeft')
      socket.off('players')
      disconnectSocket()
    }
  }, [currentPlayer.username])

  // const handleLeaveGame = () => {
  //   disconnectSocket()
  //   setIsConnected(false)
  //   setPlayers([])
  //   setCurrentPlayer({
  //     username: 'testing',
  //     sets: 0,
  //     hand: [],
  //     gameId: '',
  //     id: '',
  //   })
  //   setGameId('')
  // }

  const handleJoinGame = (gameId: string) => {
    setGameId(gameId)
    connectSocket()
    socket.emit(
      'joinGame',
      { gameId, currentPlayer, maxPlayers: numPlayers },
      (response: Response) => {
        response.status === 'failed'
          ? setErrorMsg(
              'Failed to join game. Game may already have maximum players',
            )
          : setErrorMsg('')
      },
    )
  }
  return (
    <>
      <div className="app bg-lightBlue">
        <p>{errorMsg}</p>
        {!gameId && !isConnected && <Landing connectToGame={handleJoinGame} />}
        {players[0] &&
          players.map((player) => `${player.username} gameId: ${gameId}`)}
      </div>
    </>
  )
}

export default App
