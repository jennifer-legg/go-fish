import ThemedContainer from './themedUI/ThemedContainer'

export default function Score() {
  const score = [
    { username: 'opponent', sets: 2 },
    { username: 'you', sets: '1' },
  ]
  return (
    <ThemedContainer classname="md:rounded-2xl gap-0 h-full">
      <p className="pt-[8px]">Score</p>
      <ul className="pb-[8px] text-black md:text-[16px] lg:text-[16px]">
        {score.map((item) => (
          <li key={item.username}>
            {item.username}: {item.sets}
          </li>
        ))}
      </ul>
    </ThemedContainer>
  )
}
