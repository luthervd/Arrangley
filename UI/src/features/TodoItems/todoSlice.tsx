import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { fetchTodoLists, saveTodoItem, deleteTodoItem } from "./todoApi";
import { TodoItem } from "./todoItem";
import { ICurrentUser } from "../user/userSlice";


interface TodoItemsState {
    items: Array<TodoItem>
    status: "idle" | "loading" | "failed",
    savingStatus: "idle" | "saving" | "failed"
    deletingStatus: "idle" | "deleting" | "failed"
}

const initialState = {
    items: [],
    status: "idle",
    savingStatus: "idle",
    deletingStatus: "idle"
} as TodoItemsState;

export const loadAsync = createAsyncThunk(
    "todo/fetchItems",
    async (user: ICurrentUser) => {
        const response = await fetchTodoLists(user);
        // The value we return becomes the `fulfilled` action payload
        return response
    },
    {
        condition:(arg, api) => {
            const todoState= api.getState() as { todoItems: TodoItemsState}
            if(todoState.todoItems.status === "loading"){
                return false;
            }
            return true;
        }
    }
)

export const saveTodoAsync = createAsyncThunk(
    "todo/saveItem",
    async(arg: {item: TodoItem, user: ICurrentUser}) => {
        const response = await saveTodoItem(arg.item, arg.user);
        return response;
    },
    {
        condition:(arg, api) => {
            const todoState= api.getState() as { todoItems: TodoItemsState}
            if(todoState.todoItems.savingStatus === "saving"){
                return false;
            }
            return true;
        }
    }
)

export const deleteTodoAsync  = createAsyncThunk(
    "todo/deleteItem",
    async(arg: {itemId: number, user: ICurrentUser}, api)=> {
        const isDeleted = await deleteTodoItem(arg.itemId, arg.user);
        if(isDeleted){
            api.dispatch(loadAsync(arg.user));
        }
        return isDeleted;
    }
)

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.items = action.payload
        })
        .addCase(loadAsync.rejected, (state) => {
            state.status = "failed"
        })
        .addCase(saveTodoAsync.pending, (state) => {
            state.savingStatus = "saving";
        })
        .addCase(saveTodoAsync.fulfilled, (state, action) => {
            state.savingStatus = 'idle';
            state.items = [...state.items, action.payload ]
        })
        .addCase(saveTodoAsync.rejected, (state) => {
            state.savingStatus = 'failed';
        })
        .addCase(deleteTodoAsync.pending, (state) => {
            state.deletingStatus = "deleting";
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            state.savingStatus ='idle';
        })
        .addCase(deleteTodoAsync.rejected, (state) => {
            state.savingStatus ='failed';
        })

    },
})

export const {  } = todoSlice.actions

export const selectTodoItems = (state: RootState) => state.todoItems.items

export default todoSlice.reducer
