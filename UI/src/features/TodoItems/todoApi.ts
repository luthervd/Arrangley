import {TodoItem} from "./todoItem";


const url = "http://localhost:5176/todo"
export async function fetchTodoLists() : Promise<TodoItem[]>{
    let result = await fetch(url);
    return await result.json() as TodoItem[];
}

export async function saveTodoItem(item: TodoItem) : Promise<TodoItem>{
    let result = await fetch(url,{
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json","Accepts": "application/json"}
    });
    return await  result.json() as TodoItem;
}