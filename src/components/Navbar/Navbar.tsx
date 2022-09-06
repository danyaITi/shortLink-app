import {Context} from "../../index";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.scss'

export const Navbar:React.FC = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();

    const logout = () => {
        store.logout()
        navigate('/login')
    }

    return (
        <div className="navbar">
            <button onClick={() => logout()} className='btn-exit'>Выйти</button>
        </div>
    )
}
