import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


interface TokenState {
    token: string,
    hasToken: boolean
}

const initialState = {
    token: '',
    hasToken: false
} as TokenState;


export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.hasToken = true;
        }
    }
})

export const { setToken } = tokenSlice.actions

export const token = (state: RootState) => state.token.token;

export default tokenSlice.reducer