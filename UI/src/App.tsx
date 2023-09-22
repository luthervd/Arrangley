import { ViewManager } from './features/ViewManager/ViewManager';
import Menu from './features/menu/menu';

import 'bulma/css/bulma.min.css';
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="columns">
        <div className="column is-4-tablet is-3-desktop is-2-widescreen">
          <Menu />    
        </div>
        <div className="column right-section">
          <ViewManager />
        </div>
      </div>
    </div>
  )
}

export default App
