import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todoReducer from "../features/TodoItems/todoSlice";
import menuReducer from '../features/menu/menuSlice';
import checkListReducer from '../features/CheckList/checkListSlice';
import tokenReducer from '../features/user/tokenSlice';

export const store = configureStore({
  reducer: {
    todoItems: todoReducer,
    checkLists: checkListReducer,
    menu: menuReducer,
    token: tokenReducer
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
