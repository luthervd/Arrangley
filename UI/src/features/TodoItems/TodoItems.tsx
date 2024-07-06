import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTodoItems, loadAsync } from "./todoSlice";
import { selectcheckListItems, loadCheckListsAsync } from "../CheckList/checkListSlice";
import { getUserState } from '../user/userSlice';
import TodoItemView from './TodoItemView';
import  './TodoItems.css';

export function TodoItems()
{
    const items = useAppSelector(selectTodoItems);    
    const checkLists = useAppSelector(selectcheckListItems);
    const dispatch = useAppDispatch();
    const userState = useAppSelector(getUserState);
    useEffect(() => {
        dispatch(loadAsync(userState.currentUser));
        dispatch(loadCheckListsAsync(userState.currentUser));
    },[]);

    return(
        <div id="items">
            {items.map(x => <TodoItemView key={x.id} item={x}/>)}
        </div>
    )
}