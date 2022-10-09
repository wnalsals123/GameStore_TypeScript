import { useEffect, useRef, useState } from "react"
import { IUser } from "../interface/userInterface"

interface IPros {
  tempEmail: string,
  inputValue: IUser,
  setInputValue: React.Dispatch<React.SetStateAction<IUser>>,
  isVaild: vaildType,
  setIsVaild: React.Dispatch<React.SetStateAction<vaildType>>,
  isDuplicate: vaildType,
  setIsDuplicate: React.Dispatch<React.SetStateAction<vaildType>>,
  userData: IUser[],
  emailRef: React.RefObject<HTMLInputElement>
}

type vaildType = {
  [key: string]: boolean
}

/* 이메일 자동완성  */
const AutoCompleteEmail = (props: IPros) => {
  const { tempEmail, inputValue, setInputValue, isVaild, setIsVaild, isDuplicate, setIsDuplicate, userData, emailRef } = props
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropList, setDropList] = useState<string[]>([])
  let resultTextArray = useRef<string[]>([])

  /* 이메일 값 리스너 */
  useEffect(() => {
    const mailList = ['naver.com', 'gmail.com', 'daum.net', 'nate.com', 'hanmail.net']

    if (tempEmail.search(/@/g) === -1) {
      resultTextArray.current = []
      setIsHaveInputValue(false)
      return
    }

    if (tempEmail.search(/@/g) > -1 && resultTextArray.current.length === 0) {
      resultTextArray.current = mailList.map(textItem => tempEmail + textItem)
      setDropList(resultTextArray.current)
      setIsHaveInputValue(true)
    } else {
      const choosenTextList = resultTextArray.current.filter(textItem => textItem.includes(tempEmail))
      setDropList(choosenTextList)
      setIsHaveInputValue(true)
    }
  }, [tempEmail])

  /* 이메일 클릭 리스너 */
  const clickDropDownItem = (clickedItem: string) => {
    (emailRef.current as HTMLInputElement).value = clickedItem
    setInputValue({ ...inputValue, email: clickedItem })
    setIsVaild({ ...isVaild, V_email: true })
    userData.filter((index) => (index.email === clickedItem)).length === 0 ? setIsDuplicate({ ...isDuplicate, D_email: false }) : setIsDuplicate({ ...isDuplicate, D_email: true })
    setIsHaveInputValue(false)
  }

  /* 이메일 자동완성 리스트 */
  const DropDown = dropList.map((dropDownItem, dropDownIndex) => (
    <button className="w-full px-2 py-2 text-left list-none cursor-pointer sm:px-5 hover:text-sky-500" key={dropDownIndex} onClick={() => clickDropDownItem(dropDownItem)}>{dropDownItem}</button>
  ))

  return (
    <div className={`${isHaveInputValue ? 'block' : 'hidden'} absolute left-0 z-50 w-full max-h-40 overflow-auto text-black bg-white border-2 rounded-lg border-neutral-500 top-full`}>
      {isHaveInputValue && DropDown}
    </div>
  )
}

export default AutoCompleteEmail;