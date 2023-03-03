import React, {useContext, useState} from 'react'
import c from './style.module.css'
import {Wrap} from "../../../../components/wrappers/wrap";
import {MdKeyboardBackspace} from "react-icons/md";
import {useFormik} from "formik";
import {FormikField} from "../../../../components/formik/formik-field";
import {FormikDropzone} from "../../../../components/formik/formik-dropzone";
import {ButtonDefault} from "../../../../components/buttons/button-default";
import {registerLegalEntitySchema} from "./register-legal-entity.schema";
import {loginUserRequest, registerUserRequest} from "../../../../actions/user.actions";
import {toast} from "react-toastify";
import {Loading} from "../../../../components/other/loading";
import {AuthContext} from "../../../../context/AuthContext";


const RegisterLegalEntity = ({returnToChooseHandler}) => {
  const {login} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const legalEntityForm = useFormik({
    initialValues: {
      name: "",
      file: null,
      filePreview: null,
      password: "",
      confirmPassword: ""
    },
    onSubmit: (values) => sendRegisterDataHandler(values),
    validationSchema: registerLegalEntitySchema
  })

  const notify = text => toast(text)

  const sendRegisterDataHandler = async (values) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("login", values.name)
    formData.append("password", values.password)
    formData.append("file", values.file)

    const data = await registerUserRequest(formData)

    if (data) {
      const userData = await loginUserRequest({login: values.name, password: values.password})


      login(userData.accessToken)
    } else {
      notify("Unknown error")
    }

    setIsLoading(false)
  }


  return (
    <Wrap>
      <div className={c.header}>
        <MdKeyboardBackspace onClick={returnToChooseHandler} className={c.back} />
      </div>

      <div className={c.form}>
        <h2 className={c.pageTitle}>Register Legal Entity</h2>


        <div className={c.formSection}>
          <div>
            <h4 className={c.title}>Name</h4>
            <FormikField name="name" form={legalEntityForm} placeholder="Name" />
          </div>

          <div>
            <h4 className={c.title}>File</h4>
            <FormikDropzone form={legalEntityForm} name="file" imagePreview="filePreview" />
          </div>

          <div>
            <h4 className={c.title}>Password</h4>
            <FormikField name="password" form={legalEntityForm} placeholder="******" type="password" />
          </div>

          <div>
            <h4 className={c.title}>Confirm Password</h4>
            <FormikField name="confirmPassword" form={legalEntityForm} placeholder="******" type="password" />
          </div>
        </div>

        <ButtonDefault submit={legalEntityForm.submitForm} text="Register" />

        {isLoading && <Loading />}
      </div>


    </Wrap>
  )
}


export {
  RegisterLegalEntity
}