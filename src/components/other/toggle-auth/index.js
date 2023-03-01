import React from 'react'
import c from './style.module.css'
import {useNavigate, useNavigation} from "react-router-dom";
import {APPRoutes} from "../../../const/app-routes";


const ToggleAuth = () => {
  const navigate = useNavigate()
  const isRegister = window.location.pathname === '/register'
  const registerClass = !isRegister ? c.active : c.disabled
  const loginClass = isRegister ? c.active : c.disabled

  const goToLoginHandler = () => isRegister && navigate(APPRoutes.login)
  const goToRegisterHandler = () => !isRegister && navigate(APPRoutes.register)

  return (
    <div className={c.wrap}>
      <span onClick={goToLoginHandler} className={loginClass}>Login </span>
      |
      <span onClick={goToRegisterHandler} className={registerClass}> Register</span>
    </div>
  )
}


export {
  ToggleAuth
}