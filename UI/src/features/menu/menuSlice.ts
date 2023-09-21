import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export const menuItems = {
    createItem: "createItem",
    stats: "stats",
    tasks: "tasks"
}

export interface MeunItemState{
    selectedItem: string
}

const initialState = {
    selectedItem: "tasks"
} as MeunItemState;

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        "selectMenuItem" : (state, action : { payload: string }) => {
            state.selectedItem = action.payload;
        }
    }
})

export const { selectMenuItem } = menuSlice.actions;
export const selectedMenuItem = (state: RootState) => state.menu.selectedItem;
export default menuSlice.reducer;