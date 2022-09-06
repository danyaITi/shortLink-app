import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import user from '../../assets/img/username.png'
import passw from '../../assets/img/password.png'
import cloose from '../../assets/img/cloose.png'
import { Link } from "react-router-dom";
import './Sign.scss'
import { motion } from "framer-motion"
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Sign: React.FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
    const {registration} = useAuth()

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


    const register = async () => {
        try {
            await registration(username, password)
            navigate('/login')
        } catch (e) {
            console.log(e)
        }
    }


  return (
      <div className="register-form">
          <motion.div className="sign-content" initial="hidden" whileInView="visible" viewport={{amount:0.3, once:true}} custom={1} variants={featureAnimation}>
              <h1>SIGN IN</h1>
              <div className="wrap-input100 validate-input m-b-23 input-username" data-validate = "Username is reauired">
                  <span className="label-input100">Username</span>
                  <img src={user} alt=""/>
                  <input
                      className="input100"
                      type="text"
                      name="username"
                      placeholder="Type your username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value) }
                  />
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <div className="wrap-input100 validate-input input-password" data-validate="Password is required">
                  <span className="label-input100">Password</span>
                  <img src={passw} alt=""/>
                  <input
                      className="input100"
                      type="password"
                      name="pass"
                      placeholder="Type your password"
                      onChange={(e)=>setPassword(e.target.value) }
                      value={password}/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>
              <button className="btn-sign" onClick={()=> register()}>Sign in</button>
          </motion.div>
      </div>

  );
}

export default observer(Sign);
