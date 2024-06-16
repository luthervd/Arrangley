import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {menuItems, selectedMenuItem, selectMenuItem } from "./menuSlice";

export default function Menu(props: any)
{
    const menuItem = useAppSelector(selectedMenuItem);
    const dispatch = useAppDispatch();

    return(
        <aside className="menu">
            <p className="menu-label">
                Arrangley
            </p>
            <ul className="menu-list">
                <li><a className={menuItem.route === menuItems.tasks ? 'is-active has-background-grey-dark' : ''} onClick={evt => dispatch(selectMenuItem({route: menuItems.tasks }))}>Tasks</a></li>
                <li><a className={menuItem.route === menuItems.createItem ? 'is-active has-background-grey-dark' : ''} onClick={evt => dispatch(selectMenuItem({ route: menuItems.createItem}))}>Create Item</a></li>
            </ul>
        </aside>
    )
}