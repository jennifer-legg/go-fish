// import { useGetShuffledDeck } from '../hooks/useDeck.ts'

import SocketIo from './SocketIo'

function App() {
  // const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
        <SocketIo username="Jen" />
      </div>
    </>
  )
}

export default App
