import { ReactNode } from 'react'

interface Props {
  chat: ReactNode
  avatarUser: ReactNode
  dashboard: ReactNode
  opponent: ReactNode
  pond: ReactNode
  score: ReactNode
}

export default function GameLayout({
  chat,
  avatarUser,
  dashboard,
  opponent,
  pond,
  score,
}: Props) {
  const columnStruct =
    'grid grid-cols-4 gap-[8px] md:grid-cols-8 md:gap-[8px]  grid-rows-6'

  return (
    <div
      className={`container mx-auto h-screen md:p-[32px] lg:px-[128px] lg:py-[32px]`}
    >
      <div className={`${columnStruct} h-full w-full `}>
        <div id="speech" className="md:col-span-2 md:row-span-4 md:rounded-xl">
          {chat}
        </div>

        <div id="opponent" className=" md:col-span-4">
          {opponent}
        </div>

        <div id="score" className="md:col-span-2">
          {score}
        </div>

        <div id="pond" className=" md:col-span-6 md:row-span-2">
          {pond}
        </div>

        <div id="dashboard" className=" md:col-span-6 md:row-span-3">
          {dashboard}
        </div>

        <div id="avatarUser" className=" md:col-span-2 md:row-span-2">
          {avatarUser}
        </div>
      </div>
    </div>
  )
}
