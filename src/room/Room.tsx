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

export function Room() {

    const history = useNavigate()
    const errorHandler = useErrorHandler()

    const [name, setName] = useState("")
    
    const createClick = async () => {
        const player = localStorage.getItem("user");
        try {
            await create({
                name
            })
            history("/joinroom")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Crear Sala</FormTitle>
            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    errorHandler={errorHandler}
                    onChange={(event) => setName(event.target.value)} />
                <DangerLabel message={errorHandler.errorMessage} />
                <FormButtonBar>
                    <FormAcceptButton label="Crear" onClick={createClick} />
                </FormButtonBar>
            </Form >
            <FormTitle>Entrar en una sala</FormTitle>
            <FormButton label="Entrar en una sala" onClick={() => history('/joinroom')} />
            <FormButton label="Cancelar" onClick={() => history('/')} />
        </GlobalContent >
    );
}

