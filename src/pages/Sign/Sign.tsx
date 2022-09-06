import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import user from '../../assets/img/username.png'
import passw from '../../assets/img/password.png'
import cloose from '../../assets/img/cloose.png'
import './Sign.scss'
import { motion } from "framer-motion"
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Sign: React.FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errEmpty, setErrEmpty] = useState(false)
    const [err400, setErr400] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {registration} = useAuth()

    const {store} = useContext(Context)

    if(store.isAuth) {
        return <Navigate to='/login'/>
    }

    const featureAnimation = {
        hidden: {
            y:-50,
            opacity:0,
        },
        visible: (custom:number) =>({
            y:0,
            opacity:1,
            transition: {delay: custom * 0.1}
        }),
    }

    

    const register = async () => {
        setLoading(true)
        try {
            await registration(username, password)
            navigate('/login')
        } catch (error:any) {
            if(!username && !password){
                setErrEmpty(true)
                setErr400(false)
            } else {
                setErr400(true)
                setErrEmpty(false)
            }
        }
        setLoading(false)
        
    }

    


  return (
      <div className="register-form">
          <motion.div className="sign-content" initial="hidden" whileInView="visible" viewport={{amount:0.3, once:true}} custom={1} variants={featureAnimation}>
            <Link to='/login'>
                <img src={cloose} alt="close" />
            </Link>
              <h1>Регистраиця</h1>
              <div className="wrap-input100 validate-input m-b-23 input-username" data-validate = "Username is reauired">
                  <span className="label-input100">Email</span>
                  <img src={user} alt=""/>
                  <input
                      className={errEmpty ? "emptyErr" : "input100"}
                      type="text"
                      name="username"
                      placeholder="Введите новый email*"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value) }
                  />
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <div className="wrap-input100 validate-input input-password" data-validate="Password is required">
                  <span className="label-input100">Password</span>
                  <img src={passw} alt=""/>
                  <input
                      className={errEmpty ? "emptyErr" : "input100"}
                      type="password"
                      name="pass"
                      placeholder="Введите новый пароль*"
                      onChange={(e)=>setPassword(e.target.value) }
                      value={password}/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>
              {err400 ? (<span style={{color:'red'}}>Пользователь с таким email уже существует</span>): ''}
              <button className="btn-sign" onClick={()=> register()}>{loading ?
               (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) : 'Создать аккаунт'}</button>
          </motion.div>
      </div>

  );
}

export default observer(Sign);
