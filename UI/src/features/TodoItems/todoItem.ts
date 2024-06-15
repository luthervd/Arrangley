export interface TodoItem {
    id?: number,
    name: string,
    description: string,
    created: string | null,
    due: string | null,
    label: string
}