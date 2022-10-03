import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface categoryState {
  value: string
}

// Define the initial state using that type
const initialState: categoryState = {
  value: 'home'
}

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setCategory } = categorySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const category = (state: RootState) => state.category.value

export default categorySlice.reducer