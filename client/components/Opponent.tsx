import ThemedContainer from './themedUI/ThemedContainer'
import ThemedText from './themedUI/ThemedText'

interface Props {
  numRivalCards: number
  username: string
  avatar: string
}

export default function Opponent({ numRivalCards, username, avatar }: Props) {
  const emptyArr = Array(numRivalCards).fill('')

  return (
    <ThemedContainer
      color="darkBlue"
      classname="h-full lg:rounded-[24px] lg:gap-1"
    >
      <ThemedText secondary={true}>{username}</ThemedText>
      <div className="flex w-[95%] px-2">
        <div className="aspect-square h-[48px] w-auto">
          <img
            className="h-full w-full object-cover"
            src={avatar}
            alt="Your avatar"
          />
        </div>
        <div
          id="card-container"
          className="flex h-full  items-center gap-[2px] px-[8px]"
        >
          {emptyArr.map((_, index) => (
            <div key={index}>
              <img
                alt="Back of card"
                src="https://deckofcardsapi.com/static/img/back.png"
              />
            </div>
          ))}
        </div>
      </div>
    </ThemedContainer>
  )
}
