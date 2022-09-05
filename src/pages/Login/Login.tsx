import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import './Login.scss'
import user from '../../assets/img/username.png'
import passw from '../../assets/img/password.png'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import Links from "../Links/Links";


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {store} = useContext(Context)

  if(store.isAuth){
    return <Links/>
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

  return (
    <motion.div className="login-content" initial="hidden" whileInView="visible" viewport={{amount:0.3, once:true}} custom={1} variants={featureAnimation}>
      <h1>LOGIN</h1>
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
        <img src={passw} alt="" />
				<input
         className="input100" 
         type="password" 
         name="pass" 
         placeholder="Type your password"
         onChange={(e)=>setPassword(e.target.value) }
         value={password}/>
				<span className="focus-input100" data-symbol="&#xf190;"></span>
			</div>

      <span className="login-forgot"><div>Forgot password?</div></span>

    <Link to='/links'>
      <button onClick={()=>store.login(username,password)}>Login</button>
    </Link>
      

      <div className="sign-box">
        <span>Haven't account yet?</span>
        <Link to='/sign'>
          <h5>SIGN UP</h5>
        </Link>
      </div>
    </motion.div>
  );
}

export default observer(Login);