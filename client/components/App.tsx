import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'
import Player from '../../models/player.ts'
import Response from '../../models/response.ts'
import Landing from './pages/Landing.tsx'
import { Deck } from '../../models/deck.ts'
import GameManager from './pages/GameManager.tsx'
import { Game } from '../../models/game.ts'

const emptyGame: Game = {
  pond: [],
  gameId: '',
}

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const numPlayers = 2
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    username: 'testing',
    sets: 0,
    hand: [],
    gameId: '',
    socketId: '',
    avatar: '../images/Fish.svg',
    isActive: true,
  })
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [game, setGame] = useState<Game>(emptyGame)
  const [gameMessage] = useState<string>('Welcome to Go Fish!')
  console.log(isConnected, players, currentPlayer, game)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server', reason)
      setIsConnected(false)
    })

    //Show other players as inactive if disconnected
    socket.on('playerInactive', (player: Player) => {
      setPlayers((prev) =>
        prev.map((item) => (item.socketId === player.socketId ? player : item)),
      )
    })

    // Update current player.
    socket.on('updateCurrentPlayer', (player: Player) => {
      console.log('updateCurrentPlayer', player)
      setCurrentPlayer(player)
    })

    // Player leave notification
    socket.on('playerLeftGame', (player: Player) => {
      console.log(`${player.username} left room`)
    })

    //Update game info
    socket.on('updateGameDetails', (game: Game) => {
      console.log('set game', game)
      setGame(game)
    })

    // Player list updates
    socket.on('players', (updatedPlayers: Player[]) => {
      console.log('set players', updatedPlayers)
      setPlayers(updatedPlayers)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('updateCurrentPlayer')
      socket.off('playerInactive')
      socket.off('playerLeftGame')
      socket.off('updateGameDetails')
      socket.off('players')
      disconnectSocket()
    }
  }, [])

  const handleJoinGame = (gameId: string, username: string) => {
    const updatedPlayer = { ...currentPlayer, username }
    setCurrentPlayer(updatedPlayer)
    setGame({ ...game, gameId })
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

  const handleStartGame = (username: string, deck: Deck) => {
    const updatedPlayer = { ...currentPlayer, username }
    setCurrentPlayer(updatedPlayer)
    socket.emit(
      'startGame',
      { currentPlayer: updatedPlayer, deck },
      (response: Response) => {
        response.status === 'failed'
          ? setErrorMsg(
              response.reason ? response.reason : 'Error starting game.',
            )
          : setErrorMsg('')
      },
    )
  }

  const handleConnect = () => {
    connectSocket()
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
            accessCode={game.gameId}
            connectToSocket={handleConnect}
          />
        )}
        {game.gameId && isConnected && players.length === numPlayers && (
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
