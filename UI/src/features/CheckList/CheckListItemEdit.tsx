import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { saveCheckListAsync } from './checkListSlice';
import { TodoItem  } from '../TodoItems/todoItem';
import { CheckList } from './checkList';
import { useAuth0 } from '@auth0/auth0-react';


const defaultPending = { name : "", description: "", label: "Personal", items: [{name: "Item 1", completed: false }]} as CheckList;
export function CheckListItemEdit(props: { item? : CheckList}){
    const editMode = props.item !== null && props.item !== undefined; 
    const [pendingItem, setPendingItem ] = useState<CheckList>(props.item ?? defaultPending);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const setLabel = (label: string) => {
        pendingItem.label = label;
        setPendingItem({...pendingItem});
    }
    const dispatch = useAppDispatch();
    return(
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
                    <input className="input" type='text' value={pendingItem.items[0].label} onChange={nameEvt => setLabel(nameEvt.target.value)} />
                </div>    
            </div>
            <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <textarea className="textarea" value={pendingItem.description} onChange={descEvt => setPendingItem({...pendingItem,description: descEvt.target.value})} />
                </div>  
            </div>
            { editMode ? 
                <button type="submit" onClick={saveEvt => {dispatch(saveCheckListAsync({item:pendingItem, user: user})); setPendingItem(defaultPending);}}>Update</button> : 
                <button type="submit" onClick={saveEvt => {dispatch(saveCheckListAsync({item:pendingItem, user: user})); setPendingItem(defaultPending);}}>Create</button>
            }
        </form>
    )
}