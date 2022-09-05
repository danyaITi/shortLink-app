import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import user from '../../assets/img/username.png'
import passw from '../../assets/img/password.png'
import cloose from '../../assets/img/cloose.png'
import { Link } from "react-router-dom";
import './Sign.scss'
import { motion } from "framer-motion"
import Login from "../Login/Login";

const Sign: React.FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    // if(store.isAuth){
    //     return <Login/>
    // }

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

    

  return (
    <motion.div className="sign-content" initial="hidden" whileInView="visible" viewport={{amount:0.3, once:true}} custom={1} variants={featureAnimation}>
        <Link to='/' className="sign-back">
            <img src={cloose} alt="close" className="closeSign"/>
        </Link>
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
        <button className="btn-sign" onClick={()=>store.registration(username,password)}>Sign in</button>
    </motion.div>
  );
}

export default observer(Sign);