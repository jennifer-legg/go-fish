import { ReactNode } from 'react'
import ThemedText from './ThemedText'

interface Props {
  leftAligned: boolean
  children: ReactNode
}

export default function ThemedSpeechBubble({ leftAligned, children }: Props) {
  const tail =
    'w-0 border-white border-r-[20px] border-t-[20px] border-b-transparent  border-r-transparent'
  const bubble = 'relative h-4/5 w-36 rounded-lg bg-white text-center'
  return (
    <>
      <div
        className={`m-2 flex items-center justify-start ${leftAligned ? '' : 'flex-col '} h-1/2`}
      >
        <div className={bubble}>
          <ThemedText>{children}</ThemedText>
        </div>
        {leftAligned && <div className={tail}></div>}
        {!leftAligned && <div className={tail}></div>}
      </div>
    </>
  )
}
