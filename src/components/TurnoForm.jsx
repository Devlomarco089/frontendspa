import React, { useEffect, useState } from "react";
import { useTurnoForm } from "../api/turnoform.api";
import "../styles/TurnoForm.css";
import axios from "axios";

export function TurnoForm() {
    const {
        formData,
        successMessage,
        errorMessage,
        handleChange,
        handleSubmit,
    } = useTurnoForm();

    const [servicios, setServicios] = useState([]);
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        async function loadServicios() {
            try {
                const response = await axios.get("http://localhost:8000/api/servicios/");
                setServicios(response.data);
            } catch (error) {
                console.error("Error al cargar los servicios:", error);
            }
        }
        loadServicios();
    }, []);

    const loadHorarios = async () => {
        if (formData.servicio && formData.fecha) {
            const token = localStorage.getItem("accessToken"); // Obtiene el token del usuario logueado
            if (!token) {
                console.error("Usuario no autenticado.");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:8000/api/horarios-disponibles/",
                    {
                        params: {
                            servicio: formData.servicio,
                            fecha: formData.fecha,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
                        },
                    }
                );
                setHorarios(response.data);
            } catch (error) {
                console.error("Error al cargar los horarios disponibles:", error);
            }
        }
    };

    useEffect(() => {
        loadHorarios();
    }, [formData.servicio, formData.fecha]);

    return (
        <div className="create-turno-form bg-white p-8 rounded-lg shadow-lg border border-pink-100">
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor="fecha" className="block text-lg font-medium mb-2 text-gray-700">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                        border border-pink-200 focus:outline-none focus:ring-2 
                        focus:ring-pink-400 focus:border-transparent"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="servicio" className="block text-lg font-medium mb-2 text-gray-700">Servicio:</label>
                    <select
                        id="servicio"
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                        border border-pink-200 focus:outline-none focus:ring-2 
                        focus:ring-pink-400 focus:border-transparent"
                    >
                        <option value="">Selecciona un servicio</option>
                        {servicios.map((servicio) => (
                            <option key={servicio.id} value={servicio.id}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="horario" className="block text-lg font-medium mb-2 text-gray-700">Horario:</label>
                    <select
                        id="horario"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                        border border-pink-200 focus:outline-none focus:ring-2 
                        focus:ring-pink-400 focus:border-transparent"
                    >
                        <option value="">Selecciona un horario</option>
                        {horarios.map((horario) => (
                            <option key={horario.id} value={horario.id}>
                                {horario.hora}
                            </option>
                        ))}
                    </select>
                </div>
            
                <button 
                    type="submit"
                    className="w-full py-3 bg-green-500 text-white font-bold rounded-lg 
                    hover:bg-green-600 transition-all duration-300 
                    transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Crear Turno
                </button>
            </form>
        </div>
    );
}