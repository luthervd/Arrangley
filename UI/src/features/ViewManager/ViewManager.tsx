import { useAppSelector } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { ItemManager } from './ItemManager';
import { TodoItemEdit } from '../TodoItems/TodoItemEdit';
import { getUserState } from '../user/userSlice';
import { Login } from '../user/login';
import { CheckListItemEdit } from "../CheckList/CheckListItemEdit";

export function ViewManager(props: any){
    const mItem = useAppSelector(selectedMenuItem);

    function viewRender()
    {
        if(!props.userState){
            <div>No User</div>
        }
        else if(!props.userState.isLoggedIn){
            return <Login />
        }
        else{
            switch(mItem.route)
            {
                case menuItems.createItem:
                    return <TodoItemEdit />
                case menuItems.tasks:
                    return <ItemManager />
                case menuItems.editItem:
                    return <TodoItemEdit item={mItem.args}/>
                case menuItems.createCheckList:
                    return <CheckListItemEdit item={mItem.args}/>
            }
        }
       
    }
   
    return(
        <div>{viewRender()}</div>
    )
}