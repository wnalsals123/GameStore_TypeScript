import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface cartState {
  value: number
}

// Define the initial state using that type
const initialState: cartState = {
  value: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      if(state.value < 1) return
      state.value -= 1
    }
  }
})

export const { increment, decrement } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const cart = (state: RootState) => state.cart.value

export default cartSlice.reducer