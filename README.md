# 온라인 게임 판매 스토어
### Demo page : <a href="https://jmj-gamestore-ts.netlify.app/" target="_blank">JMJ-GameStore-TS</a>[![Netlify Status](https://api.netlify.com/api/v1/badges/e628b34c-6993-499e-8550-034c2dbdecdf/deploy-status)](https://app.netlify.com/sites/jmj-gamestore-ts/deploys)

#### 1. 개발도구 : VSCode, Git
#### 2. 개발언어 : TypeScript(@4.8.4)
#### 3. 라이브러리 : React(@18.2.0), Redux(@8.0.4), React Router(@6.3.0), react-cookie(@4.1.1)
#### 4. 프레임워크 : Tailwind CSS(@3.1.8)(with. flowbite-react & tailwind-scrollbar-hide)
#### 5. 웹 호스팅 : Netlify

***

### <코드 구조>

#### gamestore\src
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/index.tsx">*\index.tsx*</a> : 리액트 라우터 및 쿠키 설정

#### gamestore\src\function - 게임스토어 기능
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/AutoCompleteEmail.tsx">*\AutoCompleteEmail.tsx*</a> : 이메일 자동완성
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/AutoCompleteSearch.tsx">*\AutoCompleteSearch.tsx*</a> : 검색 자동완성
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/Cookie.ts">*\Cookie.ts*</a> : 쿠키 설정
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/DropDown.tsx">*\DropDown.tsx*</a> : 드롭다운 설정
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/GameFilter.tsx">*\GameFilter.tsx*</a> : 게임필터 설정
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/MoveScrool.tsx">*\MoveScrool.tsx*</a> : 스크롤 이동 훅
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/PageFunction.ts">*\PageFunction.ts*</a> : 페이지 기능 함수 모음
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/PopDown.tsx">*\PopDown.tsx*</a> : 장바구니 담기 애니메이션
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/SearchResult.tsx">*\SearchResult.tsx*</a> : 검색결과 출력
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/SpanTextHighlight.tsx">*\SpanTextHighlight.tsx*</a> : 글자색 강조
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/function/StringMatcher.ts">*\StringMatcher.ts*</a> : 한글 패턴 정규식

#### gamestore\src\home - 메인 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/App.tsx">*\App.tsx*</a> : 사이트 초기 설정
* \header - 헤더
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/header/Header.tsx">*\Header.tsx*</a> : 검색창, 장바구니, 마이페이지, 카테고리 이동
* \main - 컨텐츠
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlex.tsx">*\GameFlex.tsx*</a> : 메인 페이지 Props 관리
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlexBanner.tsx">*\GameFlexBanner.tsx*</a> : 페이지 배너(flowbite-carousel)
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlexBox.tsx">*\GameFlexBox.tsx*</a> : 게임 리스트 뷰
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlexFooter.tsx">*\GameFlexFooter.tsx*</a> : 로고 및 제작자 표시
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlexHeader.tsx">*\GameFlexHeader.tsx*</a> : 게임, 카테고리, 정렬, 필터 설정
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/main/GameFlexPagination.tsx">*\GameFlexPagination.tsx*</a> : 게임 리스트 페이지네이션
* \side - 사이드바
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/side/SideBar.tsx">*\SideBar.tsx*</a> : 사이드바 상태 관리
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/home/side/SideBarContent.tsx">*\SideBarContent.tsx*</a> : 회원정보, 로그인, 회원가입, 장바구니 표시

#### gamestore\src\page - 서브 페이지
* \404
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/404/NotFound.tsx">*\NotFound.tsx*</a> : 잘못된 페이지
  * <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/404/NotFoundGame.tsx">*\NotFoundGame.tsx*</a> : 잘못된 게임 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/Cart.tsx">*\Cart.tsx*</a> : 장바구니 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/ItemDetail.tsx">*\ItemDetail.tsx*</a> : 게임 상세보기 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/Login.tsx">*\Login.tsx*</a> : 로그인 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/MyPage.tsx">*\MyPage.tsx*</a> : 마이 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/Payment.tsx">*\Payment.tsx*</a> : 결제 페이지
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/page/SignUp.tsx">*\SignUp.tsx*</a> : 회원가입 페이지

#### gamestore\src\interface - 인터페이스 관리
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/interface/gameInterface.ts">*\gameInterface.ts*</a> : 게임 인터페이스
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/interface/userInterface.ts">*\userInterface.ts*</a> : 유저 인터페이스

#### gamestore\src\json - 사이트 DB
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/json/CouponList.json">*\CouponList.json*</a> : 쿠폰 데이터
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/json/GameList.json">*\GameList.json*</a> : 게임 데이터
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/json/UserData.json">*\UserData.json*</a> : 유저 데이터

#### gamestore\src\redux - 리덕스 상태 관리
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/redux/store.ts">*\store.ts*</a> : 상태 스토어
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/blob/main/gamestore/src/redux/hooks.ts">*\hooks.ts*</a> : 타입 지정 훅
* <a href="https://github.com/wnalsals123/GameStore_TypeScript/tree/main/gamestore/src/redux/state">*\state*</a> : 각 state 액션 및 리듀서 설정(@reduxjs/toolkit)
  * ...state.ts

***

### <기능 구현>
#### 0. 공통사항
* 반응형 웹, 서버 및 DB → 배열 함수와 localStorage로 대체

#### 1. 메인 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/">Link</a>
* 검색창, 필터링, 게임 리스트 뷰, 애니메이션 동작, 각 페이지로 이동

#### 2. 로그인 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/login">Link</a>
* 로그인 시 세션 쿠키 및 사용자 정보 생성

#### 3. 회원가입 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/signup">Link</a>
* 사용자 입력 값 추적 및 확인

#### 4. 장바구니 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/cart">Link</a>
* 장바구니 데이터 불러오기, 결제 페이지에 결제정보 전달

#### 5. 상세보기 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/games/GTA5/">Link</a>
* 파라미터로 게임 정보 불러오기, 장바구니에 담기, 유저 리뷰 및 좋아요 표시

#### 6. 마이 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/mypage">Link </a>**로그인 필요(ID: test/PW: test)*
* 내 정보, 구매 내역, 리뷰 관리, 쿠폰함 및 쿠폰 등록

#### 7. 결제 페이지 - <a href="https://jmj-gamestore-ts.netlify.app/payment">Link </a>**장바구니에서 접근가능*
* 장바구니에서 결제정보 획득, 완료 후 유저 데이터 갱신, 잘못된 접근 시 리디렉션