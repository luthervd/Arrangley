import {TodoItem} from "./todoItem";
import { ICurrentUser } from '../user/userSlice';
const url = import.meta.env.VITE_API_URL;



export async function fetchTodoLists(user: ICurrentUser) : Promise<TodoItem[]>{
    
    let result = await fetch(url,{
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${user.access_token}`}
    });
    return await result.json() as TodoItem[];
}

export async function saveTodoItem(item: TodoItem, user: ICurrentUser) : Promise<TodoItem>{

    let method = item.id !== null && item.id !== undefined ? "PUT" : "POST";
    let route = method === "PUT" ? `${url}/${item.id}` : url;
    let result = await fetch(route,{
        method: method,
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${user.access_token}`}
    });
    return await  result.json() as TodoItem;
}

export async function deleteTodoItem(itemId: number, user: ICurrentUser) : Promise<boolean>{
    let result = await fetch(`${url}/${itemId}`,{ method: "DELETE", headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${user.access_token}`}});
    return result.ok;
}