import { createFuzzyMatcher } from "./StringMatcher";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCart, toDetail } from "./PageFunction";
import { IGame } from "../interface/gameInterface";

interface IProps {
  keyword: string
}

/* 검색 결과 페이지 */
const SearchResult = (props: IProps) => {
  const gameData = useAppSelector(state => state.gameData.value)
  const { keyword } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const regex = createFuzzyMatcher(keyword.toLowerCase());
  const filterGameData = gameData.filter((item) => (regex.test(item.게임명.toLowerCase())))

  /* 검색 결과 리스트 */
  const ResultFlex = filterGameData.map((item: IGame) => (
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
        <button className='px-5 py-2 mb-10 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(navigate, location, item) }}>상세보기</button>
        <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { addCart(dispatch, item) }}>장바구니</button>
      </div>
    </div>
  ))

  return (
    <div className='relative w-full text-white max-w-screen-2xl 3xl:ml-80'>
      <div className="mx-3 mt-5 text-xl md:text-2xl lg:text-3xl lg:mx-6">
        {filterGameData.length === 0 && <span>{`"${keyword}"에 대한 검색 결과가 없습니다.`}</span>}
        {filterGameData.length !== 0 && <span>{`"${keyword}"에 대한 검색 결과입니다.`}</span>}
      </div>
      <div className='relative flex flex-wrap text-sm text-center sm:text-base lg:text-lg'>
        {ResultFlex}
      </div>
      <div className="flex justify-between pt-[3rem] xsm:pt-[10rem] text-white mx-3 lg:mx-6 text-sm xsm:text-base sm:text-xl">
        <div className="flex items-center">
          <img className="w-8 sm:w-10 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
          <span className="pl-2 !leading-none sm:pl-4">Game Store</span>
        </div>
        <div>
          <div className="flex items-center h-full"><span>Made by JMJ</span></div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult