import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTodoItems, loadAsync } from "../TodoItems/todoSlice";
import { selectcheckListItems, loadCheckListsAsync } from "../CheckList/checkListSlice";
import { token } from "../user/tokenSlice";
import TodoItemView from '../TodoItems/TodoItemView';
import CheckListView from "../CheckList/CheckListItemView";
import  './TodoItems.css';

export function ItemManager()
{
    const items = useAppSelector(selectTodoItems);    
    const checkLists = useAppSelector(selectcheckListItems);
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(token);
    useEffect(() => {
        if(accessToken){
            dispatch(loadAsync({token : accessToken }));
            dispatch(loadCheckListsAsync({token : accessToken }));
        }
    },[accessToken]);

    return(
        <div id="items">
            {items.map(x => <TodoItemView key={x.id} item={x}/>)}
            {checkLists.map(x => <CheckListView key={x.id} item={x}/>)}
        </div>
    )
}