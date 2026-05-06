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
  handleGoFish: () => void
  pondIsEmpty: boolean
}

export default function GameManager({
  gameMessage,
  currentPlayer,
  players,
  handleGoFish,
  pondIsEmpty,
}: Props) {
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
          isActive={
            players.filter(
              (player) => player.username != currentPlayer.username,
            )[0]?.isActive
          }
        />
      }
      pond={
        <Pond
          currentCard={null}
          buttonDisabled={pondIsEmpty}
          getNewCard={handleGoFish}
        />
      }
    />
  )
}
