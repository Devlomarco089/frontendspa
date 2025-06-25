import { useState } from "react";
import axios from "axios";
import {
    createOrdenTurno as apiCreateOrdenTurno,
    getHorariosDisponibles as apiGetHorariosDisponibles,
    procesarPago as apiProcesarPago,
} from "./api/turnoform.api";

export function useTurnoForm() {
    const [formData, setFormData] = useState({
        fecha: "",
        hora: "",
        servicio: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            // Primero, crea la orden de turno
            const ordenResponse = await apiCreateOrdenTurno(formData);
            const ordenId = ordenResponse.data.id;

            // Luego, procesa el pago (si es necesario)
            // const pagoData = { /* tus datos de pago */ };
            // await apiProcesarPago(ordenId, pagoData);

            setSuccessMessage("Turno creado exitosamente.");
            setFormData({ fecha: "", hora: "", servicio: "" }); // Limpia el formulario
        } catch (error) {
            setErrorMessage("Error al crear el turno. Inténtalo nuevamente.");
        }
    };

    return {
        formData,
        successMessage,
        errorMessage,
        handleChange,
        handleSubmit,
    };
}