import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './home/App';
import reportWebVitals from './test/reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './page/404/NotFound';
import NotFoundGame from './page/404/NotFoundGame';
import ItemDetail from './page/ItemDetail';
import Cart from './page/Cart';
import Login from './page/Login';
import SignUp from './page/SignUp';
import MyPage from './page/MyPage';
import Payment from './page/Payment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="games/:gameid" element={<ItemDetail />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="mypage" element={<MyPage />}></Route>
              <Route path="payment" element={<Payment />}></Route>
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
            <Route path="/NotFound" element={<NotFound />}></Route>
            <Route path="/games/NotFound" element={<NotFoundGame />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
