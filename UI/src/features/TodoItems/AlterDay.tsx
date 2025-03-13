import { useState } from "react";
import { TodoItem } from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateTodoAsync } from './todoSlice';
import { token } from '../user/tokenSlice';

export default function AlterDay(props: {todoItem : TodoItem}){

    const [item, updateItem ] = useState<TodoItem>(props.todoItem);
    const dueDate = DateTime.fromISO(props.todoItem.due ?? "");
    const dispatch = useAppDispatch();
    const authToken = useAppSelector(token);
    const setDays = (days: number) =>{
        var next = DateTime.now().plus({days: 7}).toISO();
        updateItem({...item, due: next})
    }

    const addDays = (days: number) => {

        const next = dueDate.plus({days: days}).toISO();
        updateItem({...item, due: next})
    }

    return(
        <div>
            <button className="button" onClick={x => setDays(6)}>Reset</button>
            <button className="button" onClick={x => addDays(1)}>Add 1 day</button>
            <button className="button" onClick={x => addDays(5)}>Add 5 days</button>
            <button className="button" onClick={x => addDays(10)}>Add 10 days</button>
            <button className="button" onClick={saveEvt => {dispatch(updateTodoAsync({item:item}));}}>Save</button>
        </div>
    )

}