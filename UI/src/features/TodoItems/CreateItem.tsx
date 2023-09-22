import { useState } from 'react';
import { useAppDispatch } from "../../app/hooks";
import { saveTodoAsync } from './todoSlice';
import { TodoItem } from './todoItem';
import { DateTime } from 'luxon';

const defaultPending = {
    created: DateTime.now().toISO(), description: "", due: DateTime.now().plus({days: 7}).toISO(), name: ""
};
export function CreateItem(){
    const [pendingItem, setPendingItem ] = useState<TodoItem>(defaultPending);
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
                <label className="label">Description</label>
                <div className="control">
                    <textarea className="textarea" value={pendingItem.description} onChange={descEvt => setPendingItem({...pendingItem,description: descEvt.target.value})} />
                </div>  
            </div>
            <button type="submit" onClick={saveEvt => {dispatch(saveTodoAsync(pendingItem)); setPendingItem(defaultPending);}}>Save</button>
        </form>
    )
}