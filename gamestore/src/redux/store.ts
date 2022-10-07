import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './state/cart'
import isSideOpenSlice from './state/isSideOpen'
import isAddCartSlice from './state/isAddCart'
import isLoginSlice from './state/isLogin'
import categorySlice from './state/category'
import loadingSlice from './state/loading'
import gameDataSlice from './state/gameData'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    isSideOpen: isSideOpenSlice,
    isAddCart: isAddCartSlice,
    isLogin: isLoginSlice,
    category: categorySlice,
    loading: loadingSlice,
    gameData: gameDataSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch