import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todoReducer from "../features/TodoItems/todoSlice";
import menuReducer from '../features/menu/menuSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    todoItems: todoReducer,
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
