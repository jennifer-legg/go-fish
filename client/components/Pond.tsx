import Themedbutton from './themedUI/ThemedButton'
import ThemedText from './themedUI/ThemedText'

export default function Pond() {
  return (
    <div className="flex h-full justify-center gap-[12px] ">
      <Themedbutton classname="lg:w-full flex flex-col items-center justify-center py-[16px] drop-shadow-2xl">
        <ThemedText>Go Fish!</ThemedText>
        <img
          src="../../images/frog-fishing.svg"
          alt="Frog fishing in a pond"
          className="mx-auto block h-auto w-3/5 rounded-md"
        />{' '}
      </Themedbutton>

      <div className="h-full">
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Card back"
          className=""
        />
      </div>
    </div>
  )
}
