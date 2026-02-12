// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import Themedbutton from './themedUI/themedButon.tsx'
import SocketIo from './SocketIo'
import TitleWrapper from './TitleWrapper.tsx'

function App() {
  // const { data: deck } = useGetShuffledDeck()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Go Fish</h1>
        <Themedbutton onClick={() => console.log('button clicked')}>
          Hello
        </Themedbutton>
        <TitleWrapper />
        <SocketIo username="Jen" />
      </div>
    </>
  )
}

export default App
