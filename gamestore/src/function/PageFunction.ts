import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { Location, NavigateFunction } from "react-router-dom"
import { IGame } from "../interface/gameInterface"
import { setCart } from "../redux/state/cart"
import { setIsAddCart } from "../redux/state/isAddCart"
import { setIsLogin } from "../redux/state/isLogin"
import { removeCookie } from "./Cookie"

/* 장바구니에 추가*/
export const addCart = (dispatch: Dispatch<AnyAction>, selectedItem: IGame) => {
  const isUserCart = localStorage.getItem("UserCart") !== null

  if (isUserCart) {
    const userCart: IGame[] = JSON.parse(localStorage.getItem("UserCart") || "")
    const alreadyCart = userCart.filter((item: IGame) => (item.게임명 === selectedItem.게임명)).length > 0

    if (alreadyCart) {
      alert("이미 장바구니에 있습니다!")
      return
    }

    const temp = userCart.concat(selectedItem)
    localStorage.setItem("UserCart", JSON.stringify(temp))

    dispatch(setCart(temp.length))
    dispatch(setIsAddCart(true))
  } else {
    const temp: IGame[] = []
    localStorage.setItem("UserCart", JSON.stringify(temp.concat(selectedItem)))

    dispatch(setCart(1))
    dispatch(setIsAddCart(true))
  }
}

/* 상세보기 이동 */
export const toDetail = (navigate: NavigateFunction, location: Location, item: string | IGame) => {
  document.body.style.overflow = 'hidden'
  sessionStorage.removeItem('FirstPage')
  navigate(`/games/${typeof item === 'string' ? item : item.게임명}/${location.search}`);
}

/* 로그인으로 이동 */
export const toLogin = (navigate: NavigateFunction, location: Location) => {
  document.body.style.overflow = 'hidden'
  sessionStorage.removeItem('FirstPage')
  navigate(`/login${location.search}`)
}

/* 회원가입으로 이동 */
export const toSignUp = (navigate: NavigateFunction, location: Location) => {
  document.body.style.overflow = 'hidden'
  sessionStorage.removeItem('FirstPage')
  navigate(`/signup${location.search}`)
}

/* 마이페이지로 이동 */
export const toMyPage = (navigate: NavigateFunction, location: Location, isLogin: boolean) => {
  document.body.style.overflow = 'hidden'
  sessionStorage.removeItem('FirstPage')
  isLogin ? navigate(`/mypage${location.search}`) : navigate(`/login${location.search}`)
}

/* 장바구니로 이동 */
export const toCart = (navigate: NavigateFunction, location: Location) => {
  document.body.style.overflow = 'hidden'
  sessionStorage.removeItem('FirstPage')
  navigate(`/cart${location.search}`)
}

/* 뒤로가기 */
export const toBack = (navigate: NavigateFunction) => {
  document.body.style.overflow = 'auto'
  JSON.parse((sessionStorage.getItem('FirstPage') as string)) ? navigate('/') : navigate(-1);
}

/* 로그아웃 */
export const toLogout = (navigate: NavigateFunction, dispatch: Dispatch<AnyAction>) => {
  const message = "정말로 로그아웃하시겠습니까?"

  if (window.confirm(message)) {
    localStorage.removeItem("LoginInfo")
    removeCookie("LoginSession")
    dispatch(setIsLogin(false))
    navigate('/')
  } else {
    console.log("취소")
  }
}