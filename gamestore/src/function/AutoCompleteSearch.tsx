import { createFuzzyMatcher } from "./StringMatcher";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  setSearchVis: React.Dispatch<React.SetStateAction<boolean>>
}

/* 검색 자동완성 */
const AutoCompleteSearch = (props: IProps) => {
  const { setSearchVis } = props
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState<string[]>([])
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  /* 검색 리스트 설정 */
  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const gameList = JSON.parse(localStorage.getItem('GameList') as string)
      let wholeTextArray: string[] = []
      
      for(let i = 0; i < gameList.length; i++){
        wholeTextArray = wholeTextArray.concat(gameList[i].게임명)
      }

      const regex = createFuzzyMatcher(inputValue.toLowerCase());
      const choosenTextList = wholeTextArray.filter(item => regex.test(item.toLowerCase()))
      
      setDropDownList(choosenTextList)
    }
  }

  /* 검색 값 리스너 */
  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    event.target.value !== "" ? setIsHaveInputValue(true) : setIsHaveInputValue(false)
  }

  /* 검색 값 클릭 리스너 */
  const clickDropDownItem = (clickedItem: string) => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
    setSearchVis(false)
    navigate(`/?keyword=${clickedItem}`)
  }

  /* 방향키 리스너 */
  const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (event.key === 'ArrowDown' && dropDownList.length - 1 > dropDownItemIndex) setDropDownItemIndex(dropDownItemIndex + 1)
      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter') {
        if(dropDownItemIndex >= 0){
          clickDropDownItem(dropDownList[dropDownItemIndex])
          setDropDownItemIndex(-1)
        } else {
          setSearchVis(false)
          navigate(`/?keyword=${(event.target as HTMLInputElement).value}`)
        }
        setIsHaveInputValue(false)
      }
    }
  }

  /* 블러 시 숨기기 */
  const blurAuto = () => {
    setIsHaveInputValue(false)
  }

  useEffect(showDropDownList, [inputValue])

  /* 검색 리스트 뷰 */
  const Result = () => {
    return (
      <ul className="absolute top-[85%] -left-[2px] w-[16rem] bg-white border-2 border-neutral-900 rounded-b-lg border-t-0 py-2 text-left">
        {dropDownList.length === 0 && <li className={`!leading-none pl-[2.575rem] py-2`}>해당하는 결과가 없습니다.</li>}
        {dropDownList.map((dropDownItem, dropDownIndex) => (
          <li key={dropDownIndex} onMouseDown={() => clickDropDownItem(dropDownItem)} className={`!leading-none pl-[2.575rem] py-2 cursor-pointer hover:bg-neutral-200 ${dropDownItemIndex === dropDownIndex && 'bg-neutral-200'}`}>
            {dropDownItem}
          </li>))}
      </ul>
    )
  }

  return (
    <div className="relative flex items-center w-full h-full bg-white border-2 rounded-lg border-neutral-900">
      <div className="w-[10%] mx-2 z-10"><img className="object-cover w-full h-full" src="https://cdn-icons-png.flaticon.com/512/622/622669.png" alt="search-img"></img></div>
      <input className="h-[90%] w-[80%] !border-0 !outline-0 !ring-0 z-10" type="search" placeholder="게임 검색" value={inputValue} onChange={changeInputValue} onKeyDown={handleDropDownKey} onFocus={changeInputValue} onBlur={blurAuto}></input>
      {isHaveInputValue && <Result></Result>}
    </div>
  )
}

export default AutoCompleteSearch;