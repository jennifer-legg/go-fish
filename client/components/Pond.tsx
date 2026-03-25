import { Card } from '../../models/deck'
import ThemedText from './themedUI/ThemedText'

interface Props {
  currentCard: Card | null
  getNewCard: () => void
  buttonDisabled: boolean
}

export default function Pond({
  currentCard,
  getNewCard,
  buttonDisabled,
}: Props) {
  const handleClick = () => {
    getNewCard()
  }

  return (
    <div className="flex h-full items-center justify-center  gap-[12px] ">
      <button
        disabled={buttonDisabled}
        onClick={handleClick}
        className="flex flex-col items-center justify-center rounded-[64px] border border-black bg-darkBlue p-[36px] drop-shadow-2xl hover:opacity-25 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 md:h-4/5 md:w-fit"
      >
        <ThemedText classname="text-white">Go Fish!</ThemedText>
        <img
          src="../../images/frog-fishing.svg"
          alt="Frog fishing in a pond"
          className="mx-auto block min-h-full w-auto rounded-md"
        />{' '}
      </button>
      {!currentCard && (
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Card back"
          className="h-4/5 w-auto"
        />
      )}
      {currentCard && (
        <img
          src={currentCard.image}
          alt={`${currentCard.value} of ${currentCard.suit}`}
          className="h-4/5 w-auto"
        />
      )}
    </div>
  )
}
