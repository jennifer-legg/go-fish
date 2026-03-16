import { ReactNode } from 'react'

interface Props {
  leftAligned: boolean
  children: ReactNode
}

export default function ThemedSpeechBubble({ leftAligned, children }: Props) {
  const leftTail =
    'w-0 border-r-[20px] border-t-[20px] border-fishOrange border-b-transparent  border-r-transparent'
  const rightTail =
    'w-0 border-l-[20px] border-b-[20px] border-fishOrange border-t-transparent  border-l-transparent'
  const bubble = 'relative h-32 w-48 rounded-lg bg-fishOrange text-center'
  return (
    <>
      <div
        className={`flex items-center ${leftAligned ? 'justify-start' : 'justify-end'} `}
      >
        {leftAligned && (
          <>
            <div className={bubble}>{children}</div>
            <div className={leftTail}></div>
          </>
        )}
        {!leftAligned && (
          <>
            <div className={rightTail}></div>
            <div className={bubble}>{children}</div>
          </>
        )}
      </div>
    </>
  )
}
