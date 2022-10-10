import CouponList from "../json/CouponList.json"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCookie, removeCookie } from "../function/Cookie";
import { IUser, IUser쿠폰 } from "../interface/userInterface";
import { IGame } from "../interface/gameInterface";
import { useAppDispatch } from "../redux/hooks";
import { setCart } from "../redux/state/cart";
import { toBack } from "../function/PageFunction";
interface IState {
  loginInfo: string,
  paymentItem: IGame[],
  totalAmount: number
}

/* 주문결제 페이지 */
const Payment = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { loginInfo, paymentItem, totalAmount } = location.state === null ? { loginInfo: 'temp', paymentItem: [], totalAmount: 0 } : location.state as IState
  const userData = JSON.parse(localStorage.getItem("UserData") as string)
  const temp: IUser[] = userData.filter((item: IUser) => item.username === loginInfo)
  const user = temp[0]
  const [selectedCouponBtn, setSelectedCouponBtn] = useState<number | boolean>(false)
  const [totalPayment, setTotalPayment] = useState(totalAmount)
  const [coupon, setCoupon] = useState<TCoupon | number>(0)
  const [point, setPoint] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<null | string>(null)
  type TCoupon = {
    쿠폰명: string,
    혜택: string,
    만료일: string,
    할인율: number
  }

  /* 세션 만료 시 리디렉션 */
  useEffect(() => {
    if (!!getCookie("PaymentSession") !== true) {
      alert("만료된 페이지입니다!")
      navigate('/')
    }
  }, [navigate])

  /* 유저 쿠폰 불러오기 */
  const userCoupon = (userCouponHistory: IUser쿠폰[]) => {
    let result: TCoupon[] = []
    for (let i = 0; i < userCouponHistory.length; i++) {
      let temp = CouponList.filter(item => item.쿠폰명 === (userCouponHistory[i]).쿠폰명 && (userCouponHistory[i]).사용 === false)
      result = result.concat(temp)
    }
    return result
  }

  /* 쿠폰 할인금액 */
  const couponDiscountAmount = () => {
    if (coupon === 0) return 0
    else return totalAmount * (coupon as TCoupon).할인율
  }

  /* 쿠폰 적용 */
  const couponConfirm = (index: number | boolean, selectedCoupon: TCoupon | number) => {
    (document.getElementById('point') as HTMLInputElement).value = ""
    setPoint(0)
    selectedCoupon === 0 ? setTotalPayment(totalAmount) : setTotalPayment(totalAmount * (1 - (selectedCoupon as TCoupon).할인율))
    setSelectedCouponBtn(index)
    setCoupon(selectedCoupon)
  }

  /* 포인트 전액사용 */
  const pointMax = () => {
    const element = document.getElementById('point')

    if (totalPayment <= user.point) {
      (element as HTMLInputElement).value = totalPayment.toString()
      pointConfirm()
    }
    else {
      (element as HTMLInputElement).value = user.point.toString()
      pointConfirm()
    }
  }

  /* 포인트 인풋 체인지 리스너 */
  const pointInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let onlyNumber = e.target.value.replace(/[^0-9]/gi, "")
    let result = "";
    const maxLength = 5

    for (let i = 0; i < onlyNumber.length && i < maxLength; i++) {
      result += onlyNumber[i];
    }

    e.target.value = result
  }

  /* 포인트 적용 */
  const pointConfirm = () => {
    const inputPoint = Number((document.getElementById('point') as HTMLInputElement).value)

    if (inputPoint === 0 || isNaN(inputPoint)) return

    if (inputPoint > user.point) {
      alert("보유 포인트 초과했습니다!")
      return
    }

    if (inputPoint > totalPayment) {
      alert("결제금액보다 포인트가 많습니다!")
      return
    }

    coupon === 0 ? setTotalPayment(totalAmount - inputPoint) : setTotalPayment(totalAmount * (1 - (coupon as TCoupon).할인율) - inputPoint)
    setPoint(inputPoint)
  }

  /* 포인트 취소 */
  const pointCencel = () => {
    (document.getElementById('point') as HTMLInputElement).value = ""
    coupon === 0 ? setTotalPayment(totalAmount) : setTotalPayment(totalAmount * (1 - (coupon as TCoupon).할인율))
    setPoint(0)
  }

  /* 포인트 엔터 리스너 */
  const enterCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') pointConfirm()
  }

  /* 결제수단 리스너 */
  const paymentMethodChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const paymentName = e.currentTarget.name

    if (paymentName === paymentMethod) {
      setPaymentMethod(null)
      return
    }

    setPaymentMethod(paymentName as string)
  }

  /* 적립금액 확인 */
  const getReserves = (exp: number) => {
    if (exp < 1000) return 0.01
    else if (exp < 3000) return 0.02
    else if (exp < 6000) return 0.03
    else if (exp < 10000) return 0.04
    else return 0.05
  }

  /* 주문일자 확인 */
  const getDate = () => {
    let today = new Date()
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
  }

  /* 결제수단 확인 */
  const getPaymentMethod = (method: string) => {
    if (method === 'creditCard') return '신용카드'
    else if (method === 'easyPay') return '간편결제'
    else if (method === 'cellPhone') return '휴대폰'
    else return '결제오류'
  }

  /* 결제 확인 */
  const paymentConfirmation = () => {
    if (paymentMethod === null) {
      alert("결제 수단을 선택해 주세요!")
      return
    }

    // 유저 구매 내역 업데이트
    let purchaseUp = []
    for (let i = 0; i < paymentItem.length; i++) {

      let temp = {
        주문번호: '00000000',
        상품명: paymentItem[i].게임명,
        결제수단: getPaymentMethod(paymentMethod),
        결제금액: totalPayment,
        주문일자: getDate(),
        결제상태: "결제완료",
        key: 123456789
      }
      purchaseUp.push(temp)
    }
    purchaseUp = user.구매.concat(purchaseUp)

    // 유저 쿠폰 내역 업데이트
    let couponUp = null
    coupon === 0 ? couponUp = user.쿠폰 : couponUp = user.쿠폰.map(item => item.쿠폰명 === (coupon as TCoupon).쿠폰명 ? { ...item, 사용: true } : item)

    // 유저 포인트 내역 업데이트
    let pointUp = user.point - point
    pointUp = pointUp + Math.ceil(totalPayment * getReserves(user.exp))

    // 유저 정보 설정
    const updateUser = {
      ...user,
      point: pointUp, // 업데이트
      구매: purchaseUp, // 업데이트
      쿠폰: couponUp, // 업데이트
    }

    // 유저 데이터 업데이트
    const userData = JSON.parse(localStorage.getItem("UserData") as string)
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].username === loginInfo) {
        let temp = userData
        temp[i] = updateUser
        localStorage.setItem("UserData", JSON.stringify(temp))
        break
      }
    }

    // 장바구니 비우기
    localStorage.removeItem("UserCart")
    dispatch(setCart(0))

    // 최종 결제 완료 쿠키 삭제
    alert("결제완료")
    removeCookie("PaymentSession")
    navigate(`/${location.search}`)
  }

  const wrongApproach = () => { alert('잘못된 접근입니다!') }

  return (
    <>
      {user === undefined ? wrongApproach()
        :
        <div className='fixed top-0 left-0 z-40 w-full h-full'>
          <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
            <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-screen sm:w-[calc(100%-5rem)] bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>

              <div className='relative w-full h-full p-2 text-base sm:p-5 sm:text-xl md:text-2xl'>

                <div className="sticky top-0 flex justify-between p-2 mb-2 rounded-lg sm:p-5 sm:mb-5 itmes-center bg-neutral-100">
                  <span>주문결제</span>
                  <div className="flex items-center"><button className="w-5 h-5 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={() => { toBack(navigate) }}></button></div>
                </div>

                <div className="min-h-[31.25rem] mb-2 sm:mb-10">
                  <div className="flex flex-col mb-10 sm:mb-20">
                    <span className="pb-2 text-white">결제목록</span>
                    <div className="flex justify-between text-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                      <span className="basis-[20%] shrink-0 border-r-[1px]">이미지</span>
                      <span className="basis-[30%] shrink-0 border-r-[1px]">게임명</span>
                      <span className="basis-[25%] shrink-0 border-r-[1px]">가격</span>
                      <span className="basis-[25%] shrink-0">합계</span>
                    </div>
                    {paymentItem.map((item, index) => (
                      <div className="flex justify-between text-sm text-white border-[1px] border-t-0 md:text-base lg:text-xl" key={index}>
                        <div className="basis-[20%] shrink-0 border-r-[1px] h-[5rem] xsm:h-[6rem] sm:h-[7rem] lg:h-[8rem] p-1"><img className="object-cover w-full h-full" src={item.이미지} alt="game-logo"></img></div>
                        <div className="flex justify-center items-center basis-[30%] shrink-0 border-r-[1px]"><span>{item.게임명}</span></div>
                        <div className="flex xsm:flex-row justify-end items-center basis-[25%] shrink-0 border-r-[1px]">
                          {item.가격 !== 0 && <div className="flex flex-col items-end justify-end flex-grow pr-1 xsm:items-center xsm:flex-row">
                            <span className={`${item.할인 !== 0 && 'line-through'}`}>{(item.가격).toLocaleString() + "원"}</span>
                            {item.할인 !== 0 && <span>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
                          </div>}
                          {item.가격 === 0 && <div className="flex justify-end items-center basis-[45%] shrink-0 flex-grow"><span className="pr-1">무료 플레이</span></div>}
                        </div>
                        <div className="flex justify-end items-center basis-[25%] shrink-0"><span className="pr-1">{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span></div>
                      </div>
                    ))}
                    <div className="flex text-base text-center text-white bg-neutral-900 md:text-xl">
                      <div className="flex-grow py-2 text-right shrink-0"><span className="px-1 mr-1 rounded-md bg-neutral-500">{`총 합계: ${totalAmount.toLocaleString()}원`}</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col mb-10 sm:mb-20">
                    <span className="pb-2 text-white">쿠폰 할인</span>
                    <div className="flex justify-center text-white border-[1px] bg-neutral-500 text-base md:text-xl py-2">
                      <span>쿠폰 목록</span>
                    </div>
                    {userCoupon(user.쿠폰).length !== 0 &&
                      <div className="flex text-white border-[1px] border-t-0 text-base md:text-xl items-center py-2">
                        <span className="px-2">쿠폰 사용안함</span>
                        <button className={`w-3 h-3 md:w-4 md:h-4 ${selectedCouponBtn === false ? 'bg-neutral-900' : 'bg-white'} border-[2px] md:border-[3px] border-white rounded-full outline outline-1 outline-neutral-500 outline-offset-2`} onClick={() => { couponConfirm(false, 0) }}></button>
                      </div>
                    }
                    {userCoupon(user.쿠폰).length === 0 ?
                      <div className="flex text-white border-[1px] border-t-0 text-base md:text-xl items-center py-2">
                        <span className="px-2 text-base text-white md:text-xl">사용가능한 쿠폰이 없습니다.</span>
                      </div>
                      :
                      userCoupon(user.쿠폰).map((item, index) => (
                        <div className="flex text-white border-[1px] border-t-0 text-base md:text-xl items-center py-2" key={index}>
                          <span className="px-2">{item.혜택}</span>
                          <button className={`w-3 h-3 md:w-4 md:h-4 ${selectedCouponBtn === index ? 'bg-neutral-900' : 'bg-white'} border-[2px] md:border-[3px] border-white rounded-full outline outline-1 outline-neutral-500 outline-offset-2`} onClick={() => { couponConfirm(index, item) }}></button>
                        </div>
                      ))
                    }
                    <div className="flex text-base text-center text-white bg-neutral-900 md:text-xl">
                      <div className="flex-grow py-2 text-right shrink-0"><span className="px-1 mr-1 rounded-md bg-neutral-500">{`할인 금액: ${couponDiscountAmount().toLocaleString()}원`}</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col mb-10 sm:mb-20">
                    <div className="flex items-center pb-2">
                      <span className="mr-2 text-white">포인트 할인</span>
                      <span className="px-2 mr-2 text-sm text-white rounded-md md:text-base bg-neutral-500">{`남은 포인트: ${user.point - point}P`}</span>
                      <button className="px-2 text-sm text-white rounded-md md:text-base bg-sky-500" onClick={pointMax}>전액사용</button>
                    </div>
                    <div className="flex text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                      <div className="flex items-center basis-[33.33%] border-r-[1px]">
                        <input className="box-border flex-grow w-10 p-2 bg-neutral-900 placeholder:text-white placeholder:text-opacity-50 outline-0" placeholder="0" id="point" autoComplete='off' onKeyUp={enterCheck} onChange={pointInputCheck}></input>
                        <span className="p-2 bg-neutral-900">P</span>
                      </div>
                      <button className="basis-[33.33%] border-r-[1px]" onClick={pointConfirm}>적용</button>
                      <button className="basis-[33.33%]" onClick={pointCencel}>취소</button>
                    </div>
                    <div className="flex justify-end py-2 text-base text-center text-white bg-neutral-900 md:text-xl">
                      <span className="px-1 mr-1 rounded-md bg-neutral-500">{`할인 금액: ${point.toLocaleString()}원`}</span>
                    </div>
                  </div>

                  <div className="flex flex-col mb-10 sm:mb-20">
                    <span className="pb-2 text-white">결제 수단</span>
                    <div className="flex justify-between text-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                      <button className={`basis-[33.33%] border-r-[1px] p-2 ${paymentMethod === 'creditCard' && 'bg-sky-500'}`} onClick={paymentMethodChk} name='creditCard'>신용카드</button>
                      <button className={`basis-[33.33%] border-r-[1px] p-2 ${paymentMethod === 'easyPay' && 'bg-sky-500'}`} onClick={paymentMethodChk} name='easyPay'>간편결제</button>
                      <button className={`basis-[33.33%] p-2 ${paymentMethod === 'cellPhone' && 'bg-sky-500'}`} onClick={paymentMethodChk} name='cellPhone'>휴대폰</button>
                    </div>
                  </div>

                </div>

                <div className="sticky bottom-0 p-2 bg-opacity-50 rounded-lg sm:p-5 bg-neutral-100">
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="p-2 rounded-lg bg-neutral-100">{`최종 결제금액: ${totalPayment.toLocaleString()}원`}</span>
                    <button className="p-2 text-white rounded-lg bg-sky-500" onClick={paymentConfirmation}>결제확인</button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Payment;