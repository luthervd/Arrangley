import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { fetchCheckLists, saveCheckList } from "./checkListApi";
import { CheckList } from "./checkList";
import { ICurrentUser } from "../user/userSlice";


interface CheckListItemsState {
    items: Array<CheckList>
    status: "idle" | "loading" | "failed",
    savingStatus: "idle" | "saving" | "failed"
    deletingStatus: "idle" | "deleting" | "failed"
}

const initialState = {
    items: [],
    status: "idle",
    savingStatus: "idle",
    deletingStatus: "idle"
} as CheckListItemsState;

export const loadCheckListsAsync = createAsyncThunk(
    "checkList/fetchItems",
    async (arg: {token: string}) => {
        const response = await fetchCheckLists(arg.token);
        // The value we return becomes the `fulfilled` action payload
        return response
    },
    {
        condition:(arg, api) => {
            const checkListState= api.getState() as { checkLists: CheckListItemsState}
            if(checkListState.checkLists.status === "loading"){
                return false;
            }
            return true;
        }
    }
)

export const saveCheckListAsync = createAsyncThunk(
    "checkList/saveItem",
    async(arg: {item: CheckList, token: string}) => {
        const response = await saveCheckList(arg.item, arg.token);
        return response;
    },
    {
        condition:(arg, api) => {
            const checkListState= api.getState() as { checkLists: CheckListItemsState}
            if(checkListState.checkLists.savingStatus === "saving"){
                return false;
            }
            return true;
        }
    }
)

export const checkListSlice = createSlice({
    name: "checkList",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCheckListsAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadCheckListsAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.items = action.payload
        })
        .addCase(loadCheckListsAsync.rejected, (state) => {
            state.status = "failed"
        })
        .addCase(saveCheckListAsync.pending, (state) => {
            state.savingStatus = "saving";
        })
        .addCase(saveCheckListAsync.fulfilled, (state, action) => {
            state.savingStatus = 'idle';
            state.items = [...state.items, action.payload ]
        })
        .addCase(saveCheckListAsync.rejected, (state) => {
            state.savingStatus = 'failed';
        })

    },
})

export const {  } = checkListSlice.actions

export const selectcheckListItems = (state: RootState) => state.checkLists.items;

export default checkListSlice.reducer
