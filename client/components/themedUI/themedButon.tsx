import { motion } from 'motion/react'
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
  const transition = {
    type: 'spring',
    stiffness: 110,
    damping: 20,
    delay: 0.1,
  } as const
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transition}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={`text-whiteText font-slackey w-44 rounded-full py-2 text-[24px] shadow-md shadow-gray-600 md:w-[368px] md:text-[48px] lg:w-[368px] lg:text-[48px] ${classname} cursor-pointer hover:opacity-80 ${color === 'orange' ? 'bg-fishOrange ' : 'bg-darkBlue'}`}
    >
      {children}
    </motion.button>
  )
}
