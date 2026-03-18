import ThemedSpeechBubble from './themedUI/ThemedSpeechBubble'

export default function Chat() {
  const opponentSays = 'Hello'
  const youSay = 'Hi'
  return (
    <>
      <ThemedSpeechBubble leftAligned={true}>{opponentSays}</ThemedSpeechBubble>
      <ThemedSpeechBubble leftAligned={false}>{youSay}</ThemedSpeechBubble>
    </>
  )
}
