import {TodoItem} from "./todoItem";


export default function TodoItemView(props: { item: TodoItem }){
    return (
        <div className="todo-item">
            <header>
                { props.item.name }
            </header>
            <section>
                <label>Created : </label>
                <section>{ props.item.created }</section>
            </section>
            <section>
                <label>Due : </label>
                <section>{ props.item.due }</section>
            </section>
            <section className="item-description">
                { props.item.description }
            </section>
        </div>
    )
}