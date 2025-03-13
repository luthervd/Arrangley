import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { saveTodoAsync } from './todoSlice';
import { TodoItem } from './todoItem';
import { DateTime } from 'luxon';
import { useAuth0 } from '@auth0/auth0-react';
import Editor from 'react-simple-wysiwyg';

const defaultPending = {
    created: DateTime.now().toISO(), description: "", due: DateTime.now().plus({days: 7}).toISO(), name: "", label: "Personal"
} as TodoItem;


export function TodoItemEdit(props : {item? : TodoItem}){
   
        
    const editMode = props.item !== null && props.item !== undefined;
    const [pendingItem, setPendingItem ] = useState<TodoItem>(props.item ?? defaultPending);
    const {user} = useAuth0();
    const dispatch = useAppDispatch();
    return (
        <form className="form" onSubmit={evt => evt.preventDefault()}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type='text' value={pendingItem.name} onChange={nameEvt => setPendingItem({...pendingItem,name: nameEvt.target.value})} />
                </div>    
            </div>
            <div className="field">
                <label className="label">Label</label>
                <div className="control">
                    <input className="input" type='text' value={pendingItem.label} onChange={nameEvt => setPendingItem({...pendingItem,label: nameEvt.target.value})} />
                </div>    
            </div>
            <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <Editor value={pendingItem.description} onChange={descEvt => setPendingItem({...pendingItem,description: descEvt.target.value})} />
                </div>  
            </div>
            { editMode ? 
                <button type="submit" onClick={saveEvt => {dispatch(saveTodoAsync({item:pendingItem})); setPendingItem(defaultPending);}}>Update</button> : 
                <button type="submit" onClick={saveEvt => {dispatch(saveTodoAsync({item:pendingItem})); setPendingItem(defaultPending);}}>Create</button>
            }
        </form>
    )
}