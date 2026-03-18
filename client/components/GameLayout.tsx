import Avatar from './Avatar'
import Chat from './Chat'
import Dashboard from './Dashboard'
import Opponent from './Opponent'
import Pond from './Pond'
import Score from './Score'

export default function GameLayout() {
  const columnStruct =
    'grid grid-cols-4 gap-[8px] md:grid-cols-8 md:gap-[8px]  grid-rows-6'
  return (
    <div className={`${columnStruct} h-screen w-full`}>
      <div
        id="speech"
        className=" bg-white md:col-span-2 md:row-span-4 md:rounded-xl"
      >
        <Chat />
      </div>

      <div id="opponentAvatar" className=" md:col-span-1">
        <Avatar username="Opponent" />
      </div>

      <div id="opponent" className=" md:col-span-3">
        <Opponent />
      </div>

      <div id="score" className="md:col-span-2">
        <Score />
      </div>

      <div id="pond" className=" md:col-span-6 md:row-span-2">
        <Pond />
      </div>

      <div id="dashboard" className=" md:col-span-6 md:row-span-3">
        <Dashboard />
      </div>

      <div id="avatar" className=" md:col-span-2 md:row-span-2">
        <Avatar username="You" />
      </div>
    </div>
  )
}
