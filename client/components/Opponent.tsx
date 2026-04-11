import ThemedContainer from './themedUI/ThemedContainer'
import ThemedText from './themedUI/ThemedText'

interface Props {
  numRivalCards: number
  username: string
  avatar: string
  isActive: boolean
}

export default function Opponent({
  isActive,
  numRivalCards,
  username = 'Opponent',
  avatar,
}: Props) {
  const emptyArr = Array(numRivalCards).fill('')

  return (
    <ThemedContainer
      color="darkBlue"
      classname={`h-full lg:rounded-[24px] lg:gap-0 p-0 ${!isActive ? 'grayscale' : null}`}
    >
      <ThemedText secondary={true}>
        {username} {!isActive ? '- Disconnected' : null}
      </ThemedText>
      <div className="flex w-[95%] px-1">
        <div className="aspect-square h-[48px] w-auto">
          {isActive ? (
            <img
              className="h-full w-full object-cover"
              src={avatar}
              alt="Your avatar"
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src="../images/offline-avatar.svg"
              alt="Offline avatar"
            />
          )}
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
