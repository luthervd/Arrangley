import {TodoItem} from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTodoAsync} from "./todoSlice";
import { getUserState } from '../user/userSlice';

export default function TodoItemView(props: { item: TodoItem }){

    const dispatch = useAppDispatch();
    const userState = useAppSelector(getUserState);
    const created = DateTime.fromISO(props.item.created ?? "");
    const due = DateTime.fromISO(props.item.due ?? "");

    const now = DateTime.now();

    const daysSinceCreated = Math.floor(now.diff(created,["days"]).days)

    const daysTillDue  = Math.floor(due.diff(now,["days"]).days);

    const createdMessage = daysSinceCreated < 1 ? "Created today" : `Created ${daysSinceCreated} days ago`;

    let dueMessage = "";
    if(daysTillDue < 0){
        dueMessage = "Overdue";
    }
    else if(daysTillDue === 0){
        dueMessage = "Due today";
    }
    else{
        dueMessage = `Due in ${daysTillDue} days`;
    }
    return (
        <div className="card todo-item">
            <header className="card-header">
                <p className="card-header-title">{ props.item.name }</p>
            </header>
            <div className="card-content">
                <div className="content">
                    <section>
                    <label>{createdMessage}</label>
                    </section>
                    <section>
                        <label>{dueMessage}</label>
                    </section>
                    <button className="button" onClick={evt => dispatch(deleteTodoAsync({itemId: props.item.id ?? 0, user: userState.currentUser}))}>Delete</button>
                </div>
            </div>
        </div>
    )
}