import React, { useState } from 'react'
import ThemedContainer from './themedUI/ThemedContainer'

interface Props {
  username: string
  isChangeable: boolean
}
export default function Avatar({ username, isChangeable }: Props) {
  const [imgIndex, setImgIndex] = useState(0)

  const image = [
    '../images/Fish.svg',
    '../images/frog-fishing.svg',
    '../images/themedBut.png',
  ]

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (currentIndex < image.length - 1 && e.currentTarget.id === 'next') {
      setImgIndex(imgIndex + 1)
    } else if (currentIndex > 0 && e.currentTarget.id === 'previous') {
      setImgIndex(imgIndex - 1)
    }
  }

  return (
    <ThemedContainer color="darkBlue" classname="h-full p-[16px] gap-[8px]">
      <div className="flex  ">
        {imgIndex > 0 && isChangeable && (
          <button
            onClick={(e) => handleClick(e, imgIndex)}
            id="previous"
            className=" w-1/5 p-1"
          >
            <img src="../images/arrow.svg" alt="Previous avatar" />
          </button>
        )}
        {imgIndex === 0 && isChangeable && <div className="w-1/5"></div>}
        <div className={`${isChangeable ? 'aspect-square w-[70%]' : 'w-full'}`}>
          <img
            className="h-full w-full object-cover"
            src={image[imgIndex]}
            alt="Your avatar"
          />
        </div>
        {imgIndex < image.length - 1 && isChangeable && (
          <button
            onClick={(e) => handleClick(e, imgIndex)}
            id="next"
            className="w-1/5 p-1"
          >
            <img
              className="rotate-180"
              src="../images/arrow.svg"
              alt="Next avatar"
            />
          </button>
        )}
        {imgIndex >= image.length - 1 && isChangeable && (
          <div className="w-1/5"></div>
        )}
      </div>

      <p>{username}</p>
    </ThemedContainer>
  )
}
