//Developed with help from https://medium.com/@dlrnjstjs/building-a-real-time-chat-application-with-react-and-socket-io-078d69d4dd6e
import { socket, connectSocket, disconnectSocket } from '../../socket.js'
import { useEffect, useState } from 'react'
import Player, { RivalPlayer } from '../../models/player.ts'
import Themedbutton from './themedUI/themedButon.tsx'
import Response from '../../models/response.ts'

interface Props {
  username: string
}

export default function SocketIo({ username }: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [rivalPlayers, setRivalPlayers] = useState<RivalPlayer[]>([])
  const numPlayers = 2
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    username,
    sets: 0,
    hand: [],
    gameId: '',
    id: '',
  })
  const [errorMsg, setErrorMsg] = useState<string>('')
  //'Testing' to see if join a room works ok - these will be unique codes for each game
  const [gameId, setGameId] = useState<string>('testing')
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

    // Player join notification. If player joining is current player, update currentPlayer as id has been added
    socket.on('playerJoinedGame', (player) => {
      console.log(`${player.id} joined room`)
      setIsJoined(true)
      if (currentPlayer.username === player?.username) {
        setCurrentPlayer(player)
      }
    })

    // Player leave notification
    socket.on('playerLeftGame', (player) => {
      console.log(`${player.id} left room`)
      setIsJoined(false)
      setGameId('testing')
    })

    // Player list updates
    socket.on('players', (rivalPlayers: RivalPlayer[]) => {
      console.log('set players', rivalPlayers)
      setRivalPlayers(rivalPlayers)
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

  const handleLeaveGame = () => {
    disconnectSocket(gameId)
    setIsJoined(false)
    setIsConnected(false)
    setRivalPlayers([])
    setCurrentPlayer({ username, sets: 0, hand: [], gameId: '', id: '' })
  }

  const handleJoinGame = () => {
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
      {!isConnected && (
        <>
          <Themedbutton onClick={handleJoinGame}>Join a game</Themedbutton>
          <p>User is disconnected</p>
        </>
      )}
      {errorMsg && <p>{errorMsg}</p>}
      {isConnected && isJoined && (
        <>
          <Themedbutton onClick={handleLeaveGame}>Leave game</Themedbutton>
          <p>Game: {gameId}</p>
          <p>
            Players in game (room):{' '}
            <ul>
              {rivalPlayers.map((player) => (
                <li key={player.username}>player.username</li>
              ))}
              <li>{currentPlayer.username} (you)</li>
            </ul>
          </p>
        </>
      )}
    </>
  )
}
