import { ViewManager } from './features/ViewManager/ViewManager';
import { useEffect } from 'react';
import { useAppDispatch } from "./app/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { setToken } from './features/user/tokenSlice';
import Menu from './features/menu/menu';

import 'bulma/css/bulma.min.css';
import "./App.css"

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(isAuthenticated){
      const tokenload = async () => {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://arrangley.net`,
            scope: "read:tasks",
          },
        });
        dispatch(setToken(accessToken));
      }
      tokenload();
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <div className="columns">
        <div className="column is-4-tablet is-3-desktop is-2-widescreen">
          {isAuthenticated ? <Menu /> : null}    
        </div>
        <div className="column right-section">
          {<ViewManager userState={user}/>}
        </div>
      </div>
    </div>
  )
}

export default App
