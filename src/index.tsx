import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store'
import {BrowserRouter, HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface State {
  store: Store
}

const store = new Store()

export const Context = createContext<State>({
  store
})


root.render(
  <HashRouter>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </HashRouter>
);
