import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectedMenuItem, menuItems } from "../menu/menuSlice";
import { TodoItems } from '../TodoItems/TodoItems';
import { CreateItem } from '../TodoItems/CreateItem';
import { Component } from "react";

export function ViewManager(props: any){
    
    const mItem = useAppSelector(selectedMenuItem);
    let component;

    function viewRender()
    {
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