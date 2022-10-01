import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { increment, decrement } from '../redux/cartSlice';

function App() {
  const count  = useAppSelector(state => state.cart.value)
  const dispatch = useAppDispatch()

  return (
    <div className="text-white w-fit">
      <span className="px-2">{count}</span>
      <button className="border-2 border-white" onClick={()=>{ dispatch(increment())}}>더하기</button>
      <button className="border-2 border-white" onClick={()=>{ dispatch(decrement())}}>빼기</button>
    </div>
  );
}

export default App;
