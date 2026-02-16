// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import SocketIo from './SocketIo'
import TitleWrapper from './TitleWrapper.tsx'

function App() {
  // const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        {/* Todo: make username unique */}
        <TitleWrapper>
          <SocketIo username="Jen" />
        </TitleWrapper>
      </div>
    </>
  )
}

export default App
