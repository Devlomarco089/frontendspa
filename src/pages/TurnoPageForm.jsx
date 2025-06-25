import { TurnoForm } from "../components/TurnoForm"
import "../styles/TurnoForm.css"

export function TurnoPageForm(){

    return(
        <div className="create-turno-page">
            <h1 className="turno-title">Solicitar Servicio</h1>
             <TurnoForm />
        </div>
    )
}