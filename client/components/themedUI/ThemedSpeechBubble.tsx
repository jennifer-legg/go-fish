import { ReactNode } from 'react'
import ThemedText from './ThemedText'

interface Props {
  leftAligned: boolean
  children: ReactNode
}

export default function ThemedSpeechBubble({ leftAligned, children }: Props) {
  const tail = 'w-0 border-fishOrange'
  const leftTail =
    'border-r-[20px] border-t-[20px] border-b-transparent  border-r-transparent'
  const rightTail =
    'border-l-[20px] border-b-[20px] border-t-transparent  border-l-transparent'
  const bubble = 'relative h-32 w-48 rounded-lg bg-fishOrange text-center'
  return (
    <>
      <div
        className={`m-2 flex items-center ${leftAligned ? 'justify-start' : 'justify-end'}`}
      >
        {!leftAligned && <div className={`${rightTail} ${tail}`}></div>}
        <div className={bubble}>
          <ThemedText>{children}</ThemedText>
        </div>
        {leftAligned && <div className={`${leftTail} ${tail}`}></div>}
      </div>
    </>
  )
}
