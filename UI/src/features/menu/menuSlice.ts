import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export const menuItems = {
    createItem: "createItem",
    createCheckList: "createCheckList",
    editItem: "editItem",
    tasks: "tasks"
}

export interface MenuItem{
    route: string
    args?: any
}

export interface MenuItemState{
    routeValue: MenuItem
}

const initialState = {
    routeValue: {route: "tasks"}
} as MenuItemState;

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        selectMenuItem : (state, action : { payload: MenuItem }) => {
            state.routeValue = action.payload;
        }
    }
})

export const { selectMenuItem } = menuSlice.actions;
export const selectedMenuItem = (state: RootState) => state.menu.routeValue;
export default menuSlice.reducer;