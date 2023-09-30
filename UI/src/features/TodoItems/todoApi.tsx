import {TodoItem} from "./todoItem";
import { ICurrentUser } from '../user/userSlice';
const url = import.meta.env.VITE_API_URL;



export async function fetchTodoLists(user: ICurrentUser) : Promise<TodoItem[]>{
    
    let result = await fetch(url,{
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `bearer: ${user.access_token}`}
    });
    return await result.json() as TodoItem[];
}

export async function saveTodoItem(item: TodoItem, user: ICurrentUser) : Promise<TodoItem>{

    let result = await fetch(url,{
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `bearer: ${user.access_token}`}
    });
    return await  result.json() as TodoItem;
}

export async function deleteTodoItem(itemId: number, user: ICurrentUser) : Promise<boolean>{
    let result = await fetch(`${url}/${itemId}`,{ method: "DELETE", headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `bearer: ${user.access_token}`}});
    return result.ok;
}