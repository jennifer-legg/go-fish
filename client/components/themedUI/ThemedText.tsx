import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  classname?: string
  header?: boolean
}

export default function ThemedText({
  children,
  header = false,
  classname = '',
}: Props) {
  return (
    <p
      className={`font-slackey ${header ? 'text-[24px] md:text-[48px] lg:text-[48px]' : 'text-[16px] md:text-[32px] lg:text-[32px]'} ${classname}`}
    >
      {children}
    </p>
  )
}
