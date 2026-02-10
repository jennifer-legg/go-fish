import { MouseEventHandler, ReactNode } from 'react'

type buttonColor = 'orange' | 'darkBlue'
interface Props {
  children: ReactNode
  classname?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: buttonColor
}

export default function Themedbutton({
  onClick,
  children,
  classname = '',
  color = 'orange',
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-whiteText font-slackey w-44 rounded-full py-2 text-[24px] shadow-md shadow-gray-600 md:w-[368px] md:text-[48px] lg:w-[368px] lg:text-[48px] ${classname} cursor-pointer hover:opacity-80 ${color === 'orange' ? 'bg-fishOrange ' : 'bg-darkBlue'}`}
    >
      {children}
    </button>
  )
}
