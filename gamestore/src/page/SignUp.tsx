import AutoCompleteEmail from "../function/AutoCompleteEmail";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IUser } from "../interface/userInterface";
import { useAppSelector } from "../redux/hooks";

type vaildType = {
  [key: string]: boolean
}

/* 회원가입 페이지 */
const SignUp = () => {
  const isLogin = useAppSelector(state => state.isLogin.value)
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const [userData, setUserData] = useState<IUser[]>([])

  // 유저 정보 가져오기
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const serverUserDate: IUser[] | null = JSON.parse(localStorage.getItem('UserData') as string)
    serverUserDate === null ? setUserData([]) : setUserData(serverUserDate)
  }, [])

  // 뒤로가기
  const toBack = () => {
    document.body.style.overflow = 'auto'
    JSON.parse(sessionStorage.getItem('FirstPage') as string) ? navigate('/') : navigate(-1);
  }

  // 입력 값 확인 state
  const [inputValue, setInputValue] = useState<IUser>({
    username: '',
    password: '',
    passwordOk: '',
    email: '',
    nickname: '',
    exp: 0,
    point: 0,
    구매: [],
    리뷰: [],
    쿠폰: [{
      "쿠폰명": "welcome2022",
      "사용": false
    }],
    좋아요: [],
  });
  const { username, password, passwordOk, email, nickname } = inputValue;
  const [tempEmail, setTempEmail] = useState<string>('') // autoEmail props 용도

  // 회원정보 중복 확인
  const [isDuplicate, setIsDuplicate] = useState<vaildType>({
    D_usernmae: false,
    D_email: false,
    D_nickname: false,
  })
  const { D_usernmae, D_email, D_nickname } = isDuplicate

  // 회원가입 유효성 검사  
  const isVaildUsername = username.length >= 4 && username.search(/[^a-z0-9]/g) === -1 && !D_usernmae // 아이디  전체 4자 이상일것. 소문자 또는 숫자
  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g) // 비밀번호 특수문자 검사를 위한 정규식표현.
  const isValidPassword = password.length >= 8 && password.search(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g) === -1 && specialLetter > -1 // 비밀번호 특수문자 1자 이상, 전체 8자 이상일것. 영문자 또는 숫자
  const isSamePassword = passwordOk === password; // 비밀번호 동일여부
  const isValidEmail = email.includes('@') && email.includes('.') && !D_email // 이메일 '@', '.' 이 둘다 포함될것.
  const isValidNickname = nickname.length >= 2 && nickname.search(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]/g) === -1 && !D_nickname // 닉네임 한글 영문 숫자

  // 입력 값 길이 확인 state
  const [isShort, setIsShort] = useState<vaildType>({
    S_username: true,
    S_password: true,
    S_passwordOk: true,
    S_nickname: true,
  });
  const { S_username, S_password, S_passwordOk, S_nickname } = isShort;

  // 입력 값 유효성 확인 state
  const [isVaild, setIsVaild] = useState<vaildType>({
    V_username: true,
    V_password: true,
    V_passwordOk: true,
    V_email: true,
    V_nickname: true,
  });
  const { V_username, V_password, V_passwordOk, V_email, V_nickname } = isVaild;

  // 입력 값 onChange
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const maxLength = name === 'email' ? 30 : 15

    let noBlank = value.replace(/\s/gi, "")
    let result = "";

    for (let i = 0; i < noBlank.length && i < maxLength; i++) {
      result += noBlank[i];
    }

    if (name === 'username') {
      result.length < 4 ? setIsShort({ ...isShort, S_username: true }) : setIsShort({ ...isShort, S_username: false })
      value.search(/[^a-z0-9]/g) === -1 ? setIsVaild({ ...isVaild, V_username: true }) : setIsVaild({ ...isVaild, V_username: false })
      userData.filter((index) => (index.username === result)).length === 0 ? setIsDuplicate({ ...isDuplicate, D_usernmae: false }) : setIsDuplicate({ ...isDuplicate, D_usernmae: true })
    } else if (name === 'password') {
      result.length < 8 ? setIsShort({ ...isShort, S_password: true }) : setIsShort({ ...isShort, S_password: false })
      value.search(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g) === -1 && value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g) > -1 ? setIsVaild({ ...isVaild, V_password: true }) : setIsVaild({ ...isVaild, V_password: false })
      value === '' && setIsVaild({ ...isVaild, V_password: true })
    } else if (name === 'passwordOk') {
      result.length < 8 ? setIsShort({ ...isShort, S_passwordOk: true }) : setIsShort({ ...isShort, S_passwordOk: false })
      password === value ? setIsVaild({ ...isVaild, V_passwordOk: true }) : setIsVaild({ ...isVaild, V_passwordOk: false })
    } else if (name === 'nickname') {
      result.length < 2 ? setIsShort({ ...isShort, S_nickname: true }) : setIsShort({ ...isShort, S_nickname: false })
      value.search(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]/g) === -1 ? setIsVaild({ ...isVaild, V_nickname: true }) : setIsVaild({ ...isVaild, V_nickname: false })
      userData.filter((index) => (index.nickname === result)).length === 0 ? setIsDuplicate({ ...isDuplicate, D_nickname: false }) : setIsDuplicate({ ...isDuplicate, D_nickname: true })
    } else {
      value.includes('@') && value.includes('.') ? setIsVaild({ ...isVaild, V_email: true }) : setIsVaild({ ...isVaild, V_email: false })
      userData.filter((index) => (index.email === result)).length === 0 ? setIsDuplicate({ ...isDuplicate, D_email: false }) : setIsDuplicate({ ...isDuplicate, D_email: true })
      setTempEmail(result)
    }

    e.target.value = result

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // 회원가입 버튼 활성화
  const [onSummit, setOnSummit] = useState(false)

  const isSummitPossible = () => {
    if (isVaildUsername && isValidPassword && isSamePassword && isValidEmail && isValidNickname) {
      setOnSummit(true)
    } else {
      setOnSummit(false)
    }
  }

  // 회원가입 양식 제출
  const summitForm = () => {
    if (isVaildUsername && isValidPassword && isSamePassword && isValidEmail && isValidNickname) {
      localStorage.setItem("UserData", JSON.stringify(userData.concat(inputValue)))
      alert("회원가입이 완료되었습니다")
      navigate(-1)
    } else {
      alert("알 수 없는 오류가 발생했습니다")
    }
  }

  return (
    <>
      {isLogin ? <Navigate to="/"></Navigate> :
        <div className='fixed top-0 left-0 z-50 w-full h-full'>
          <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
            <div className='relative max-w-screen-md max-h-[calc(100%-5rem)] w-[calc(100%-2rem)] border-2 rounded-xl border-neutral-100 bg-neutral-900 overflow-y-auto scrollbar-hide'>

              <div className="w-full p-2 sm:p-5">

                <div className="relative flex flex-col w-full text-base text-white sm:text-xl md:text-2xl">
                  {/* 회원가입 상단 */}
                  <div className="relative flex items-center justify-center mb-2 sm:mb-5">
                    <div className="flex items-center">
                      <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                      <span className="pl-4 leading-none">회원가입</span>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center h-full"><button className="w-6 h-6 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn filter-white" onClick={toBack}></button></div>
                  </div>
                  {/* 아이디 */}
                  <div className="flex flex-col mb-5 sm:flex-row">
                    <div className="flex flex-col justify-center basis-1/4">
                      <span className='basis-1/4'>아이디</span>
                    </div>
                    <div className="relative basis-3/4">
                      <input className="w-full h-full px-2 py-2 text-black rounded-md sm:px-5 placeholder:text-sm placeholder:sm:text-xl placeholder:md:text-2xl" placeholder="소문자 또는 숫자" name="username" onKeyUp={isSummitPossible} onChange={handleInput} autoComplete='off'></input>
                      <div className="absolute right-0 flex items-center h-full p-2 -top-8 sm:top-0">
                        <span className={`${S_username ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*4자리 이상</span>
                        {!S_username && <span className={`${V_username ? 'hidden' : 'block'} p-2 text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*사용 불가</span>}
                        <span className={`${V_username && !S_username && D_usernmae ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*이미 사용중</span>
                        <span className={`${V_username && !S_username && !D_usernmae ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-sky-500 rounded-lg`}>*사용 가능</span>
                      </div>
                    </div>
                  </div>
                  {/* 비밀번호 */}
                  <div className="flex flex-col mb-5 sm:flex-row">
                    <div className="flex flex-col justify-center basis-1/4">
                      <span className='basis-1/4'>비밀번호</span>
                    </div>
                    <div className="relative flex basis-3/4">
                      <input className="w-full h-full px-2 py-2 text-base text-black rounded-md sm:px-5 placeholder:text-sm placeholder:sm:text-xl placeholder:md:text-2xl sm:text-xl md:text-2xl" type="password" placeholder="특수문자 포함, 영문자 또는 숫자" name="password" onKeyUp={isSummitPossible} onChange={handleInput} autoComplete='off'></input>
                      <div className="absolute right-0 flex items-center h-full p-2 -top-8 sm:top-0">
                        <span className={`${S_password ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*8자리 이상</span>
                        {!S_password && <span className={`${V_password ? 'hidden' : 'block'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*사용 불가</span>}
                        <span className={`${V_password && !S_password ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-sky-500 rounded-lg`}>*안전</span>
                      </div>
                    </div>
                  </div>
                  {/* 비밀번호 확인 */}
                  <div className="flex flex-col mb-5 sm:flex-row">
                    <div className="flex flex-col justify-center basis-1/4">
                      <span className='basis-1/4'>비밀번호 확인</span>
                    </div>
                    <div className="relative flex basis-3/4">
                      <input className="w-full h-full px-2 py-2 text-base text-black rounded-md sm:px-5 placeholder:text-sm placeholder:sm:text-xl placeholder:md:text-2xl sm:text-xl md:text-2xl" type="password" placeholder="비밀번호 재입력" name="passwordOk" onKeyUp={isSummitPossible} onChange={handleInput} autoComplete='off'></input>
                      <div className="absolute right-0 flex items-center h-full p-2 -top-8 sm:top-0">
                        <span className={`${S_passwordOk ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*8자리 이상</span>
                        {!S_passwordOk && <span className={`${V_passwordOk ? 'hidden' : 'block'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*비밀번호 불일치</span>}
                        <span className={`${V_passwordOk && !S_passwordOk ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-sky-500 rounded-lg`}>*일치</span>
                      </div>
                    </div>
                  </div>
                  {/* 이메일 */}
                  <div className="flex flex-col mb-5 sm:flex-row">
                    <div className="flex flex-col justify-center basis-1/4">
                      <span className='basis-1/4'>이메일</span>
                    </div>
                    <div className="relative flex basis-3/4">
                      <div className="w-full h-full">
                        <input className="w-full h-full px-2 py-2 text-black rounded-md sm:px-5 placeholder:text-sm placeholder:sm:text-xl placeholder:md:text-2xl" placeholder="이메일 입력" name="email" onKeyUp={isSummitPossible} onChange={handleInput} autoComplete='off' ref={emailRef}></input>
                        <AutoCompleteEmail tempEmail={tempEmail} inputValue={inputValue} setInputValue={setInputValue} isVaild={isVaild} setIsVaild={setIsVaild} isDuplicate={isDuplicate} setIsDuplicate={setIsDuplicate} userData={userData} emailRef={emailRef}></AutoCompleteEmail>
                      </div>
                      <div className="absolute right-0 flex items-center h-full p-2 -top-8 sm:top-0">
                        <span className={`${V_email ? 'hidden' : 'block'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*잘못된 형식</span>
                        <span className={`${V_email && D_email ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*이미 사용중</span>
                        <span className={`${isValidEmail && !D_email ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-sky-500 rounded-lg`}>*사용 가능</span>
                      </div>
                    </div>
                  </div>
                  {/* 닉네임 */}
                  <div className="flex flex-col mb-10 sm:flex-row">
                    <div className="flex flex-col justify-center basis-1/4">
                      <span className='basis-1/4'>별명</span>
                    </div>
                    <div className="relative flex basis-3/4">
                      <input className="w-full h-full px-2 py-2 text-black rounded-md sm:px-5 placeholder:text-sm placeholder:sm:text-xl placeholder:md:text-2xl" placeholder="특수문자 제외" name="nickname" onKeyUp={isSummitPossible} onChange={handleInput} autoComplete='off'></input>
                      <div className="absolute right-0 flex items-center h-full p-2 -top-8 sm:top-0">
                        <span className={`${S_nickname ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*2자리 이상</span>
                        {!S_nickname && <span className={`${V_nickname ? 'hidden' : 'block'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*사용 불가</span>}
                        <span className={`${V_nickname && !S_nickname && D_nickname ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-red-500 rounded-lg`}>*이미 사용중</span>
                        <span className={`${V_nickname && !S_nickname && !D_nickname ? 'block' : 'hidden'} p-2  text-sm sm:text-base leading-none text-sky-500 rounded-lg`}>*사용 가능</span>
                      </div>
                    </div>
                  </div>
                  {/* 회원가입 버튼 */}
                  <div className="relative flex flex-col group">
                    <button className={`p-2 bg-red-500 rounded-lg ${onSummit ? 'opacity-100' : 'opacity-50'}`} onClick={summitForm}>회원가입</button>
                    <div><span className="absolute hidden px-2 text-sm rounded-md top-1/2 left-1/2 group-hover:block bg-sky-500">{!onSummit && "불가능한 입력이 있습니다"}</span></div>
                  </div>
                  {/* 회원가입 하단 */}
                  <div className="flex justify-between pt-5 text-sm text-white xsm:text-base sm:text-xl">
                    <div className="flex items-center">
                      <img className="w-8 sm:w-10 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                      <span className="pl-2 !leading-none sm:pl-4">Game Store</span>
                    </div>
                    <div>
                      <div className="flex items-center h-full"><span>Made by JMJ</span></div>
                    </div>
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

export default SignUp;