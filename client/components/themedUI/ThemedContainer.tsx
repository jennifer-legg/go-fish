import { ReactNode } from 'react'

type ContainerColor = 'orange' | 'darkBlue'

interface Props {
  children: ReactNode
  classname?: string
  color?: ContainerColor
}

export default function ThemedContainer({
  children,
  classname = '',
  color = 'orange',
}: Props) {
  return (
    <div
      className={` flex h-4/5 flex-col items-center justify-center gap-[32px]   rounded-[64px] font-slackey text-white md:rounded-[64px] bg-${color === 'orange' ? 'fishOrange' : 'darkBlue'}  ${classname}`}
    >
      {children}
    </div>
  )
}
