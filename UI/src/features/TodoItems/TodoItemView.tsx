import {TodoItem} from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch } from "../../app/hooks";
import { deleteTodoAsync} from "./todoSlice";

export default function TodoItemView(props: { item: TodoItem }){

    const dispatch = useAppDispatch();
    const created = DateTime.fromISO(props.item.created ?? "");
    const due = DateTime.fromISO(props.item.due ?? "");

    const now = DateTime.now();

    const daysSinceCreated = now.diff(created,["days"]);

    const daysTillDue  = Math.round(due.diff(now,["days"]).days);

    const createdMessage = daysSinceCreated.days < 1 ? "Created today" : `Created ${daysSinceCreated.days} days ago`;

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
        <div className="todo-item">
            <header>
                { props.item.name }
            </header>
            <section className="item-description">
                { props.item.description }
            </section>
            <section>
                <label>{createdMessage}</label>
            </section>
            <section>
                <label>{dueMessage}</label>
            </section>
            <button onClick={evt => dispatch(deleteTodoAsync(props.item.id ?? 0))}>Delete</button>
        </div>
    )
}