import { useGetShuffledDeck } from '../hooks/useDeck.ts'

function App() {
  const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
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
