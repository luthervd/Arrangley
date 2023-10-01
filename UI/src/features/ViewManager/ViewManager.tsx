import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { TodoItems } from '../TodoItems/TodoItems';
import { CreateItem } from '../TodoItems/CreateItem';
import { getUserState } from '../user/userSlice';
import { Login } from '../user/login';

export function ViewManager(props: any){
    
    const userState = useAppSelector(getUserState);
    const mItem = useAppSelector(selectedMenuItem);


    function viewRender()
    {
        if(!userState.isLoggedIn){
            return <Login />
        }
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
   
    return(
        <div>{viewRender()}</div>
    )
}