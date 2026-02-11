import { ReactNode, useState } from 'react'
import Themedbutton from './themedUI/themedButon'
import { motion } from 'motion/react'

interface Props {
  children?: ReactNode
}
export default function TitleWrapper({ children }: Props) {
  const [started, setStarted] = useState<boolean>(false)
  const variant = {
    started: {},
  }
  return (
    // Added min-h-screen to ensure the "center" is actually the middle of the page
    <div className="min-h-screen bg-lightBlue p-4 transition-all duration-500">
      <div
        className={`flex ${
          started
            ? 'flex-row items-center justify-start gap-4'
            : 'min-h-[70vh] flex-col items-center justify-center'
        }`}
      >
        {/* The layout prop tells Framer Motion to animate the position change */}
        <motion.div
          layout
          className="w-auto" // Changed from fixed width for better logo-style scaling
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <h1
            className={`font-slackey text-darkBlue transition-all duration-500 ${
              started
                ? 'text-[32px] md:text-[48px]'
                : 'text-[64px] md:text-[128px] lg:text-[160px]'
            }`}
          >
            Go Fish
          </h1>
        </motion.div>

        <motion.div
          layout
          className={`${started ? 'w-12 md:w-16' : 'w-[168px] md:w-[320px] lg:w-[360px]'}`}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <img
            src="../public/images/Fish.svg"
            alt="fish logo"
            className="h-auto w-full scale-x-[-1]"
          />
        </motion.div>
      </div>

      {/* Hide the button or move it once started */}
      {!started && (
        <div className="mt-8 flex justify-center">
          <Themedbutton onClick={() => setStarted(true)}>Play Now</Themedbutton>
        </div>
      )}

      {/* Content area for the game/children */}
      {started && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <p>Game area</p>
          {children}
        </motion.div>
      )}
    </div>
  )
}
//   (
//     <div className=" bg-lightBlue">
//       <div
//         className={`${started ? 'flex items-start justify-start ' : `flex flex-col items-center justify-center`}`}
//       >
//         <motion.div
//           layout
//           className="w-[160px] md:w-[680px] lg:w-[752px]"
//           transition={{ type: 'spring', stiffness: 150, damping: 20 }}
//         >
//           <h1 className="font-slackey text-[64px] text-darkBlue md:text-[128px] lg:text-[160px]">
//             Go Fish
//           </h1>
//         </motion.div>
//         <div className="w-[168px] md:w-[320px] lg:w-[360px]">
//           <img
//             src="../public/images/Fish.svg"
//             alt="fish logo"
//             className="scale-x-[-1]"
//           />
//         </div>
//       </div>
//       <Themedbutton onClick={() => setStarted(!started)}>Play Now</Themedbutton>
//     </div>
//   )
// }
