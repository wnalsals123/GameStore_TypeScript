import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface isAddCartState {
  value: boolean
}

// Define the initial state using that type
const initialState: isAddCartState = {
  value: false
}

export const isAddCartSlice = createSlice({
  name: 'isAddCart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAddCart: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
})

export const { setIsAddCart } = isAddCartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isAddCart = (state: RootState) => state.isAddCart.value

export default isAddCartSlice.reducer