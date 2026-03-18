import ThemedContainer from './themedUI/ThemedContainer'

export default function Opponent() {
  const oppNumCards = 8
  const emptyArr = Array(oppNumCards).fill('')

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
