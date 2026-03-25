import { ReactNode } from 'react'

type ContainerColor = 'orange' | 'darkBlue'

interface Props {
  children: ReactNode
  classname?: string
  color?: ContainerColor
  vertical?: boolean
}

export default function ThemedContainer({
  children,
  classname = '',
  color = 'orange',
  vertical = true,
}: Props) {
  const verticalStack = 'flex-col gap-[32px]'
  const horizontalStack = 'gap-[12px] justify-around'
  return (
    <div
      className={`${vertical ? verticalStack : horizontalStack} flex h-4/5 items-center justify-center rounded-[64px] font-slackey text-white md:rounded-[64px] bg-${color === 'orange' ? 'fishOrange' : 'darkBlue'}  ${classname}`}
    >
      {children}
    </div>
  )
}
