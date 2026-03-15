export default function GameLayout() {
  const columnStruct =
    'grid grid-cols-4 gap-[8px] md:grid-cols-8 md:gap-[8px] min-h-screen grid-rows-6'
  return (
    <div className={`${columnStruct} h-full w-full`}>
      <div
        id="speech"
        className="border border-gray-400 bg-white md:col-span-2 md:row-span-4"
      ></div>
      <div
        id="opponent"
        className="border border-gray-400 bg-white md:col-span-5"
      ></div>
      <div
        id="score"
        className="border border-gray-400 bg-white md:col-span-1"
      ></div>

      <div
        id="pond"
        className="border border-gray-400 bg-white md:col-span-6 md:row-span-2"
      ></div>

      <div
        id="dashboard"
        className="border border-gray-400 bg-white md:col-span-6 md:row-span-3"
      ></div>
      <div
        id="avatar"
        className="border border-gray-400 bg-white md:col-span-2 md:row-span-2"
      ></div>
    </div>
  )
}
