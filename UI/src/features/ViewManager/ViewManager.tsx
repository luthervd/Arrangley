import { useAppSelector } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { ItemManager } from './ItemManager';
import { TodoItemEdit } from '../TodoItems/TodoItemEdit';
import { Login } from '../user/login';
import { useAuth0 } from "@auth0/auth0-react";
import { CheckListItemEdit } from "../CheckList/CheckListItemEdit";

export function ViewManager(props: any){
    const mItem = useAppSelector(selectedMenuItem);
    const { user, isAuthenticated, isLoading } = useAuth0();


    function viewRender()
    {  
        if(!isAuthenticated){
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