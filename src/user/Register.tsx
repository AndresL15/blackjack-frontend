import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { register } from "./userService"

export default function Register() {
  const history = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const errorHandler = useErrorHandler()

  const registerClick = async () => {
    errorHandler.cleanRestValidations()
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
    }
    if (!password) {
      errorHandler.addError("password", "No puede estar vacío")
    }
    if (password !== password2) {
      errorHandler.addError("password2", "Las contraseñas no coinciden")
    }

    if (errorHandler.hasErrors()) {
      return
    }

    try {
      await register({
        name,
        password,
      })
      history("/")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  return (
    <GlobalContent>
      <div className="container">
        <div className="row">
          <FormTitle>Registrar Usuario</FormTitle>
          <Form>
            <div className="col-sm-4">
              <div className="mb-2">
                <FormInput
                  label="Usuario"
                  name="name"
                  value={name}
                  errorHandler={errorHandler}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="mb-2">
                <FormPassword
                  label="Password"
                  name="password"
                  value={password}
                  errorHandler={errorHandler}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="mb-2">
                <FormPassword
                  label="Repetir Password"
                  name="password2"
                  value={password2}
                  errorHandler={errorHandler}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-2">
                  <DangerLabel message={errorHandler.errorMessage} />
                  <FormButtonBar>
                    <FormAcceptButton label="Registrarse" onClick={registerClick} />
                    <FormButton label="Cancelar" onClick={() => history("/")} />
                  </FormButtonBar>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </GlobalContent>
  )
}
