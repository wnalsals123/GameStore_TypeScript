import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import GameList from "../../json/GameList.json"
import { IGame } from "../../redux/interface/gameInterface";

interface IProps {
  addCart: (selectedItem: IGame) => void,
  isFilter: boolean | string[],
  sortState: string,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

/* 게임 목록 박스 */
const GameFlexBox = (props: IProps) => {
  const category = useAppSelector(state => state.category.value)
  const loading = useAppSelector(state => state.loading.value)
  const { addCart, isFilter, sortState, setTotalPage, currentPage, setCurrentPage } = props
  // const navigate = useNavigate()
  const [gameDataView, setGameDataView] = useState<IGame[]>([])
  const [sliceArray, setSliceArray] = useState<boolean | IGame[][]>(false)

  /* 상세보기 이동 함수 */
  const toDetail = (item: IGame) => {
    // document.body.style.overflow = 'hidden'
    // sessionStorage.setItem('FirstPage', false)
    // navigate(`/games/${item.게임명}`);
    console.log(item)
  }

  /* 해당 게임 목록 불러오기 */
  useEffect(() => {
    const gameData: IGame[] = JSON.parse(JSON.stringify(GameList))
    let filterGameData = category === 'home' ? gameData : category === 'sales' ? gameData.filter((item) => (item.할인 !== 0)) : category === 'new' ? gameData.filter((item) => (item.신작 === true)) : gameData

    /* 게임 데이터 불러오기 실패 시 로컬 데이터 사용 */
    if (filterGameData === null) return

    /* 게임 데이터 정렬 */
    if (sortState === 'sortAbc') {
      filterGameData = filterGameData.sort((a, b) => a.게임명.toLowerCase() < b.게임명.toLowerCase() ? -1 : 1);
      setGameDataView(filterGameData)
    } else if (sortState === 'sortNew') {
      filterGameData = filterGameData.sort((a, b) => a.출시일 > b.출시일 ? -1 : 1);
      setGameDataView(filterGameData)
    } else if (sortState === 'sortSale') {
      filterGameData = filterGameData.sort((a, b) => a.할인 > b.할인 ? -1 : 1);
      setGameDataView(filterGameData)
    } else if (sortState === 'sortChip') {
      filterGameData = filterGameData.sort((a, b) => (a.할인 === 0 ? a.가격 : (a.가격 * (1 - a.할인))) < (b.할인 === 0 ? b.가격 : (b.가격 * (1 - b.할인))) ? -1 : 1);
      setGameDataView(filterGameData)
    } else {
      console.log('sorterror!')
    }

    /* 게임 데이터 필터 */
    if (isFilter) {
      for (let i = 0; i < (isFilter as string[]).length; i++) {
        filterGameData = filterGameData.filter(item => item.태그[(isFilter as string[])[i]])
      }
      setGameDataView(filterGameData)
    }

    /* 페이지 나누기 */
    if (filterGameData.length > 12) {
      const replica = [...filterGameData];
      const temp = [];

      while (replica.length) {
        temp.push(replica.splice(0, 12));
      }
      setCurrentPage(1)
      setTotalPage(temp.length)
      setSliceArray(temp)
    } else {
      setCurrentPage(1)
      setTotalPage(1)
      setSliceArray(false)
    }
  }, [category, sortState, isFilter, setTotalPage, setCurrentPage])

  return (
    <div className='relative flex flex-wrap text-sm text-center sm:text-base lg:text-lg'>
      {gameDataView.length === 0 && <div className='mx-3 mt-5 text-2xl lg:mx-6 sm:text-3xl'><span>적용된 필터에 해당하는 게임이 없습니다.</span></div>}
      {(sliceArray ? (sliceArray as IGame[][])[currentPage - 1] : gameDataView).map((item: IGame) => (
        <div key={item.게임명} className='group relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] cursor-pointer 2xl:h-96' tabIndex={0}>
          <div className='relative w-full h-full'>
            <img className='object-cover w-full h-full border-2 shadow-md border-neutral-100 rounded-xl shadow-neutral-100' src={item.이미지} alt='game-logo'></img>
            <span className='absolute px-2 rounded-md bottom-2 left-2 bg-neutral-500 bg-opacity-70'>{item.게임명}</span>
            <div className='absolute top-2 left-2'>
              {item.가격 === 0 && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>무료 플레이</span>}
              {item.할인 !== 0 && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70 sm:hidden'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
              {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70 sm:hidden'>NEW</span>}
              <span className={`block px-2 bg-red-500 rounded-md bg-opacity-70 ${item.할인 !== 0 && "line-through"} ${item.가격 === 0 && "hidden"}`}>{(item.가격).toLocaleString() + "원"}</span>
              {item.할인 !== 0 && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
            </div>
            <div className='absolute hidden sm:block top-2 right-2'>
              {item.할인 !== 0 && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
              {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70'>NEW</span>}
            </div>
          </div>
          <div className='absolute top-0 left-0 flex-col items-center justify-center hidden w-full h-full group-focus:flex rounded-xl bg-neutral-100 bg-opacity-70'>
            <button className='px-5 py-2 mb-10 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(item) }}>상세보기</button>
            <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { addCart(item) }}>장바구니</button>
          </div>
          <div className={`${loading} absolute top-0 left-0 flex items-center justify-center w-full h-full rounded-lg bg-neutral-900 animate-loadingGame`}>
            <svg className="w-1/2 text-white h-1/2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameFlexBox;