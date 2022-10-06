import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface isLoginState {
  value: boolean
}

// Define the initial state using that type
const initialState: isLoginState = {
  value: false
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
})

export const { setIsLogin } = isLoginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLogin = (state: RootState) => state.isLogin.value

export default isLoginSlice.reducer