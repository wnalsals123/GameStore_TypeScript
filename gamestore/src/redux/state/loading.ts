import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface loadingState {
  value: string
}

// Define the initial state using that type
const initialState: loadingState = {
  value: 'block'
}

export const loadingSlice = createSlice({
  name: 'loading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setisAddCart: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setisAddCart } = loadingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const loading = (state: RootState) => state.loading.value

export default loadingSlice.reducer