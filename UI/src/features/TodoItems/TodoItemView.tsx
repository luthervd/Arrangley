import {TodoItem} from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTodoAsync} from "./todoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectMenuItem, menuItems} from '../menu/menuSlice';
import { token} from '../user/tokenSlice';

export default function TodoItemView(props: { item: TodoItem }){

    const dispatch = useAppDispatch();
    const created = DateTime.fromISO(props.item.created ?? "");
    const due = DateTime.fromISO(props.item.due ?? "");

    const now = DateTime.now();

    const daysSinceCreated = Math.floor(now.diff(created,["days"]).days)

    const daysTillDue  = Math.floor(due.diff(now,["days"]).days);

    const createdMessage = daysSinceCreated < 1 ? "Created today" : `Created ${daysSinceCreated} days ago`;
    
    const authToken = useAppSelector(token);

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
                <p className="card-header-title"> 
                    <div className="days-left">
                        <div className="counter">{daysTillDue}</div>
                    </div>
                </p>
                <span className="tag is-light mt-3 mr-2">{props.item.label}</span>
            </header>
            <div className="card-content">
                <div>{ props.item.name }</div>
                <p>{ props.item.description }</p>
            </div>
            <footer className="card-footer">
                <div className="card-footer-item" onClick={evt => dispatch(selectMenuItem({route: menuItems.editItem, args: props.item}))}>
                    <FontAwesomeIcon icon="arrow-up-right-from-square"/>
                    <label>View</label>
                </div>
                <div className="card-footer-item" onClick={evt => dispatch(deleteTodoAsync({itemId: props.item.id ?? -1, token: authToken}))}>
                    <FontAwesomeIcon icon="circle-minus"/>
                    <label>Delete</label>
                </div>
            </footer>
        </div>
    )
}