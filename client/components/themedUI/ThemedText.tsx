import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  classname?: string
  header?: boolean
  secondary?: boolean
}

export default function ThemedText({
  children,
  header = false,
  classname = '',
  secondary = false,
}: Props) {
  const secondaryText = 'text-[16px] md:text-[16px] lg:text-[16px]'
  const headerText = 'text-[24px] md:text-[48px] lg:text-[48px]'
  return (
    <p
      className={`font-slackey ${header ? headerText : secondary ? secondaryText : 'text-[16px] md:text-[32px] lg:text-[32px]'} ${classname}`}
    >
      {children}
    </p>
  )
}
