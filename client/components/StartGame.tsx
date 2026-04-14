import { useGetShuffledDeck } from '../hooks/useDeck.ts'
import Themedbutton from './themedUI/ThemedButton.tsx'
import ThemedText from './themedUI/ThemedText.tsx'
import { Card } from '../../models/deck.ts'

interface Props {
  updatePond: (pond: Card[]) => void
}

export function StartGame({ updatePond }: Props) {
  const { data: deck, isError, isLoading } = useGetShuffledDeck()

  const handleClick = () => {}

  return (
    <Themedbutton
      onClick={handleClick}
      color="darkBlue"
      isDisabled={isLoading || isError}
    >
      <ThemedText>Start a Game</ThemedText>
    </Themedbutton>
  )
}
