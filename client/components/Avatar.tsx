import ThemedContainer from './themedUI/ThemedContainer'

interface Props {
  username: string
}
export default function Avatar({ username }: Props) {
  return (
    <ThemedContainer color="darkBlue" classname="h-full p-[16px] gap-[8px]">
      <img src="../images/Fish.svg" alt="Your avatar" />
      <p>{username}</p>
    </ThemedContainer>
  )
}
