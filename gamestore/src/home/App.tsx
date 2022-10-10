import { useEffect } from "react";
import { getCookie, removeCookie } from "../function/Cookie";
import Header from "./header/Header";
import GameFlex from "./main/GameFlex";
import SideBar from "./side/SideBar";
import GameList from '../json/GameList.json'
import UserData from '../json/UserData.json'
import { useAppDispatch } from "../redux/hooks";
import { setIsLogin } from "../redux/state/isLogin";
import { setCart } from "../redux/state/cart";
import { setGameData } from "../redux/state/gameData";
import { Outlet, useLocation } from 'react-router-dom';
import PopDown from "../function/PopDown";

function App() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const version = '1.0'

   /* 사이트 연결 설정 */
   useEffect(() => {
    // 버전 불러오기
    const getVersion = localStorage.getItem('version')

    // 캐시 초기화
    const cacheReset = () => {
      localStorage.clear()
      sessionStorage.clear()
      removeCookie('LoginSession')
    }

    // 데이터 초기화
    const dataInit = () => {
      localStorage.setItem('version', version)
      localStorage.setItem("GameList", JSON.stringify(GameList))
      localStorage.setItem("UserData", JSON.stringify(UserData))
      sessionStorage.setItem('FirstPage', 'true')
    }

    // 첫 접속 시 데이터 설정
    if (getVersion === null) {
      cacheReset()
      dataInit()
      return
    }

    // 버전 다를 시 데이터 초기화
    if (getVersion !== version) {
      alert('데이터 오류로 초기화합니다!')
      cacheReset()
      dataInit()
      return
    }

    // 브라우저 첫 페이지 확인
    sessionStorage.setItem('FirstPage', 'true')

    // 게임 데이터 불러오기
    const gameList = JSON.parse(localStorage.getItem("GameList") as string)
    dispatch(setGameData(gameList))

    // 로그인 상태 확인
    const loginInfo = localStorage.getItem("LoginInfo")
    const loginSession = !!getCookie("LoginSession")
    if (!!loginInfo && !!loginSession) dispatch(setIsLogin(true))

    // 장바구니 확인
    const isUserCart = localStorage.getItem("UserCart") !== null
    if (isUserCart) dispatch(setCart(JSON.parse(localStorage.getItem("UserCart") as string).length))
  }, [dispatch])

    /* 스크롤바 초기화 */
    useEffect(() => {
      location.pathname === '/' && (document.body.style.overflow = 'auto')
    }, [location])

  return (
    <div className='relactive'>
    <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
      <Header></Header>
      <SideBar></SideBar>
    </div>
    <GameFlex></GameFlex>
    <Outlet></Outlet>
    <PopDown></PopDown>
  </div>
  );
}

export default App;
