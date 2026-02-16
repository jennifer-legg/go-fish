import { ReactNode, useState } from 'react'
import Themedbutton from './themedUI/themedButon'
import { motion } from 'motion/react'

interface Props {
  children?: ReactNode
}
export default function TitleWrapper({ children }: Props) {
  const [started, setStarted] = useState<boolean>(false)

  const columnStruct =
    'grid grid-cols-4 gap-[12px] md:grid-cols-8 md:gap-[12px] lg:grid-cols-12 lg:gap-[20px] '
  return (
    // Added min-h-screen to ensure the "center" is actually the middle of the page
    <div
      className={`container mx-auto min-h-screen px-[12px] transition-all duration-500 md:px-[32px] lg:px-[150px]`}
    >
      <div className={columnStruct}>
        <div
          className={`relative col-span-4 flex min-h-[70vh] flex-col items-center justify-center md:col-span-8 lg:col-span-12 `}
        >
          {/* The layout prop tells Framer Motion to animate the position change */}
          <motion.div
            layout
            className={`flex w-auto gap-2 ${started ? 'absolute left-1 top-1 flex-row items-center justify-center' : 'flex-col items-center'}`} // Changed from fixed width for better logo-style scaling
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            <h1
              className={`font-slackey text-darkBlue transition-all duration-500 ${
                started
                  ? 'text-[32px] md:text-[48px] '
                  : 'text-[64px] md:text-[128px] lg:text-[160px]'
              }`}
            >
              Go Fish
            </h1>
            <div
              className={`${started ? 'w-12 md:w-16' : 'w-[168px] md:w-[320px] lg:w-[360px]'}`}
            >
              <img
                src="../public/images/Fish.svg"
                alt="fish logo"
                className="h-auto w-full scale-x-[-1]"
              />
            </div>
          </motion.div>

          {started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <p>Game area goes here!</p>
              {children}
            </motion.div>
          )}
          {!started && (
            <div className="col-span-2 mt-8 flex  md:col-span-4 lg:col-span-4">
              <Themedbutton onClick={() => setStarted(true)}>
                Play Now
              </Themedbutton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
