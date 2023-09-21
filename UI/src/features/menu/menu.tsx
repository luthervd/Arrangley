import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {menuItems, selectedMenuItem, selectMenuItem } from "./menuSlice";

export default function Menu(props: any)
{
    const menuItem = useAppSelector(selectedMenuItem);
    const dispatch = useAppDispatch();

    return(
        <aside className="menu">
            <p className="menu-label">
                Organize
            </p>
            <ul className="menu-list">
                <li><a onClick={evt => dispatch(selectMenuItem(menuItems.createItem))}>Create Item</a></li>
                <li><a onClick={evt => dispatch(selectMenuItem(menuItems.stats))}>Stats</a></li>
            </ul>
        </aside>
    )
}