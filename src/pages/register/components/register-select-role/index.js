import React from 'react'
import c from './style.module.css'
import {BsFillPersonFill} from "react-icons/bs";
import {GiTempleGate} from "react-icons/gi";


const RegisterSelectRole = ({selectLegalEntityHandler}) => {

  return (
    <div className={c.wrap}>
      <div className={c.person}>
        <BsFillPersonFill />
        <h3>Person</h3>
      </div>

      <div className={c.legal} onClick={selectLegalEntityHandler}>
        <GiTempleGate />
        <h3>Legal Entity</h3>
      </div>
    </div>
  )
}

export {
  RegisterSelectRole
}