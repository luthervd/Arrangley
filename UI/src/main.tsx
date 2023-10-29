import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faEdit, faCircleMinus, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import App from "./App"
import "./index.css"

library.add(faCalendar, faEdit, faCircleMinus, faArrowUpRightFromSquare);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
