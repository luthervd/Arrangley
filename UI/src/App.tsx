import { ViewManager } from './features/ViewManager/ViewManager';
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { getUserState, login, readUserAsync } from './features/user/userSlice';
import Menu from './features/menu/menu';

import 'bulma/css/bulma.min.css';
import "./App.css"

function App() {
  var user = useAppSelector(getUserState);
  var dispatch = useAppDispatch();
  if(user.isCallBack){
    dispatch(readUserAsync());
  }
  return (
    <div className="App">
      <div className="columns">
        <div className="column is-4-tablet is-3-desktop is-2-widescreen">
          {user.isLoggedIn ? <Menu /> : null}    
        </div>
        <div className="column right-section">
          {<ViewManager />}
        </div>
      </div>
    </div>
  )
}

export default App
