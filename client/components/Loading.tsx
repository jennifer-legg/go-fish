import ThemedText from './themedUI/ThemedText'

interface Props {
  numPlayersNeeded: number
}

export default function Loading({ numPlayersNeeded }: Props) {
  return (
    <div className="mt-4 w-full">
      <ThemedText secondary={true} classname="text-center">
        {`Waiting for ${numPlayersNeeded} player${
          numPlayersNeeded === 1 ? '' : `s`
        }`}
        <span className=" inline-flex space-x-1 rounded-3xl bg-fishOrange py-2">
          <span className="h-1 w-1 animate-[bounce_1s_infinite_0.33s] rounded-full bg-lightBlue"></span>
          <span className="h-1 w-1 animate-[bounce_1s_infinite_0.66s] rounded-full bg-lightBlue"></span>
          <span className="h-1 w-1 animate-[bounce_1s_infinite_1s] rounded-full bg-lightBlue"></span>
        </span>
      </ThemedText>
    </div>
  )
}
