import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useState } from "react";
import GlobalContent from "../common/components/GlobalContent";
import FormTitle from "../common/components/FormTitle";
import Form from "../common/components/Form";
import FormInput from "../common/components/FormInput";
import DangerLabel from "../common/components/DangerLabel";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import { create } from "./roomService";
import { User } from "../user/userService";

export function Room() {

    const history = useNavigate()
    const errorHandler = useErrorHandler()

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    let user: User
    user = JSON.parse(`${localStorage.getItem("user")}`);

    const createClick = async () => {
        const player = localStorage.getItem("user");
        try {
            await create({
                name,
                desc,
                user_id: user.id
            })
            history("/joinroom")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <FormTitle>Crear Sala</FormTitle>
                        <Form>
                            <div className="mb-2">
                                <FormInput
                                    label="Nombre"
                                    name="name"
                                    errorHandler={errorHandler}
                                    onChange={(event) => setName(event.target.value)} />
                                <DangerLabel message={errorHandler.errorMessage} />
                            </div>
                            <div className="mb-2">
                                <FormInput
                                    label="Descripcion"
                                    name="desc"
                                    errorHandler={errorHandler}
                                    onChange={(event) => setDesc(event.target.value)} />
                            </div>
                            <div className="mb-2">
                                <DangerLabel message={errorHandler.errorMessage} />
                                <FormButtonBar>
                                    <FormAcceptButton label="Crear" onClick={createClick} />
                                </FormButtonBar>
                            </div>
                        </Form>
                    </div>
                    <div className="col-sm-6">
                        <FormTitle>Entrar en una sala</FormTitle>
                        <div className="mt-5 mb-2">
                            <FormButton label="Entrar en una sala" onClick={() => history('/joinroom')} />
                        </div>
                        <div className="mb-2">
                            <FormButton label="Cancelar" onClick={() => history('/')} />
                        </div>
                    </div>
                </div>
            </div>
        </GlobalContent >
    );
}

