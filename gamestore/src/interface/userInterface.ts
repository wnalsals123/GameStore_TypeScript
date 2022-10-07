export interface IUser {
  username: string,
  password: string,
  passwordOk: string,
  email: string,
  nickname: string,
  exp: number,
  point: number,
  구매: IUser구매[],
  리뷰: IUser리뷰[],
  쿠폰: IUser쿠폰[],
  좋아요: string[]
}

export interface IUser구매 {
  주문번호: string,
  상품명: string,
  결제수단: string,
  결제금액: number,
  주문일자: string,
  결제상태: string,
  key: number
}

export interface IUser리뷰 {
  게임명: string,
  commentId: string
}

export interface IUser쿠폰 {
  쿠폰명: string,
  사용: boolean
}