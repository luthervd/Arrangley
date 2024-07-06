import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todoReducer from "../features/TodoItems/todoSlice";
import menuReducer from '../features/menu/menuSlice';
import userReducer from '../features/user/userSlice';
import checkListReducer from '../features/CheckList/checkListSlice';

export const store = configureStore({
  reducer: {
    todoItems: todoReducer,
    checkLists: checkListReducer,
    menu: menuReducer,
    user: userReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
