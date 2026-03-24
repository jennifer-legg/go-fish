import { Score } from '../../models/player'
import ThemedContainer from './themedUI/ThemedContainer'
import ThemedText from './themedUI/ThemedText'

interface Props {
  scores: Score[]
}

export default function ScoreBoard({ scores }: Props) {
  return (
    <ThemedContainer classname="lg:rounded-[24px] md:gap-0 lg:gap-0 h-full lg:py-[8px] ">
      <ThemedText secondary={true}>Score</ThemedText>
      <ul className="text-black">
        {scores.map((item) => (
          <li key={item.username}>
            <ThemedText
              secondary={true}
            >{`${item.username}: ${item.sets}`}</ThemedText>
          </li>
        ))}
      </ul>
    </ThemedContainer>
  )
}
