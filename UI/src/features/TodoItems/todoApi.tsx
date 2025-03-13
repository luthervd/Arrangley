import {TodoItem} from "./todoItem";

const url = import.meta.env.VITE_API_URL;

export async function fetchTodoLists(token: string) : Promise<TodoItem[]>{
   
    let result = await fetch(`${url}/todo`,{
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${token}`}
    });
    return await result.json() as TodoItem[];
}

export async function saveTodoItem(item: TodoItem, token: string) : Promise<TodoItem>{

    let method = item.id !== null && item.id !== undefined ? "PUT" : "POST";
    let route = method === "PUT" ? `${url}/todo/${item.id}` : `${url}/todo`;
    let response = await fetch(route,{
        method: method,
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${token}`}
    });
    let result = await  response.json() as TodoItem;
    return result;
}



