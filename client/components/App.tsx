import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'
import Player from '../../models/player.ts'
import Response from '../../models/response.ts'
import Landing from './pages/Landing.tsx'
import { Deck } from '../../models/deck.ts'
import GameManager from './pages/GameManager.tsx'

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
    avatar: '../images/Fish.svg',
  })
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [gameId, setGameId] = useState<string>('')
  const [gameMessage] = useState<string>('Welcome to Go Fish!')

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

  const handleJoinGame = (gameId: string, username: string) => {
    const updatedPlayer = { ...currentPlayer, username }
    setCurrentPlayer(updatedPlayer)
    setGameId(gameId)
    connectSocket()
    socket.emit(
      'joinGame',
      { gameId, currentPlayer: updatedPlayer, maxPlayers: numPlayers },
      (response: Response) => {
        response.status === 'failed'
          ? setErrorMsg(
              response.reason ? response.reason : 'Error joining game.',
            )
          : setErrorMsg('')
      },
    )
  }

  const handleStartGame = (gameId: string, username: string, deck: Deck) => {
    const updatedPlayer = { ...currentPlayer, username }
    setCurrentPlayer(updatedPlayer)
    setGameId(gameId)
    connectSocket()
    socket.emit(
      'startGame',
      { gameId, currentPlayer: updatedPlayer, deck },
      (response: Response) => {
        response.status === 'failed'
          ? setErrorMsg(
              response.reason ? response.reason : 'Error starting game.',
            )
          : setErrorMsg('')
      },
    )
  }

  //Todo - implement functionality
  // const handleGetNewCard = () => {
  //   console.log('Get new card')
  // }

  return (
    <>
      <div className="app bg-lightBlue">
        {players.length !== numPlayers && (
          <Landing
            handleJoinGame={handleJoinGame}
            handleStartGame={handleStartGame}
            numPlayersNeeded={numPlayers - players.length}
            errorMsg={errorMsg}
          />
        )}
        {gameId && isConnected && players.length === numPlayers && (
          <GameManager
            players={players}
            currentPlayer={currentPlayer}
            gameMessage={gameMessage}
          />
        )}
      </div>
    </>
  )
}

export default App
