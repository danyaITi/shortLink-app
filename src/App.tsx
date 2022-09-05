import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import Links from './pages/Links/Links';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/sign' element={<Sign/>}/>
          <Route path='/links' element={<Links/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
