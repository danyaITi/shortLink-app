import { observer } from 'mobx-react-lite';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.scss';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import Links from './pages/Links/Links';
import React, {useContext, useEffect} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "./hooks/useAuth";
import {Context} from "./index";
import { RequireAuth } from './hoc/RequireAuth';

function App() {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const {logout, init} = useAuth()

    const logoutHandler = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand>Сокращатель ссылок</Navbar.Brand>
                    {store.isAuth && (
                        <Nav className="justify-content-end">
                            <Nav.Link onClick={logoutHandler}>Выйти</Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
            <div className="App">

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
            </div>
        </>

  );
}

export default observer(App);
