import { useAppSelector } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { TodoItems } from '../TodoItems/TodoItems';
import { TodoItemEdit } from '../TodoItems/TodoItemEdit';
import { getUserState } from '../user/userSlice';
import { Login } from '../user/login';

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
                    return <TodoItems />
                case menuItems.editItem:
                    return <TodoItemEdit item={mItem.args}/>
            }
        }
       
    }
   
    return(
        <div>{viewRender()}</div>
    )
}