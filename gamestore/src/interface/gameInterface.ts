export interface IGame {
  gameID: number;
  게임명: string;
  유통사: string;
  설명: string;
  이미지: string;
  동영상: string;
  가격: number;
  할인: number;
  신작: boolean;
  출시일: number;
  태그 : TTag,
  리뷰 : IGame리뷰[]
}

export type TTag = {
  [key: string]: boolean,
}

export interface IGame리뷰 {
  commentId : string,
  username : string,
  nickname : string,
  좋아요 : number,
  리뷰내용 : string,
  작성일 : string
}