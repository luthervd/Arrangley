import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { menuItems, selectedMenuItem} from "../menu/menuSlice";
import { selectTodoItems, loadAsync } from "./todoSlice";
import TodoItemView from './TodoItemView';
import { CreateItem } from './CreateItem';
import  './TodoItems.css';
export function TodoItems()
{
    const items = useAppSelector(selectTodoItems);

    const menuItem  = useAppSelector(selectedMenuItem);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAsync());
    },[]);

    return(
        <div>
            <section id="items">
                {items.map(x => <TodoItemView key={x.id} item={x}/>)}
            </section>
            { menuItem === menuItems.createItem ? <section>
                <CreateItem />
            </section> : null }
        </div>
    )
}