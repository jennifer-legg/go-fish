import Avatar from './Avatar'
import Chat from './Chat'
import Dashboard from './Dashboard'
import Opponent from './Opponent'
import Pond from './Pond'

export default function GameLayout() {
  const columnStruct =
    'grid grid-cols-4 gap-[8px] md:grid-cols-8 md:gap-[8px]  grid-rows-6'
  return (
    <div className={`${columnStruct} h-screen w-full`}>
      <div
        id="speech"
        className="border border-gray-400 bg-white md:col-span-2 md:row-span-4"
      >
        <Chat />
      </div>
      <div
        id="opponentAvatar"
        className="border border-gray-400 bg-white md:col-span-1"
      >
        <Avatar />
      </div>
      <div
        id="opponent"
        className="border border-gray-400 bg-white md:col-span-4"
      >
        <Opponent />
      </div>
      <div
        id="score"
        className="border border-gray-400 bg-white md:col-span-1"
      ></div>

      <div
        id="pond"
        className="box-border border border-gray-400 bg-white md:col-span-5 md:row-span-2"
      >
        <Pond />
      </div>

      <div
        id="dashboard"
        className="border border-gray-400 bg-white md:col-span-6 md:row-span-3"
      >
        <Dashboard />
      </div>
      <div
        id="avatar"
        className="border border-gray-400 bg-white md:col-span-2 md:row-span-2"
      >
        <Avatar />
      </div>
    </div>
  )
}
