import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { TodoItems } from '../TodoItems/TodoItems';
import { CreateItem } from '../TodoItems/CreateItem';
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
            switch(mItem)
            {
                case menuItems.createItem:
                    return <CreateItem />
                    break;
                case menuItems.tasks:
                    return <TodoItems />
                    break;
            }
        }
       
    }
   
    return(
        <div>{viewRender()}</div>
    )
}