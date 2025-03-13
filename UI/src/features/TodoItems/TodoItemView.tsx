import { useState, useEffect } from 'react';
import {TodoItem} from "./todoItem";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setStateTodoAsync } from "./todoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectMenuItem, menuItems} from '../menu/menuSlice';
import { token} from '../user/tokenSlice';
import AlterDay from './AlterDay';
import './TodoItems.css';

export default function TodoItemView(props: { item: TodoItem }){

    const dispatch = useAppDispatch();
    
    const [showDayAlter, setShowDayAlter] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const due = DateTime.fromISO(props.item.due ?? "");

    const now = DateTime.now();

    const daysTillDue  = Math.floor(due.diff(now,["days"]).days);
    
    const authToken = useAppSelector(token);

    useEffect(() => {
        setShowDayAlter(false);
    }, [props.item]);


    return (
        <div className="card todo-item">
            <header className="card-header">
                <div className="card-header-title"> 
                    <div className="days-left" onClick={x => setShowDayAlter(!showDayAlter)}>
                        <div className="counter">{daysTillDue}</div>  
                    </div>
                    <div>{ props.item.name }</div>
                </div>
                <span className="tag is-light mt-3 mr-2">{props.item.label}</span>
            </header>
            { showDayAlter ? <AlterDay todoItem={props.item} /> : 
            <div className="card-content">
                <div >
                    <label>Description:</label>
                    <p dangerouslySetInnerHTML={{ __html: props.item.description}}></p>
                </div>
                </div>
            }
           
            <footer className="card-footer">
                <div className="card-footer-item" onClick={evt => dispatch(selectMenuItem({route: menuItems.editItem, args: props.item}))}>
                    <FontAwesomeIcon icon="arrow-up-right-from-square"/>
                    <label>View</label>
                </div>
                <div className="card-footer-item" onClick={x => setShowDropDown(!showDropDown)}>
                    <div className={showDropDown ? "dropdown is-active" : "dropdown"}>
                    <div className="dropdown-trigger">
                        <div aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>{props.item.status}</span>
                       
                        </div>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                        <a className="dropdown-item" onClick={x => {dispatch(setStateTodoAsync({itemId: props.item.id, state: "Active"})); setShowDropDown(!showDropDown);}}> Active </a>
                        <a className="dropdown-item" onClick={x => {dispatch(setStateTodoAsync({itemId: props.item.id, state: "Completed"})); setShowDropDown(!showDropDown);}}> Completed </a>
                        <a className="dropdown-item" onClick={x => {dispatch(setStateTodoAsync({itemId: props.item.id, state: "Rejected"})); setShowDropDown(!showDropDown);}}> Rejected </a>
                        </div>
                    </div>
                    </div>

                </div>
            </footer>
        </div>
    )
}