import ThemedSpeechBubble from './themedUI/ThemedSpeechBubble'

export default function Chat() {
  return (
    <div>
      <ThemedSpeechBubble leftAligned={true}>Hello</ThemedSpeechBubble>
      <ThemedSpeechBubble leftAligned={false}>Hi</ThemedSpeechBubble>
    </div>
  )
}
