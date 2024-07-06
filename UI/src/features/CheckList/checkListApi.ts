import { ICurrentUser } from "../user/userSlice";
import { CheckList } from "./checkList";
const url = import.meta.env.VITE_API_URL;

export async function fetchCheckLists(user: ICurrentUser) : Promise<CheckList[]>{
    let result = await fetch(`${url}/checklist`, {
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${user.access_token}`}
    });
    return await result.json() as CheckList[];
}

export async function saveCheckList(item: CheckList, user: ICurrentUser) : Promise<CheckList>{

    let method = item.id !== null && item.id !== undefined && item.id > 0 ? "PUT" : "POST";
    let route = method === "PUT" ? `${url}/checkList/${item.id}` : `${url}/checkList`;
    let result = await fetch(route,{
        method: method,
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json","Accepts": "application/json", "Authorization": `Bearer ${user.access_token}`}
    });
    return await  result.json() as CheckList;
}