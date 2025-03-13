import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { fetchTodoLists, saveTodoItem } from "./todoApi";
import { TodoItem } from "./todoItem";

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
    async (arg: {token: string}) => {
        const response = await fetchTodoLists(arg.token);
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
    async(arg: {item: TodoItem}, {getState }) => {
        const { token } = getState() as RootState;
        const response = await saveTodoItem(arg.item, token.token);
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

export const updateTodoAsync = createAsyncThunk("todo/updateItem",
    async(arg:{item: TodoItem}, { getState }) => {
        const { token }  = getState() as RootState;
        return await saveTodoItem(arg.item, token.token);
},
{
    condition:(arg,api)=>{
        const todoState= api.getState() as { todoItems: TodoItemsState}
        if(todoState.todoItems.savingStatus === "saving"){
            return false;
        }
        return true;
    }}
)

export const setStateTodoAsync  = createAsyncThunk(
    "todo/setState",
    async(arg: {itemId: number | undefined, state: string}, api)=> {
        const { token, todoItems }= api.getState() as RootState;
        const item = todoItems.items.filter(x => x.id === arg.itemId)[0];
        let next = { ...item, status: arg.state};
        await saveTodoItem(next, token.token);
        api.dispatch(loadAsync({token: token.token})); 
        return item;
    },
    {
        condition:(arg,api)=>{
            const todoState= api.getState() as { todoItems: TodoItemsState}
            if(todoState.todoItems.savingStatus === "saving"){
                return false;
            }
            return true;
        }
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
        .addCase(updateTodoAsync.pending, (state) => {
            state.savingStatus = "saving";
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            state.savingStatus = 'idle';
            let items = state.items;
            let index = items.findIndex(x => x.id === action.payload.id);
            if(index > -1){
                items[index] = action.payload
            }
            state.items = [...items];
        })
        .addCase(updateTodoAsync.rejected, (state) => {
            state.savingStatus = 'failed';
        })
        .addCase(setStateTodoAsync.pending, (state) => {
            state.savingStatus = "saving";
        })
        .addCase(setStateTodoAsync.fulfilled, (state) => {
            state.savingStatus ='idle';
        })
        .addCase(setStateTodoAsync.rejected, (state) => {
            state.savingStatus ='failed';
        })

    },
})

export const {  } = todoSlice.actions

export const selectTodoItems = (state: RootState) => state.todoItems.items

export default todoSlice.reducer
