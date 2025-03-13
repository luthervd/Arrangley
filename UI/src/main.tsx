import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { Auth0Provider } from '@auth0/auth0-react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faEdit, faCircleMinus, faCheckCircle, faArrowUpRightFromSquare, faAngleDown,faAngleRight, faAngleLeft, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import App from "./App"
import "./index.css"

library.add(faCalendar, faEdit, faCircleMinus, faCheckCircle, faArrowUpRightFromSquare, faAngleDown, faAngleRight, faAngleLeft, faAngleUp);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider
      domain="dev-e2wvf31xo6kxttv1.us.auth0.com"
      clientId="Hecmq0SVPrhd1xE8wTr1HHvn4DwqCwMC"
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "read:tasks",
        audience: "https://arrangley.net"
      }}
    >
      <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
)
