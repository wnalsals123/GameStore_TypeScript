/* 게임 목록 하단 */
const GameFlexFooter = () => {
  return (
    <div className="flex justify-between pt-[3rem] xsm:pt-[10rem] text-white mx-3 lg:mx-6 text-sm xsm:text-base sm:text-xl">
      <div className="flex items-center">
        <img className="w-8 sm:w-10 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
        <span className="pl-2 !leading-none sm:pl-4">Game Store</span>
      </div>
      <div>
        <div className="flex items-center h-full"><span>Made by JMJ</span></div>
      </div>
    </div>
  )
}

export default GameFlexFooter;