import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCart, toBack } from "../function/PageFunction";
import { IGame, IGame리뷰 } from "../interface/gameInterface";
import { IUser, IUser리뷰 } from "../interface/userInterface";
import { useAppSelector } from "../redux/hooks";

/* 상세보기 페이지 */
const ItemDetail = () => {
  const dispatch = useDispatch()
  const isLogin = useAppSelector(state => state.isLogin.value)
  const { gameid } = useParams();
  const navigate = useNavigate();
  const [write, setWrite] = useState(false)

  let temp: IGame = {
    gameID: 0,
    게임명: '',
    유통사: '',
    설명: '',
    이미지: '',
    동영상: '',
    가격: 0,
    할인: 0,
    신작: false,
    출시일: 19961218,
    태그: {},
    리뷰: [],
  }

  const [gameDetail, setGameDetail] = useState<IGame>(temp)
  const [notYet, setNotYet] = useState<boolean>(true)
  const redirection = useRef(useNavigate())

  /* 게임 데이터 불러오기 */
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const GameData = JSON.parse(localStorage.getItem("GameList") as string)
    const game = GameData.filter((item: IGame) => (item.게임명 === gameid))

    setTimeout(() => {
      if (game.length !== 0) {
        setGameDetail(game[0])
        setNotYet(false)
      } else {
        setTimeout(() => {
          redirection.current('/games/NotFound')
        }, 500);
      }
    }, 500);
  }, [gameid])

  /* 게임 가격 가져오기 */
  const gamePrice = () => {
    if (gameDetail.가격 === 0) {
      return "무료 플레이"
    } else if (gameDetail.할인 !== 0) {
      return (gameDetail.가격 * (1 - gameDetail.할인)).toLocaleString() + "원"
    } else {
      return (gameDetail.가격).toLocaleString() + "원"
    }
  }

  /* 디테일 헤더 부분 */
  const GameHeader = () => {
    if (notYet) {
      return (
        <div className='sticky top-0 z-50 p-2 mb-2 text-center rounded-lg sm:mb-5 sm:p-5 bg-neutral-100 animate-pulse'>
          <span className='block text-xl sm:text-3xl animate-spin'>↻</span>
          <div className="absolute top-0 right-0 flex items-center h-full p-2 sm:p-5">
            <button className="w-5 h-5 bg-no-repeat bg-cover bg-close-btn sm:w-7 sm:h-7"></button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='sticky top-0 z-50 p-2 mb-2 rounded-lg sm:mb-5 sm:p-5 bg-neutral-100'>
          <span className='block text-xl sm:text-3xl'>{gameDetail.게임명}</span>
          <div className="absolute top-0 right-0 flex items-center h-full p-2 sm:p-5">
            <button className="w-5 h-5 bg-no-repeat bg-cover bg-close-btn sm:w-7 sm:h-7" onClick={() => { toBack(navigate) }}></button>
          </div>
        </div>
      )
    }
  }

  /* 게임 이미지 부분 */
  const GameImg = () => {
    if (notYet) {
      return (
        <div className="relative mb-2 sm:mb-5 animate-pulse">
          <div className="flex items-center justify-center h-48 bg-opacity-50 rounded-lg bg-neutral-100"><img className='object-cover w-20 h-20 filter-white animate-spin' src={"https://cdn-icons-png.flaticon.com/512/66/66165.png"} alt='game-logo'></img></div>
          <div className="absolute text-white top-2 right-2">
            {<span className="hidden px-2 rounded-lg sm:inline-block bg-violet-500"><span className="block animate-spin">↻</span></span>}
            {<span className="hidden px-2 ml-2 rounded-lg sm:inline-block bg-sky-500"><span className="block animate-spin">↻</span></span>}
          </div>
        </div>
      )
    } else {
      return (
        <div className="relative mb-2 sm:mb-5">
          <img className='object-cover w-full rounded-lg' src={gameDetail.이미지} alt='game-logo'></img>
          <div className="absolute text-white top-2 right-2">
            {gameDetail.신작 && <span className="hidden px-2 rounded-lg sm:inline-block bg-violet-500">NEW</span>}
            {gameDetail.할인 !== 0 && <span className="hidden px-2 ml-2 rounded-lg sm:inline-block bg-sky-500">{((gameDetail.할인) * 100).toFixed() + "%OFF"}</span>}
          </div>
        </div>
      )
    }
  }

  /* 게임 유튜브 부분 */
  const GameYoutube = () => {
    if (notYet) {
      return (
        <div className="flex items-center justify-center h-48 bg-opacity-50 rounded-lg bg-neutral-100 animate-pulse"><img className='object-cover w-20 filter-white animate-spin' src={"https://cdn-icons-png.flaticon.com/512/66/66165.png"} alt='game-logo'></img></div>
      )
    } else {
      return (
        <iframe className='w-full rounded-lg shadow-lg aspect-video' src={gameDetail.동영상} title="YouTube video player" frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      )
    }
  }

  /* 게임 태그 부분 */
  const Tag = () => {
    const tagStyle = 'bg-neutral-500 rounded-lg px-3 mr-2 sm:mr-5 mb-2 sm:mb-5'
    if (notYet) {
      return (
        <div className="flex flex-wrap animate-pulse">
          {<span className={`!bg-violet-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
          {<span className={`!bg-sky-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
          {<span className={`!bg-red-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
        </div>
      )
    } else {
      return (
        <div className="flex flex-wrap">
          {gameDetail.신작 && <span className={`!bg-violet-500 ${tagStyle}`}>NEW</span>}
          {gameDetail.할인 !== 0 && <span className={`!bg-sky-500 ${tagStyle}`}>{((gameDetail.할인) * 100).toFixed() + "%OFF"}</span>}
          {gameDetail.가격 === 0 && <span className={`!bg-red-500 ${tagStyle}`}>무료 플레이</span>}

          {gameDetail.태그.오픈월드 && <span className={`${tagStyle}`}>오픈월드</span>}
          {gameDetail.태그.멀티플레이 && <span className={`${tagStyle}`}>멀티플레이</span>}
          {gameDetail.태그.협동 && <span className={`${tagStyle}`}>협동</span>}
          {gameDetail.태그.액션 && <span className={`${tagStyle}`}>액션</span>}
          {gameDetail.태그.공포 && <span className={`${tagStyle}`}>공포</span>}
          {gameDetail.태그.좀비 && <span className={`${tagStyle}`}>좀비</span>}
          {gameDetail.태그.어드벤처 && <span className={`${tagStyle}`}>어드벤처</span>}
          {gameDetail.태그.스포츠 && <span className={`${tagStyle}`}>스포츠</span>}
          {gameDetail.태그.리듬 && <span className={`${tagStyle}`}>리듬</span>}
          {gameDetail.태그.인디 && <span className={`${tagStyle}`}>인디</span>}
          {gameDetail.태그.MMORPG && <span className={`${tagStyle}`}>MMORPG</span>}
          {gameDetail.태그.FPS && <span className={`${tagStyle}`}>FPS</span>}
        </div>
      )
    }
  }

  /* 게임 정보 부분 */
  const GameInfo = () => {
    const infoStyle = 'border-b-[1px] border-neutral-100 mb-2'
    if (notYet) {
      return (
        <div className="flex flex-col p-2 mb-2 text-center rounded-lg bg-neutral-100 sm:mb-5 sm:p-5 animate-pulse">
          <span className="p-2 mb-2 bg-orange-500 rounded-lg"><span className="block animate-spin">↻</span></span>
          <div className="flex flex-col p-2 rounded-lg bg-neutral-500">
            <span className="block animate-spin">↻</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col p-2 mb-2 rounded-lg bg-neutral-100 sm:mb-5 sm:p-5">
          <span className="p-2 mb-2 bg-orange-500 rounded-lg">게임 정보</span>
          <div className="flex flex-col p-2 rounded-lg bg-neutral-500">
            <span className={`${infoStyle}`}>게임명 : {gameDetail.게임명}</span>
            <span className={`${infoStyle}`}>유통사 : {gameDetail.유통사}</span>
            <span className={`${infoStyle}`}>출시일 : {String(gameDetail.출시일).replace(/(\d{4})(\d{2})(\d{2})/g, '$1년 $2월 $3일')}</span>
          </div>
          <span className="p-2 text-black">{gameDetail.설명}</span>
        </div>
      )
    }
  }

  /* 유저 리뷰 부분 */
  const GameComment = () => {
    const gameData: IGame[] = JSON.parse(localStorage.getItem("GameList") as string)
    const userData: IUser[] = JSON.parse(localStorage.getItem("UserData") as string)
    const loginInfo = localStorage.getItem("LoginInfo")
    const user = userData.filter((item: IUser) => item.username === loginInfo)[0]

    // 리뷰 작성 버튼
    const writeReivew = () => {
      if (isLogin) {
        setWrite(true)
      } else {
        const message = "로그인 후 가능합니다.\n로그인 하시겠습니까?"
        if (window.confirm(message)) navigate('/login')
        else console.log("취소")
      }
    }

    // 리뷰 제출 버튼
    const submitReview = () => {
      const reviewContents: string = (document.getElementById("review") as HTMLInputElement).value

      if (reviewContents.length < 5) {
        alert("내용은 최소 5자 이상입니다!")
        return
      }

      // 리뷰 코멘트 아이디 부여
      const getcommentId = () => {
        let today = new Date()
        return `${user.username}-${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`
      }

      // 날짜 가져오기
      const getDate = () => {
        let today = new Date()
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
      }

      const gameNewReivew: IGame리뷰 = {
        commentId: getcommentId(),
        username: user.username,
        nickname: user.nickname,
        좋아요: 0,
        리뷰내용: reviewContents,
        작성일: getDate()
      }

      const userNewReivew: IUser리뷰 = {
        commentId: getcommentId(),
        게임명: gameDetail.게임명,
      }

      const gameUpdate = {
        ...gameDetail,
        리뷰: gameDetail.리뷰.concat(gameNewReivew)
      }

      const userUpdate = {
        ...user,
        리뷰: user.리뷰.concat(userNewReivew)
      }

      for (let i = 0; i < gameData.length; i++) {
        if (gameData[i].게임명 === gameDetail.게임명) {
          let temp = gameData
          temp[i] = gameUpdate
          localStorage.setItem("GameList", JSON.stringify(temp))
          break
        }
      }

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === loginInfo) {
          let temp = userData
          temp[i] = userUpdate
          localStorage.setItem("UserData", JSON.stringify(temp))
          break
        }
      }

      setGameDetail(gameUpdate)
    }

    // 좋아요 클릭 이벤트
    const likeBtnClick = (review: IGame리뷰) => {
      if (!isLogin) {
        const message = "로그인 후 가능합니다.\n로그인 하시겠습니까?"
        if (window.confirm(message)) navigate('/login')
        else console.log("취소")
        return
      }

      const isLike = user.좋아요.filter(item => item === review.commentId).length === 1

      const gameReivewUpdate = {
        ...review,
        좋아요: isLike ? review.좋아요 - 1 : review.좋아요 + 1
      }

      const gameUpdate = {
        ...gameDetail,
        리뷰: gameDetail.리뷰.map(item => item.commentId === review.commentId ? gameReivewUpdate : item)
      }

      const userUpdate = {
        ...user,
        좋아요: isLike ? user.좋아요.filter(item => item !== review.commentId) : user.좋아요.concat(review.commentId)
      }

      for (let i = 0; i < gameData.length; i++) {
        if (gameData[i].게임명 === gameDetail.게임명) {
          let temp = gameData
          temp[i] = gameUpdate
          localStorage.setItem("GameList", JSON.stringify(temp))
          break
        }
      }

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === loginInfo) {
          let temp = userData
          temp[i] = userUpdate
          localStorage.setItem("UserData", JSON.stringify(temp))
          break
        }
      }

      setGameDetail(gameUpdate)
    }

    // 좋아요 표시한 댓글인지 확인
    const isLikeComment = (commentId: string) => {
      if (!isLogin) return false

      const isLike = user.좋아요.filter(item => item === commentId).length === 1
      if (isLike) return true
      else return false
    }

    if (notYet) {
      return (
        <div className="flex flex-col p-2 mb-2 text-center rounded-lg bg-neutral-100 sm:mb-5 sm:p-5 animate-pulse">
          <span className="p-2 mb-2 rounded-lg bg-sky-500"><span className="block animate-spin">↻</span></span>
          <span className="p-2 mb-2 rounded-lg bg-neutral-900"><span className="block animate-spin">↻</span></span>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col p-2 mb-2 rounded-lg bg-neutral-100 sm:mb-5 sm:p-5">

          <div className="flex items-center justify-between p-2 rounded-lg bg-sky-500">
            <span>유저 리뷰</span>
            <button className="px-1 text-sm text-black rounded-md xsm:text-lg bg-neutral-100" onClick={writeReivew}>+등록</button>
          </div>

          {write &&
            <div className="relative flex flex-col p-2 mt-2 rounded-lg bg-neutral-900">
              <textarea className="p-2 overflow-hidden text-base outline-none resize-none bg-neutral-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl" placeholder="내용입력(최소 5자)" id="review"></textarea>
              <div className="flex justify-end mt-2 xsm:text-base sm:text-xl">
                <button className="px-1 mr-2 rounded-md bg-neutral-500" onClick={submitReview}>제출</button>
                <button className="px-1 rounded-md bg-neutral-500" onClick={() => { setWrite(false) }}>취소</button>
              </div>
            </div>
          }

          {gameDetail.리뷰.length === 0 ?
            <div className="flex flex-col p-2 mt-2 rounded-lg bg-neutral-900">
              <span>등록된 리뷰가 없습니다.</span>
            </div>
            :
            gameDetail.리뷰.map((item, index) => (
              <div className="flex flex-col p-2 mt-2 rounded-lg bg-neutral-900" key={index}>
                <div className="flex items-center mb-2">
                  <span className="px-1 rounded-md bg-neutral-500">{item.nickname}</span>
                  <button className={`px-1 ml-2 rounded-md ${isLikeComment(item.commentId) ? 'bg-sky-500' : 'bg-neutral-500'}`} onClick={() => { likeBtnClick(item) }}>{`👍 ${(item.좋아요).toLocaleString()}`}</button>
                </div>
                <span className="mb-2">{item.리뷰내용}</span>
                <span className="text-sm xsm:text-base">{item.작성일}</span>
              </div>
            ))
          }

        </div>
      )
    }
  }

  /* 게임 가격 및 장바구니 부분 */
  const GamePriceBox = () => {
    if (notYet) {
      return (
        <div className='sticky bottom-0 left-0 flex justify-between w-full p-2 text-sm text-center text-white bg-opacity-50 rounded-lg bg-neutral-100 sm:p-5 sm:text-2xl animate-pulse'>
          <div className="w-[50%] py-1 bg-red-500 sm:py-5 rounded-xl"><span className="block animate-spin">↻</span></div>
          <button className='w-[40%] py-1 sm:py-5 bg-sky-500 rounded-xl'><span className="block animate-spin">↻</span></button>
        </div>
      )
    } else {
      return (
        <div className='sticky bottom-0 left-0 flex justify-between w-full p-2 text-sm text-center text-white bg-opacity-50 rounded-lg bg-neutral-100 sm:p-5 sm:text-2xl'>
          <div className="w-[50%] py-1 bg-red-500 sm:py-5 rounded-xl">
            {gameDetail.할인 !== 0 && <span className="block line-through sm:inline-block">{(gameDetail.가격).toLocaleString() + "원"}</span>}
            <span>{gamePrice()}</span>
          </div>
          <button className='w-[40%] py-1 sm:py-5 bg-sky-500 rounded-xl' onClick={() => { addCart(dispatch, gameDetail) }}>장바구니</button>
        </div>
      )
    }
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        {/* 상세보기 시작 */}
        <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-[calc(100%-5rem)] h-fit bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>
          <div className='relative w-full h-full p-2 text-base sm:p-5 sm:text-2xl'>

            <GameHeader></GameHeader>

            <div className="flex mb-2 sm:mb-5">
              <div className="block w-full">
                <GameImg></GameImg>
                {GameYoutube()}
              </div>
            </div>

            <div className="mb-2 leading-normal text-white sm:mb-5">
              <Tag></Tag>
              <GameInfo></GameInfo>
              <GameComment></GameComment>
            </div>

            <GamePriceBox></GamePriceBox>

          </div>
        </div>
        {/* 상세보기 끝 */}
      </div>
    </div>
  );
}

export default ItemDetail;