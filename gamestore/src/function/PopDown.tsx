import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setIsAddCart } from "../redux/state/isAddCart"
import { toCart } from "./PageFunction"

/* 장바구니 담기 팝업 */
const PopDown = () => {
  const isAddCart = useAppSelector(state => state.isAddCart.value)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  /* 팝업 애니메이션 설정 */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | number = 0

    timer = setTimeout(() => { dispatch(setIsAddCart(false)) }, 2390)

    return () => { clearTimeout(timer) }
  }, [isAddCart, dispatch])

  /* 팝업 렌더링 */
  const CartView = () => {
    return (
      <div className="flex justify-center mt-16 sm:mt-32">

        <div className="flex flex-wrap items-center justify-center p-2 text-xl border-2 rounded-xl sm:p-5 sm:text-2xl border-neutral-100 bg-neutral-900">
          <span className="text-white">장바구니에 담았습니다</span>
          <div className="flex text-white bg-opacity-70">
            <button className="px-2 ml-2 rounded-md sm:ml-5 bg-sky-500" onClick={() => { toCart(navigate, location) }}>보기</button>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${isAddCart ? 'animate-popDown' : 'animate-none'}`}>
      {isAddCart && <CartView></CartView>}
    </div>
  )
}

export default PopDown;