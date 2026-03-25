import ThemedSpeechBubble from './themedUI/ThemedSpeechBubble'

interface Props {
  userMsg: string
  rivalMsg: string
}

export default function Chat({ userMsg, rivalMsg }: Props) {
  return (
    <>
      <ThemedSpeechBubble leftAligned={true}>{userMsg}</ThemedSpeechBubble>
      <ThemedSpeechBubble leftAligned={false}>{rivalMsg}</ThemedSpeechBubble>
    </>
  )
}
