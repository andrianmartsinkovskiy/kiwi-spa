import React, {useState} from 'react'
import {Wrap} from "../../components/wrappers/wrap";
import {RegisterSelectRole} from "./components/register-select-role";
import {RegisterLegalEntity} from "./components/register-legal-entity";
import {ToggleAuth} from "../../components/other/toggle-auth";

const REGISTER_STEP = {
  choosePosition: 'Choose Position',
  registerUser: 'Register User',
  registerLegalEntity: "Register Legal Entity"
}

const RegisterPage = () => {
  const [registerStep, setRegisterStep] = useState(REGISTER_STEP.choosePosition)
  const selectLegalEntityHandler = () => setRegisterStep(REGISTER_STEP.registerLegalEntity)
  const returnToChooseHandler = () => setRegisterStep(REGISTER_STEP.choosePosition)

  return (
    <Wrap>

      {
        registerStep === REGISTER_STEP.choosePosition && (
          <>
            <ToggleAuth />
            <RegisterSelectRole selectLegalEntityHandler={selectLegalEntityHandler} />
          </>
        )
      }

      {
        registerStep === REGISTER_STEP.registerLegalEntity && (
          <RegisterLegalEntity returnToChooseHandler={returnToChooseHandler} />
        )
      }

      {
        registerStep === REGISTER_STEP.registerUser && (
         <div>
           Register User
         </div>
        )
      }
    </Wrap>
  )
}


export {
  RegisterPage
}