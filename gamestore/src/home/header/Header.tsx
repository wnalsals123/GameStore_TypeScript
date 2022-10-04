// import AutoCompleteSearch from "../../function/AutoCompleteSearch";
// import Dropdown from "../../function/DropDown";
// import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setisSideOpen } from "../../redux/state/isSideOpen";

function Header() {
  const cartCount = useAppSelector(state => state.cart.value)
  const isSideOpen = useAppSelector(state => state.isSideOpen.value)
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  // const location = useLocation()

  /* 장바구니로 이동 */
  const toCart = () => {
    // document.body.style.overflow = 'hidden'
    // sessionStorage.setItem('FirstPage', false)
    // navigate(`/cart${location.search}`)
  }

  /* 마이페이지로 이동 */
  const toMyPage = () => {
    // document.body.style.overflow = 'hidden'
    // sessionStorage.setItem('FirstPage', false)
    // isLogin ? navigate(`/mypage${location.search}`) : navigate(`/login${location.search}`)
  }

  /* 카테고리 설정 */
  const toCategory = (currentCategory:string) => {
    // navigate('/')
    // if (category === currentCategory) return

    // setCategory(currentCategory)
    // setLoading('block')
    console.log(currentCategory)
  }

  /* 검색창 뷰 state */
  const [searchVis, setSearchVis] = useState(false)

  return (
    <div className="px-2 py-2 bg-neutral-100 md:px-5 md:py-4">

      <div className="relative mx-auto max-w-screen-2xl 3xl:max-w-[116rem]">

        <button className="absolute inline-block mr-5 align-middle bg-no-repeat bg-cover md:hidden top-2 left-2 2xl:left-0 w-7 md:w-8 h-7 md:h-8 bg-menu-btn" onClick={() => { dispatch(setisSideOpen(!isSideOpen)) }}></button>

        <div className="inline-block w-full ml-0 text-center md:w-fit md:text-left">
          <a className='inline-flex items-center align-middle' href='/'>
            <img className="block w-11 md:w-12" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
            <span className="block pl-4 !leading-none text-2xl md:text-3xl">Game Store</span>
          </a>
        </div>

        <div className="hidden ml-10 text-xl align-middle md:inline-block">
          <button className="ml-0" onClick={() => { toCategory('home') }}>홈</button>
          <button className="ml-5" onClick={() => { toCategory('sales') }}>특별 할인</button>
          <button className="ml-5" onClick={() => { toCategory('new') }}>신작</button>
        </div>

        <div className="hidden ml-5 align-middle md:inline-block lg:hidden">
          <button className="w-6 h-6 align-middle bg-no-repeat bg-cover bg-search-btn" onClick={() => { setSearchVis(!searchVis) }}></button>
        </div>

        <div className="w-[16rem] h-10 ml-5 align-middle hidden lg:inline-block">
          {/* <AutoCompleteSearch setSearchVis={setSearchVis}></AutoCompleteSearch> */}
        </div>

        <div className="absolute top-0 right-0 h-full">
          <div className="flex items-center h-full">
            <button className="inline-block align-middle bg-no-repeat bg-cover md:hidden w-7 h-7 bg-search-btn" onClick={() => { setSearchVis(!searchVis) }}></button>
            <button className="relative hidden ml-6 md:inline-block" onClick={() => { toCart() }}>
              <img className="w-8 sm:w-9 md:w-10" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img>
              {cartCount !== 0 && <span className='absolute h-4 px-1 text-sm leading-none text-white rounded-full -top-2 -right-1 bg-sky-500'>{cartCount}</span>}
            </button>
            <button className="hidden ml-6 md:inline-block" onClick={() => { toMyPage() }}>
              <img className="w-9 md:w-10" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img>
            </button>
          </div>
        </div>

        {/* <Dropdown visble={searchVis}>
          <div className="fixed top-[3.75rem] md:top-[5rem] left-0 w-screen lg:hidden">
            <div className="flex items-center justify-center bg-opacity-70 bg-neutral-500">
              <div className="w-[16rem] h-10">
                <AutoCompleteSearch setSearchVis={setSearchVis}></AutoCompleteSearch>
              </div>
            </div>
          </div>
        </Dropdown> */}

      </div>

    </div>
  );
}

export default Header;