// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import SocketIo from './SocketIo'
import TitleWrapper from './TitleWrapper.tsx'

function App() {
  // const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
        {/* Todo: make username unique */}
        <TitleWrapper>
          <SocketIo username="Jen" />
        </TitleWrapper>
      </div>
    </>
  )
}

export default App
