interface IProps {
  totalPage: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  onMoveToElement: () => void
}

/* 게임 목록 페이지네이션 */
const GameFlexPagination = (props: IProps) => {
  const { totalPage, currentPage, setCurrentPage, onMoveToElement } = props

  // 이전 페이지
  const pageDown = () => {
    if(currentPage === 1) return
    onMoveToElement()
    setCurrentPage(currentPage - 1)
  }

  // 다음 페이지
  const pageUp = () => {
    if(currentPage === totalPage) return
    onMoveToElement()
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className='flex justify-center'>
      <div className='inline-flex items-center space-x-[0.75rem] xsm:space-x-[1rem]'>
        <button onClick={pageDown} disabled={currentPage === 1}>
          <svg className="flex justify-center items-center w-[2rem] xsm:w-[3rem] h-[2rem] xsm:h-[3rem]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        </button>

        {Array(totalPage).fill(0).map((_, i) => (
          <button className={`block !leading-none text-xl xsm:text-3xl ${currentPage === i + 1 ? 'text-sky-500' : 'text-white'}`} key={i + 1} onClick={() => { onMoveToElement(); setCurrentPage(i + 1) }} disabled={currentPage === i + 1}>{i + 1}</button>
        ))}

        <button onClick={pageUp} disabled={currentPage === totalPage}>
          <svg className="flex justify-center items-center w-[2rem] xsm:w-[3rem] h-[2rem] xsm:h-[3rem]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default GameFlexPagination;