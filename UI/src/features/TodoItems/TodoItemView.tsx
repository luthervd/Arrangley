import {TodoItem} from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTodoAsync} from "./todoSlice";
import { getUserState } from '../user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <div className="days-left">
                    <div className="counter">{daysTillDue}</div>
                    <label className="days-left-text">Days Left</label>
                </div>
            </div>
            <footer className="card-footer">
                <div className="card-footer-item">
                    <FontAwesomeIcon icon="arrow-up-right-from-square"/>
                    <label>View</label>
                </div>
                <div className="card-footer-item">
                    <FontAwesomeIcon icon="edit"/>
                    <label>Edit</label>
                </div>
                <div className="card-footer-item" onClick={evt => dispatch(deleteTodoAsync({itemId: props.item.id ?? -1, user: userState.currentUser}))}>
                    <FontAwesomeIcon icon="circle-minus"/>
                    <label>Delete</label>
                </div>
            </footer>
        </div>
    )
}