import { useState } from 'react'
import Themedbutton from '../themedUI/ThemedButton.tsx'
import ThemedContainer from '../themedUI/ThemedContainer.tsx'
import ThemedText from '../themedUI/ThemedText.tsx'
import ThemedTextInput from '../themedUI/ThemedTextInput.tsx'
import generateRandomString from '../../util/generateRandomString.ts'
import Loading from '../Loading.tsx'

interface Props {
  connectToGame: (gameId: string, username: string) => void
  numPlayersNeeded: number
  errorMsg: string
}

export default function Landing({
  connectToGame,
  numPlayersNeeded,
  errorMsg,
}: Props) {
  const [joinGame, setJoinGame] = useState(false)
  const [startAGame, setStartAGame] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [waitingForPlayer, setWaitingForPlayer] = useState(false)
  const [username, setUsername] = useState('')

  // const resetGame = () => {
  //   setAccessCode('')
  //   setJoinGame(false)
  //   setStartAGame(false)
  //   setStarted(false)
  // }

  const handleStartNewGame = () => {
    setStartAGame(true)
    const newAccessCode = generateRandomString()
    setAccessCode(newAccessCode)
  }

  const handleConnectToNewGame = () => {
    connectToGame(accessCode, username.trim())
    setWaitingForPlayer(true)
  }

  const handleJoinEstablishedGame = () => {
    connectToGame(accessCode, username.trim())
  }

  return (
    <>
      <ThemedContainer classname="w-3/5 min-w-[320px] md:misn-w-[600px] md:w-4/5 lg:w-3/5 h-fit p-8 ">
        {!startAGame && !joinGame && (
          <Themedbutton onClick={() => setJoinGame(true)} color="darkBlue">
            <ThemedText>Join a Game</ThemedText>
          </Themedbutton>
        )}
        {!startAGame && !joinGame && (
          <Themedbutton onClick={handleStartNewGame} color="darkBlue">
            <ThemedText>Start a Game</ThemedText>
          </Themedbutton>
        )}
        {startAGame && (
          <div className="flex flex-col items-center">
            <ThemedText header={true}> ACCESS CODE </ThemedText>
            <ThemedTextInput>
              <ThemedText>{accessCode}</ThemedText>
            </ThemedTextInput>
            <ThemedText header={true}> Enter Username</ThemedText>
            <ThemedTextInput>
              <input
                value={username}
                className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
                type="text"
                id="username"
                placeholder="Enter Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </ThemedTextInput>
            <Themedbutton
              onClick={handleConnectToNewGame}
              color="darkBlue"
              classname="my-2"
              isDisabled={username.trim().length < 3}
            >
              Start
            </Themedbutton>
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
                value={accessCode}
                className="w-full border-none bg-lightBlue px-2 py-2 text-[16px] md:py-4 md:text-[24px]"
                type="text"
                id="accessCode"
                placeholder="Enter Access Code..."
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </ThemedTextInput>

            <ThemedText classname="text-center">
              {errorMsg ? errorMsg : ''}
            </ThemedText>
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
            >
              Submit
            </Themedbutton>
          </div>
        )}
      </ThemedContainer>
    </>
  )
}
