import {TodoItem } from "../TodoItems/todoItem";
import { CheckList } from "./checkList";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserState } from '../user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectMenuItem, menuItems} from '../menu/menuSlice';

export default function CheckListView(props: { item: CheckList }){

    const dispatch = useAppDispatch();
    const userState = useAppSelector(getUserState);
    const created = DateTime.fromISO(props.item.items[0].created ?? "");
    const due = DateTime.fromISO(props.item.items[0].created  ?? "");

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
                <span className="tag is-light mt-3 mr-2">{props.item.items[0].label}</span>
            </header>
            <div className="card-content">
                <div className="days-left">
                    <div className="counter">{daysTillDue}</div>
                    <label className="days-left-text">Days Left</label>
                </div>
            </div>
            <footer className="card-footer">
                <div className="card-footer-item" onClick={evt => dispatch(selectMenuItem({route: menuItems.editItem, args: props.item}))}>
                    <FontAwesomeIcon icon="arrow-up-right-from-square"/>
                    <label>View</label>
                </div>
            </footer>
        </div>
    )
}