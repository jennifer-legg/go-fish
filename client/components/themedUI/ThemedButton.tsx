import { motion } from 'motion/react'
import { MouseEventHandler, ReactNode } from 'react'

type buttonColor = 'orange' | 'darkBlue'
interface Props {
  children: ReactNode
  classname?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: buttonColor
  isDisabled?: boolean
}

export default function Themedbutton({
  onClick,
  children,
  classname = '',
  color = 'orange',
  isDisabled = false,
}: Props) {
  const transition = {
    type: 'spring',
    stiffness: 210,
    damping: 20,
    delay: 0.1,
  } as const
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transition}
      whileTap={{ scale: 0.8 }}
      whileHover={{ opacity: 0.8 }}
      onClick={onClick}
      disabled={isDisabled}
      className={`w-44 rounded-full py-2 font-slackey text-[24px] text-whiteText shadow-md shadow-gray-600 md:w-[368px] md:text-[48px] lg:w-[368px] lg:text-[48px] ${classname}   ${isDisabled ? 'cursor-not-allowed bg-gray-500' : color === 'orange' ? 'cursor-pointer bg-fishOrange' : 'cursor-pointer bg-darkBlue'}`}
    >
      {children}
    </motion.button>
  )
}
