import {TodoItem } from "../TodoItems/todoItem";
import { CheckList, CheckListItem } from "./checkList";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserState } from '../user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectMenuItem, menuItems} from '../menu/menuSlice';

export default function CheckListView(props: { item: CheckList }){

    const dispatch = useAppDispatch();
    const userState = useAppSelector(getUserState);
    return (
        <div className="card todo-item">
            <header className="card-header">
                <p className="card-header-title">{ props.item.name }</p>
                <span className="tag is-light mt-3 mr-2">{props.item.label}</span>
            </header>
            <div className="card-content">
                <ul>
                    {props.item.items.map(item => 
                    <li>
                        <div>{item.name}</div>
                        <div>Completed : {item.completed ? 'Yes' : 'No'}</div>
                    </li>)}
                </ul>
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