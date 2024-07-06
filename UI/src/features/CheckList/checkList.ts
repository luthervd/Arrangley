import { TodoItem } from "../TodoItems/todoItem";

export interface CheckList {
    id: number,
    name: string,
    description: string,
    items: TodoItem[]
}