import SideBarContent from "./SideBarContent"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"

const SideBar = () => {
  const isSideOpen = useAppSelector(state => state.isSideOpen.value)
  const [sideBarAni, setSideBarAni] = useState<boolean>(false)

  /* 사이드바 애니메이션 */
  useEffect(() => {
    let timer :ReturnType<typeof setTimeout> | number = 0

    if (isSideOpen) {
      setSideBarAni(true)
    } else {
      timer = setTimeout(() => { setSideBarAni(false) }, 390)
    }

    return () => { clearTimeout(timer) }
  }, [isSideOpen])

  return (
    <div className="relative md:hidden">
      <div className={`absolute top-0 shadow-xl shadow-sky-500 ${isSideOpen && sideBarAni && 'animate-sideBarIn -left-[100vw] sm:-left-80'} ${!isSideOpen && 'animate-sideBarOut left-0'}`}>
        {sideBarAni && <SideBarContent></SideBarContent>}
      </div>
    </div>
  )
}

export default SideBar;