import ThemedText from './themedUI/ThemedText'

interface Props {
  numPlayersNeeded: number
}

export default function Loading({ numPlayersNeeded }: Props) {
  return (
    <div className="mt-4 w-full">
      <ThemedText>
        {`Waiting for ${numPlayersNeeded} player${
          numPlayersNeeded === 1 ? '' : `s`
        }`}
        <span className=" inline-flex space-x-1 rounded-3xl bg-fishOrange py-2">
          <span className="h-2 w-2 animate-[bounce_1s_infinite_0.33s] rounded-full bg-lightBlue"></span>
          <span className="h-2 w-2 animate-[bounce_1s_infinite_0.66s] rounded-full bg-lightBlue"></span>
          <span className="h-2 w-2 animate-[bounce_1s_infinite_1s] rounded-full bg-lightBlue"></span>
        </span>
      </ThemedText>
    </div>
  )
}
