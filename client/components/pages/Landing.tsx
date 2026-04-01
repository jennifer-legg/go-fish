import { useState } from 'react'
import Themedbutton from '../themedUI/ThemedButton.tsx'
import ThemedContainer from '../themedUI/ThemedContainer.tsx'
import ThemedText from '../themedUI/ThemedText.tsx'
import ThemedTextInput from '../themedUI/ThemedTextInput.tsx'
import Loading from '../Loading.tsx'
// import { useGetShuffledDeck } from '../../hooks/useDeck.ts'
import { Deck } from '../../../models/deck.ts'
import TitleWrapper from '../TitleWrapper.tsx'
import { exampleDeck } from '../../../data/deckExample.ts'

interface Props {
  handleJoinGame: (gameId: string, username: string) => void
  handleStartGame: (username: string, deck: Deck) => void
  numPlayersNeeded: number
  errorMsg: string
  accessCode: string
}

export default function Landing({
  handleJoinGame,
  handleStartGame,
  numPlayersNeeded,
  errorMsg,
  accessCode,
}: Props) {
  const [joinGame, setJoinGame] = useState(false)
  const [startAGame, setStartAGame] = useState(false)
  const [accessCodeInput, setAccessCodeInput] = useState('')
  const [waitingForPlayer, setWaitingForPlayer] = useState(false)
  const [username, setUsername] = useState('')
  const deck = exampleDeck
  // const { data: deck, isError, isLoading } = useGetShuffledDeck()
  const [started, setStarted] = useState(false)

  const resetGame = () => {
    setAccessCodeInput('')
    setJoinGame(false)
    setStartAGame(false)
    setStarted(false)
  }

  const handleStartNewGame = () => {
    if (deck) {
      setStartAGame(true)
    }
  }

  const handleConnectToNewGame = () => {
    if (deck) {
      handleStartGame(username.trim(), deck)
      setWaitingForPlayer(true)
    }
  }

  const handleJoinEstablishedGame = () => {
    handleJoinGame(accessCodeInput, username.trim())
  }

  return (
    <TitleWrapper
      setStarted={setStarted}
      started={started}
      resetGame={resetGame}
    >
      <ThemedContainer classname="w-3/5 min-w-[320px] md:misn-w-[600px] md:w-4/5 lg:w-3/5 h-fit p-8 ">
        {!startAGame && !joinGame && (
          <Themedbutton onClick={() => setJoinGame(true)} color="darkBlue">
            <ThemedText>Join a Game</ThemedText>
          </Themedbutton>
        )}
        {!startAGame && !joinGame && (
          <Themedbutton
            onClick={handleStartNewGame}
            color="darkBlue"
            // isDisabled={isLoading || isError}
          >
            <ThemedText>Start a Game</ThemedText>
          </Themedbutton>
        )}
        {startAGame && (
          <div className="flex flex-col items-center">
            {waitingForPlayer && (
              <>
                <ThemedText> ACCESS CODE </ThemedText>
                <ThemedTextInput>
                  <ThemedText>{accessCode}</ThemedText>
                </ThemedTextInput>
              </>
            )}
            <ThemedText>
              {' '}
              {waitingForPlayer ? 'Username' : 'Enter Username'}
            </ThemedText>
            <ThemedTextInput>
              {waitingForPlayer ? (
                <ThemedText>{username}</ThemedText>
              ) : (
                <input
                  value={username}
                  className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
                  type="text"
                  id="username"
                  placeholder="Enter Username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
            </ThemedTextInput>
            {!waitingForPlayer && (
              <>
                <Themedbutton
                  onClick={handleConnectToNewGame}
                  color="darkBlue"
                  classname="my-2"
                  isDisabled={username.trim().length < 3}
                >
                  Start
                </Themedbutton>
              </>
            )}

            {waitingForPlayer && (
              <Loading numPlayersNeeded={numPlayersNeeded} />
            )}
          </div>
        )}
        {joinGame && (
          <div className="flex flex-col items-center justify-center gap-1">
            <ThemedText> Enter Access Code</ThemedText>
            <ThemedTextInput>
              <input
                value={accessCodeInput}
                className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
                type="text"
                id="accessCodeInput"
                placeholder="Enter Access Code..."
                onChange={(e) => setAccessCodeInput(e.target.value)}
              />
            </ThemedTextInput>
            <ThemedText> Enter Username</ThemedText>
            <ThemedTextInput>
              <input
                type="text"
                name="username"
                value={username}
                id="username"
                placeholder="Enter Username..."
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
              />
            </ThemedTextInput>
            <ThemedText secondary={true}>{errorMsg}</ThemedText>
            <Themedbutton
              onClick={handleJoinEstablishedGame}
              color="darkBlue"
              classname="my-2"
              isDisabled={username.trim().length < 3}
            >
              Submit
            </Themedbutton>
          </div>
        )}
      </ThemedContainer>
    </TitleWrapper>
  )
}
