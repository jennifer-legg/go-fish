import GameLayout from '../GameLayout.tsx'
import Avatar from '../Avatar.tsx'
import Chat from '../Chat.tsx'
import Dashboard from '../Dashboard.tsx'
import ScoreBoard from '../ScoreBoard.tsx'
import Opponent from '../Opponent.tsx'
import Pond from '../Pond.tsx'
import { firstHand2Players } from '../../../data/deckExample.ts'

export default function GameManager() {
  //Todo - implement functionality
  const handleGetNewCard = () => {
    console.log('Get new card')
  }
  return (
    <GameLayout
      avatarRival={<Avatar isChangeable={false} username="Opponent" />}
      avatarUser={<Avatar isChangeable={true} username="You" />}
      chat={<Chat userMsg="hi" rivalMsg="hello" />}
      dashboard={
        <Dashboard
          hand={firstHand2Players}
          gameMessage={'Welcome to Go Fish!'}
        />
      }
      score={
        <ScoreBoard
          scores={[
            { username: 'opponent', sets: 2 },
            { username: 'you', sets: 1 },
          ]}
        />
      }
      opponent={<Opponent numRivalCards={8} />}
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
