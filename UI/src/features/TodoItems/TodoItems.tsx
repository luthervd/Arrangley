import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTodoItems, loadAsync } from "./todoSlice";
import TodoItemView from './TodoItemView';
import { CreateItem } from './CreateItem';
import  './TodoItems.css';
export function TodoItems()
{
    const items = useAppSelector(selectTodoItems);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAsync());
    },[]);

    return(
        <div>
            <section id="items">
                <ul className='todo-list'>
                    {items.map(x => <li key={x.id}><TodoItemView item={x}/></li>)}
                </ul>
            </section>
            <section>
                <CreateItem />
            </section>
        </div>
    )
}