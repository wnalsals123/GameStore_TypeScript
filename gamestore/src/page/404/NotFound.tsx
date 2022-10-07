/* 404 페이지 */
const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-white">
      <div className="flex flex-wrap items-center justify-center p-5 m-auto bg-red-500 w-fit rounded-xl">
        <a className="flex items-center self-center m-2" href='/'>
          <img className="block w-9 sm:w-12 filter-red" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
          <span className="block pl-4 text-xl leading-none h-fit sm:text-3xl">Game Store</span>
        </a>
        <span className="block m-2 text-xl leading-none h-fit sm:text-3xl">404:존재하지 않는 페이지</span>
      </div>
    </div>
  )
}

export default NotFound;