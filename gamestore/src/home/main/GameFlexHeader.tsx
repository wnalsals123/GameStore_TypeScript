import GameFilter from "../../function/GameFilter"
import Dropdown from "../../function/DropDown"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setCategory } from "../../redux/state/category"
import { setLoading } from "../../redux/state/loading"

interface IProps {
  setSortState: React.Dispatch<React.SetStateAction<string>>,
  setIsFilter: React.Dispatch<React.SetStateAction<string[] | boolean>>,
  isFilter: string[] | boolean,
  scroolRef: React.MutableRefObject<HTMLDivElement | null> | (() => void)
}

/* 게임 카테고리, 정렬 설정 헤더 */
const GameFlexHeader = (props: IProps) => {
  const category = useAppSelector(state => state.category.value)
  const dispatch = useAppDispatch()
  const { setSortState, setIsFilter, isFilter, scroolRef } = props
  const [isTagListOn, setIsTagListOn] = useState<boolean>(false)
  const [sortName, setSortName] = useState<string>('이름 순')

  // 게임 카테고리 설정
  const toCategory = (currentCategory: string) => {
    if (category === currentCategory) return

    dispatch(setCategory(currentCategory))
    dispatch(setLoading('block'))
  }

  // 게임 정렬 설정
  const filterSort = (sortName: string, sortState: string) => {
    setSortName(sortName)
    setSortState(sortState)
  }

  // 게임 필터 적용 시 활성화
  const Tag = () => {
    const tagStyle: string = 'bg-neutral-500 rounded-lg px-3 ml-3'

    return (
      <div className='flex flex-wrap mt-2 text-base sm:text-lg md:text-xl lg:text-2xl'>
        <span>적용된 필터 :</span>
        {(isFilter as string[]).map((item, index) => (<span key={index} className={`${tagStyle}`}>{item}</span>))}
      </div>
    )
  }

  // 게임 필터
  const TagList = () => {
    return (
      <div className={`${isTagListOn ? 'block' : 'hidden'} absolute top-0 -right-3 sm:right-0 z-40 3xl:block 3xl:fixed 3xl:top-[initial] 3xl:bottom-[1.25rem] 3xl:right-[calc(50%+39.2rem)]`}>
        <GameFilter setIsFilter={setIsFilter} setIsTagListOn={setIsTagListOn}></GameFilter>
      </div>
    )
  }

  // 드롭박스 뷰 state
  const [categoryVis, setCategoryVis] = useState<boolean>(false)
  const [sortVis, setSortVis] = useState<boolean>(false)
  const buttonFilter: string = 'flex items-center p-2 !leading-none w-full'

  return (
    <div className='relative flex flex-col mx-3 mt-5 lg:mx-6 scroll-mt-[5rem] md:scroll-mt-[6rem]' ref={scroolRef}>
      <div className='relative z-10 flex justify-between text-2xl sm:text-3xl'>

        <div className='relative flex items-center justify-between cursor-pointer' onClick={() => { setCategoryVis(!categoryVis) }} onBlur={() => { setCategoryVis(false) }} tabIndex={0}>
          {category === 'home' && <span>상점 홈</span>}
          {category === 'sales' && <span>#특별 할인</span>}
          {category === 'new' && <span>#신작</span>}
          <svg className='flex items-center ml-2 md:hidden' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.363 6.363a1.239 1.239 0 000 1.752l8.76 8.761a1.239 1.239 0 001.753 0l8.761-8.76a1.239 1.239 0 10-1.752-1.753L12 14.248 4.115 6.363a1.239 1.239 0 00-1.752 0z" fill="currentColor"></path></svg>
          <div className="absolute left-0 flex-col flex-wrap w-full rounded-md text-xl top-full bg-neutral-900 min-w-[7rem]">
            <Dropdown visble={categoryVis}>
              <button className={buttonFilter} onMouseDown={() => { toCategory('home') }}><span>상점 홈</span></button>
              <button className={buttonFilter} onMouseDown={() => { toCategory('sales') }}><span>#특별 할인</span></button>
              <button className={buttonFilter} onMouseDown={() => { toCategory('new') }}><span>#신작</span></button>
            </Dropdown>
          </div>
        </div>

        <div className='flex'>
          <div className='w-[6.8rem] text-sm text-black border-2 rounded-md sm:w-[7.5rem] md:w-[8rem] sm:text-base md:text-lg bg-neutral-100 h-fit border-neutral-500'>
            <div className='relative flex items-center justify-between px-2 py-1 !leading-none w-full cursor-pointer' onClick={() => { setSortVis(!sortVis) }} onBlur={() => { setSortVis(false) }} tabIndex={0}>
              <span>{sortName}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.363 6.363a1.239 1.239 0 000 1.752l8.76 8.761a1.239 1.239 0 001.753 0l8.761-8.76a1.239 1.239 0 10-1.752-1.753L12 14.248 4.115 6.363a1.239 1.239 0 00-1.752 0z" fill="currentColor"></path></svg>
              <div className="absolute left-0 flex-col flex-wrap w-full border-2 rounded-md top-full bg-neutral-100 border-neutral-500">
                <Dropdown visble={sortVis}>
                  <button className={buttonFilter} onMouseDown={() => { filterSort('이름 순', 'sortAbc') }}><span>이름 순</span></button>
                  <button className={buttonFilter} onMouseDown={() => { filterSort('최신 순', 'sortNew') }}><span>최신 순</span></button>
                  <button className={buttonFilter} onMouseDown={() => { filterSort('할인 높은 순', 'sortSale') }}><span>할인 높은 순</span></button>
                  <button className={buttonFilter} onMouseDown={() => { filterSort('가격 낮은 순', 'sortChip') }}><span>가격 낮은 순</span></button>
                </Dropdown>
              </div>
            </div>
          </div>

          <button className='px-2 py-1 text-sm rounded-md bg-sky-500 sm:text-base md:text-lg h-fit !leading-none border-2 border-sky-500 ml-2 3xl:hidden' onClick={() => { setIsTagListOn(true) }}>필터</button>
        </div>

      </div>

      {isFilter && <Tag></Tag>}
      <TagList></TagList>
    </div>
  )
}

export default GameFlexHeader;