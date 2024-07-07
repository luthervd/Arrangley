import { Settings } from "luxon";

export interface CheckListItem {
    name: string;
    completed: boolean;
}

export interface CheckList {
    id: number,
    name: string,
    description: string,
    label: string,
    items: CheckListItem[]
}