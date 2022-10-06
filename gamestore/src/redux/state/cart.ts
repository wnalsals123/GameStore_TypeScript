import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    setCart: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

export const { setCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const cart = (state: RootState) => state.cart.value

export default cartSlice.reducer