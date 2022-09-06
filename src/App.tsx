import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import Links from './pages/Links/Links';
import {RequireAuth} from "./core/requireAuth";
import {Context} from "./index";
import {useContext, useEffect} from "react";

function App() {
    const {store} = useContext(Context)

    useEffect(() => {
        store.init()
    }, [])

    return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
              <RequireAuth redirectTo="/login">
                <Links/>
              </RequireAuth>
          }/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Sign/>}/>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
