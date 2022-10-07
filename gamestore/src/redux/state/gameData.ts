import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGame } from '../../interface/gameInterface'
import type { RootState } from '../store'
import GameList from '../../json/GameList.json'

// Define a type for the slice state
interface gameDataState {
  value: IGame[]
}

// Define the initial state using that type
const initialState: gameDataState = {
  value: JSON.parse(JSON.stringify(GameList))
}

export const gameDataSlice = createSlice({
  name: 'gameData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<IGame[]>) => {
      state.value = action.payload
    }
  }
})

export const { setGameData } = gameDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const gameData = (state: RootState) => state.gameData.value

export default gameDataSlice.reducer