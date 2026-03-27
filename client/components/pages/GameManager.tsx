import GameLayout from '../GameLayout.tsx'
import Avatar from '../Avatar.tsx'
import Chat from '../Chat.tsx'
import Dashboard from '../Dashboard.tsx'
import ScoreBoard from '../ScoreBoard.tsx'
import Opponent from '../Opponent.tsx'
import Pond from '../Pond.tsx'
import Player from '../../../models/player.ts'

interface Props {
  gameMessage: string
  currentPlayer: Player
  players: Player[]
}

export default function GameManager({
  gameMessage,
  currentPlayer,
  players,
}: Props) {
  //Todo - implement functionality
  const handleGetNewCard = () => {
    console.log('Get new card')
  }
  return (
    <GameLayout
      avatarUser={<Avatar username={currentPlayer.username} />}
      chat={<Chat userMsg="hi" rivalMsg="hello" />}
      dashboard={
        <Dashboard hand={currentPlayer.hand} gameMessage={gameMessage} />
      }
      score={
        <ScoreBoard
          scores={players.map((player) => {
            return { username: player.username, sets: player.sets }
          })}
        />
      }
      opponent={
        <Opponent
          numRivalCards={
            players.filter(
              (player) => player.username != currentPlayer.username,
            )[0]?.hand.length
          }
          username={
            players.filter(
              (player) => player.username != currentPlayer.username,
            )[0]?.username
          }
          avatar={
            players.filter(
              (player) => player.username != currentPlayer.username,
            )[0]?.avatar
          }
        />
      }
      pond={
        <Pond
          currentCard={null}
          buttonDisabled={true}
          getNewCard={handleGetNewCard}
        />
      }
    />
  )
}
