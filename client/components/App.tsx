// import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import { useEffect, useState } from 'react'
import SocketIo from './SocketIo'
import Themedbutton from './themedUI/ThemedButton.tsx'
import ThemedContainer from './themedUI/ThemedContainer.tsx'
import ThemedText from './themedUI/ThemedText.tsx'
import TitleWrapper from './TitleWrapper.tsx'
import ThemedTextInput from './themedUI/ThemedTextInput.tsx'
import { preview } from 'vite'

function App() {
  // const { data: deck } = useGetShuffledDeck()
  const [joinGame, setJoinGame] = useState(false)
  const [startAGame, setStartAGame] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [started, setStarted] = useState<boolean>(false)

  const resetGame = () => {
    setAccessCode('')
    setJoinGame(false)
    setStartAGame(false)
    setStarted(false)
  }

  return (
    <>
      <div className="app bg-lightBlue">
        {/* Todo: make username unique */}
        <TitleWrapper
          started={started}
          setStarted={setStarted}
          resetGame={resetGame}
        >
          <ThemedContainer classname="w-3/5 min-w-[320px] md:misn-w-[600px] md:w-4/5 h-52 md:h-80 lg:h-90 ">
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
            {startAGame && (
              <div className="flex flex-col items-center">
                <ThemedText header={true}> ACCESS CODE </ThemedText>
                <ThemedTextInput>
                  <ThemedText>Access code here </ThemedText>
                </ThemedTextInput>
              </div>
            )}
            {joinGame && (
              <div className="flex flex-col items-center justify-center gap-1">
                <ThemedText header={true}> Enter Access Code</ThemedText>
                <ThemedTextInput>
                  <input
                    value={accessCode}
                    className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
                    type="text"
                    id="accessCode"
                    placeholder="Enter Access Code..."
                    onChange={(e) => setAccessCode(e.target.value)}
                  />
                </ThemedTextInput>
                <Themedbutton color="darkBlue" classname="my-2">
                  {' '}
                  Submit{' '}
                </Themedbutton>
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
