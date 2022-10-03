import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface sideIsOpenState {
  value: boolean
}

// Define the initial state using that type
const initialState: sideIsOpenState = {
  value: false
}

export const isSideOpenSlice = createSlice({
  name: 'isSideOpen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setisSideOpen: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
})

export const { setisSideOpen } = isSideOpenSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isSideOpen = (state: RootState) => state.isSideOpen.value

export default isSideOpenSlice.reducer