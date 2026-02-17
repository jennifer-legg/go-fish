// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import { useState } from 'react'
import SocketIo from './SocketIo'
import Themedbutton from './themedUI/ThemedButton.tsx'
import ThemedContainer from './themedUI/ThemedContainer.tsx'
import ThemedText from './themedUI/ThemedText.tsx'
import TitleWrapper from './TitleWrapper.tsx'
import ThemedTextInput from './themedUI/ThemedTextInput.tsx'

function App() {
  // const { data: deck } = useGetShuffledDeck()
  const [joinGame, setJoinGame] = useState(false)
  const [startAGame, setStartAGame] = useState(false)

  return (
    <>
      <div className="app bg-lightBlue">
        {/* Todo: make username unique */}
        <TitleWrapper>
          <ThemedContainer classname="w-3/5 min-w-[248px] md:w-4/5 h-44 md:h-80 lg:h-90 ">
            {!startAGame && !joinGame && (
              <Themedbutton onClick={() => setJoinGame(true)} color="darkBlue">
                <ThemedText>Join a Game</ThemedText>
              </Themedbutton>
            )}
            {!startAGame && !joinGame && (
              <Themedbutton
                onClick={() => setStartAGame(true)}
                color="darkBlue"
              >
                <ThemedText>Start a Game</ThemedText>
              </Themedbutton>
            )}
            {joinGame && (
              <div className="flex flex-col items-center">
                <ThemedText header={true}> ACCESS CODE </ThemedText>
                <ThemedTextInput>
                  <ThemedText>asjhda89123 </ThemedText>
                </ThemedTextInput>
              </div>
            )}
          </ThemedContainer>
          {/* <SocketIo username="Jen" /> */}
        </TitleWrapper>
      </div>
    </>
  )
}

export default App
