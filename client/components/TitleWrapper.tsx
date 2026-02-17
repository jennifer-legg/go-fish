import React, { ReactNode, useState } from 'react'
import Themedbutton from './themedUI/ThemedButton'
import { motion } from 'motion/react'

interface Props {
  children?: ReactNode
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  resetGame: () => void
}
export default function TitleWrapper({
  children,
  started,
  setStarted,
  resetGame,
}: Props) {
  // const [started, setStarted] = useState<boolean>(false)

  const columnStruct =
    'grid grid-cols-4 gap-[12px] md:grid-cols-8 md:gap-[12px] lg:grid-cols-12 lg:gap-[20px] min-h-screen'
  return (
    // Added min-h-screen to ensure the "center" is actually the middle of the page
    <div
      className={`container mx-auto min-h-screen px-[12px] transition-all duration-500 md:px-[32px] lg:px-[150px]`}
    >
      <div className={columnStruct}>
        <div
          className={`col-span-4 flex flex-col items-center justify-center md:col-span-8 lg:col-span-12 `}
        >
          {/* The layout prop tells Framer Motion to animate the position change */}
          <motion.div
            id="logo"
            // NEED TO DO: RESETS, Might need to call a proper reset where all states are resetted //

            layout
            className={` flex w-full gap-2 ${started ? 'items-center justify-start pt-4  ' : 'flex-col items-center justify-center'}`} // Changed from fixed width for better logo-style scaling
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            <button onClick={() => resetGame()}>
              <h1
                className={`font-slackey text-darkBlue transition-all duration-500 ${
                  started
                    ? 'cursor-pointer text-[32px] hover:opacity-80 md:text-[48px]'
                    : 'cursor-default text-[64px] md:text-[128px] lg:text-[160px]'
                }`}
              >
                Go Fish
              </h1>
            </button>
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
              className={`flex w-full flex-1 flex-col items-center justify-center self-center`}
            >
              {/* GAME GOES IN HERE */}
              {children}
            </motion.div>
          )}
          {!started && (
            <div className="mt-8 flex">
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
