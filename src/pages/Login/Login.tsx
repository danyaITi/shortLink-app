import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import './Login.scss'
import user from '../../assets/img/username.png'
import passw from '../../assets/img/password.png'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [err422,setErr422] = useState(false)
  const [err400,setErr400] = useState(false)
  const navigate = useNavigate();
  const {login} = useAuth();

  const {store} = useContext(Context)
  if(store.isAuth) {
    return <Navigate to='/'/>
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


  const loginHandler = async () => {
    setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch (error:any) {
      if (error.response.status === 400) {
        setErr400(true)
        setErr422(false)
      } else if(error.response.status === 422){
        setErr422(true)
        setErr400(false)
      }
    }
    setLoading(false)
  }

  return (
    <div className="login-form">

      <motion.div className="login-content" initial="hidden" whileInView="visible" viewport={{amount:0.3, once:true}} custom={1} variants={featureAnimation}>
        <h1>Вход</h1>
        <div className="wrap-input100 validate-input m-b-23 input-username" data-validate = "Username is reauired">
          <span className="label-input100">Email</span>
          <img src={user} alt=""/>
          <input
          className={ err422 ? "input-err" : "input100"}
          type="text"
          name="username"
          placeholder='Введите email'
          value={username}
          onChange={(e)=>setUsername(e.target.value) }
          />
          <span className="focus-input100" data-symbol="&#xf206;"></span>
        </div>

        <div className="wrap-input100 validate-input input-password" data-validate="Password is required">
          <span className="label-input100">Password</span>
          <img src={passw} alt="" />
          <input
          className={ err422 ? "input-err" : "input100"}
          type="password"
          name="pass"
          placeholder='Введите email'
          onChange={(e)=>setPassword(e.target.value) }
          value={password}/>
          <span className="focus-input100" data-symbol="&#xf190;"></span>
        </div>
        {err400 ? (<span style={{color:'red'}}>Неверный email или пароль</span>): ''}

        <button className="btn-enter" onClick={()=> loginHandler()}>{loading ? 
        (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) : 'Войти'}</button>


        <div className="sign-box">
          <span>Ещё нет аккаунта?</span>
          <Link to='/register'>
            <h5>Регистраиця</h5>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default observer(Login);
