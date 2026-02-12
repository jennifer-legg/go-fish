import Themedbutton from './themedUI/themedButon'

interface Props {
  joinExisting: () => void
  createNew: () => void
}

export default function StartGameOptions({ joinExisting, createNew }: Props) {
  return (
    <div>
      <Themedbutton onClick={joinExisting}>Join a game</Themedbutton>
      <Themedbutton onClick={createNew}>Create a Game</Themedbutton>
    </div>
  )
}
