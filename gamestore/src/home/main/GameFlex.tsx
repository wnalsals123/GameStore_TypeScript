import GameFlexBanner from './GameFlexBanner'
import GameFlexHeader from './GameFlexHeader'
import GameFlexBox from './GameFlexBox'
import GameFlexPagination from './GameFlexPagination'
import GameFlexFooter from './GameFlexFooter'
import SideBarContent from '../side/SideBarContent'
import SearchResult from '../../function/SearchResult'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useMoveScrool from '../../function/MoveScrool'

const GameFlex = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const keyword: string | null = searchParams.get('keyword')
  const gameTag: string[] = ["오픈월드", "멀티플레이", "협동", "액션", "공포", "좀비", "어드벤처", "스포츠", "리듬", "인디", "MMORPG", "FPS"]
  const [sortState, setSortState] = useState<string>('sortAbc')
  const [isFilter, setIsFilter] = useState<string[] | boolean>(false)
  const [totalPage, setTotalPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [scroolRef, onMoveToElement] = useMoveScrool()

  return (
    <div className='relative flex justify-center pb-5'>
      <div className='hidden'>
        {gameTag.map((item, index) => <input key={index} id={item} type='checkbox'></input>)}
      </div>

      <div className='hidden fixed left-[calc(50%-58rem)] border-r-[1px] border-neutral-500 3xl:block'>
        <SideBarContent></SideBarContent>
      </div>

      {keyword === null &&
        <div className='relative w-full text-white max-w-screen-2xl 3xl:ml-80'>
          <GameFlexBanner></GameFlexBanner>
          <GameFlexHeader setSortState={setSortState} isFilter={isFilter} setIsFilter={setIsFilter} scroolRef={scroolRef}></GameFlexHeader>
          <GameFlexBox isFilter={isFilter} sortState={sortState} setTotalPage={setTotalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}></GameFlexBox>
          <GameFlexPagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} onMoveToElement={onMoveToElement}></GameFlexPagination>
          <GameFlexFooter></GameFlexFooter>
        </div>
      }

      {keyword !== null && <SearchResult keyword={keyword}></SearchResult>}
    </div>
  )
}

export default React.memo(GameFlex);