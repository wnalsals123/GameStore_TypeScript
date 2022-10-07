import { useEffect, useState } from "react"
import { TTag } from "../interface/gameInterface"

interface IProps {
  setIsFilter: React.Dispatch<React.SetStateAction<string[] | boolean>>,
  setIsTagListOn: React.Dispatch<React.SetStateAction<boolean>>
}

/* 게임 필터 */
const GameFilter = (props: IProps) => {
  const { setIsFilter, setIsTagListOn } = props
  const gameTag: string[] = ["오픈월드", "멀티플레이", "협동", "액션", "공포", "좀비", "어드벤처", "스포츠", "리듬", "인디", "MMORPG", "FPS"]
  const [checkedTag, setCheckedTag] = useState<TTag>({ "오픈월드": false, "멀티플레이": false, "협동": false, "액션": false, "공포": false, "좀비": false, "어드벤처": false, "스포츠": false, "리듬": false, "인디": false, "MMORPG": false, "FPS": false })

  /* 필터 값 가져오기 */
  const updateFilter = () => {
    const tempTag: string[] = ["오픈월드", "멀티플레이", "협동", "액션", "공포", "좀비", "어드벤처", "스포츠", "리듬", "인디", "MMORPG", "FPS"]
    let temp: TTag = {}
    for (let i = 0; i < tempTag.length; i++) {
      temp[tempTag[i]] = (document?.getElementById(tempTag[i]) as HTMLInputElement)?.checked
    }
    setCheckedTag(temp)
  }

  useEffect(() => {
    updateFilter()
  }, [])

  /* 체크 박스 리스너 */
  const checkboxClick = (id: string) => {
    const checkbox: HTMLInputElement = document.getElementById(id) as HTMLInputElement
    checkbox.checked = !checkbox?.checked
    setCheckedTag((current) => {
      let temp: TTag = { ...current }
      temp[id] = checkbox.checked
      return temp
    })
  }

  /* 필터 적용 */
  const confirm = () => {
    let checkTag: string[] = []
    for (let i = 0; i < gameTag.length; i++) {
      const checkbox = document.getElementById(gameTag[i]) as HTMLInputElement
      if (checkbox.checked) checkTag = checkTag.concat(gameTag[i])
    }
    setIsFilter(checkTag)
    setIsTagListOn(false)
  }
 
  /* 필터 리셋 */
  const reset = () => {
    for (let i = 0; i < gameTag.length; i++) {
      const checkbox = document.getElementById(gameTag[i]) as HTMLInputElement
      checkbox.checked = false
    }
    setIsFilter(false)
    setIsTagListOn(false)
    updateFilter()
  }

  return (
    <div className='rounded-lg bg-neutral-900 w-screen sm:w-[18rem] 3xl:w-[18.75rem] text-lg 3xl:text-xl border-2 border-neutral-100'>
      <div className="flex justify-between m-2 mb-3 rounded-md bg-sky-500">
        <span className="block px-2 3xl:py-1">게임 필터</span>
        <button className="block px-2 3xl:py-1 3xl:hidden" onClick={() => { setIsTagListOn(false) }}>&times;</button>
      </div>
      <div className="flex flex-col m-2">
        {gameTag.map((item, index) =>
          <button key={index} className={`flex items-center mb-1 bg-transparent px-2 py-1 !leading-none`} onClick={() => { checkboxClick(item) }}>
            {!checkedTag[item] && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" color="#FFFFFF"><path fillRule="evenodd" clipRule="evenodd" d="M19 5H5v14h14V5zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" fill="currentColor"></path></svg>}
            {checkedTag[item] && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" color="#FFFFFF"><path fillRule="evenodd" clipRule="evenodd" d="M19 5H5v14h14V5zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M17.625 7.95c.431.356.5 1.004.156 1.449l-6 7.725a.991.991 0 01-.726.385.984.984 0 01-.762-.3l-3.5-3.605a1.052 1.052 0 010-1.457.98.98 0 011.414 0l2.71 2.791 5.302-6.826a.98.98 0 011.406-.161z" fill="currentColor"></path></svg>}
            <span>{item}</span>
          </button>
        )}
      </div>
      <div className="flex">
        <button className="w-1/2 m-2 mt-0 rounded-md 3xl:py-1 bg-sky-500" onClick={confirm}>적용</button>
        <button className="w-1/2 m-2 mt-0 bg-red-500 rounded-md 3xl:py-1" onClick={reset}>초기화</button>
      </div>
    </div>
  )
}

export default GameFilter;