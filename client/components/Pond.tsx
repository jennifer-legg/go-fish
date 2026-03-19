import ThemedText from './themedUI/ThemedText'

export default function Pond() {
  return (
    <div className="flex h-full items-center justify-center  gap-[12px] ">
      <button className="flex flex-col items-center justify-center rounded-[64px] border border-black bg-darkBlue p-[36px] drop-shadow-2xl hover:opacity-25 md:h-4/5 md:w-fit">
        <ThemedText classname="text-white">Go Fish!</ThemedText>
        <img
          src="../../images/frog-fishing.svg"
          alt="Frog fishing in a pond"
          className="mx-auto block min-h-full w-auto rounded-md"
        />{' '}
      </button>

      <img
        src="https://deckofcardsapi.com/static/img/back.png"
        alt="Card back"
        className="h-4/5 w-auto"
      />
    </div>
  )
}
