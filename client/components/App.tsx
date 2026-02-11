import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import Themedbutton from './themedUI/themedButon.tsx'
import TitleWrapper from './TitleWrapper.tsx'

function App() {
  const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
        <Themedbutton onClick={() => console.log('button clicked')}>
          Hello
        </Themedbutton>
        <TitleWrapper />
        {deck && (
          <p>
            {deck.cards.length} cards:{' '}
            {deck.cards.map((card) => `${card.value} ${card.suit}, `)}
          </p>
        )}
      </div>
    </>
  )
}

export default App
