import ThemedContainer from './themedUI/ThemedContainer'
import ThemedText from './themedUI/ThemedText'
import { firstHand2Players } from '../../data/deckExample'

export default function Dashboard() {
  const gameMessage = 'Message goes here'
  const hand = firstHand2Players
  return (
    <ThemedContainer classname="h-full md:rounded-b-none lg:rounded-b-none">
      <ThemedContainer
        color="darkBlue"
        classname="w-full h-1/5 md:rounded-b-none"
      >
        <ThemedText>{gameMessage}</ThemedText>
      </ThemedContainer>

      <ThemedContainer
        vertical={false}
        classname="w-full pb-[32px] px-[12px] rounded-b-none lg:rounded-b-none"
      >
        {hand.map((card) => (
          <div className="h-auto w-full flex-1" key={card.code}>
            <img
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
              className="object-cover"
            />
          </div>
        ))}
      </ThemedContainer>
    </ThemedContainer>
  )
}
