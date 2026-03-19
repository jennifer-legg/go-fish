import ThemedContainer from './themedUI/ThemedContainer'

interface Props {
  numRivalCards: number
}

export default function Opponent({ numRivalCards }: Props) {
  const emptyArr = Array(numRivalCards).fill('')

  return (
    <>
      <ThemedContainer
        color="darkBlue"
        vertical={false}
        classname="w-full px-[8px] gap-[2px] h-full md:rounded-2xl lg:rounded-2xl"
      >
        {emptyArr.map((_, index) => (
          <div key={index}>
            <img
              alt="Back of card"
              src="https://deckofcardsapi.com/static/img/back.png"
            />
          </div>
        ))}
      </ThemedContainer>
    </>
  )
}
