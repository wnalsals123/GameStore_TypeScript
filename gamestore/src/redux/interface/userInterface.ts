export interface Iuser {
  username: string,
  password: string,
  passwordOk: string,
  email: string,
  nickname: string,
  exp: number,
  point: number,
  구매: Iuser구매[],
  리뷰: Iuser리뷰[],
  쿠폰: Iuser쿠폰[]
}

export interface Iuser구매 {
  주문번호: string,
  상품명: string,
  결제수단: string,
  결제금액: number,
  주문일자: string,
  결제상태: string,
  key: number
}

export interface Iuser리뷰 {
  게임명: string,
  commentId: string
}

export interface Iuser쿠폰 {
  쿠폰명: string,
  사용: boolean
}