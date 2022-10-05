import Header from "./header/Header";
import GameFlex from "./main/GameFlex";
import SideBar from "./side/SideBar";

function App() {
  return (
    <div className='relactive'>
    <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
      <Header></Header>
      <SideBar></SideBar>
    </div>
    <GameFlex></GameFlex>
    {/* <Outlet></Outlet> */}
    {/* <PopDown></PopDown> */}
  </div>
  );
}

export default App;
