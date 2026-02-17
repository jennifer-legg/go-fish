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

    // Player join notification.
    socket.on('playerJoinedGame', (username) => {
      console.log(`${username} joined game`)
      username === currentPlayer.username ? setIsJoined(true) : null
    })

    // Player leave notification
    socket.on('playerLeftGame', (username) => {
      console.log(`${username} left room`)
      username === currentPlayer.username ? setIsJoined(false) : null
      setGameId('testing')
    })

    // Rival player list updates
    socket.on('rivalPlayers', (rivalPlayers: RivalPlayer[]) => {
      console.log('set players', rivalPlayers)
      setRivalPlayers(rivalPlayers)
    })

    // Current player updates
    socket.on('currentPlayer', (player) => {
      console.log('update current player')
      setCurrentPlayer(player)
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
                <li key={player.username}>{player.username}</li>
              ))}
              <li>{currentPlayer.username} (you)</li>
            </ul>
          </p>
        </>
      )}
    </>
  )
}
