import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPrint, FaCalendar, FaClock } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import dayjs from 'dayjs';

export function ProfesionalPanel() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const { isProfesional } = useUser();

    useEffect(() => {
        // Si no es profesional, redirigir al login
        if (!isProfesional) {
            navigate('/login');
            return;
        }
        loadAppointments(selectedDate);
    }, [isProfesional, selectedDate]);

    const loadAppointments = async (date) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/profesional/appointments/?fecha=${date}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            toast.error('Error al cargar los turnos');
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('appointments-table');
        const originalContents = document.body.innerHTML;
        
        document.body.innerHTML = `
            <h1 style="text-align: center; margin-bottom: 20px;">Lista de Turnos</h1>
            ${printContent.outerHTML}
        `;
        
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#2C3639] flex items-center justify-center">
                <div className="text-[#DCD7C9] text-xl">Cargando turnos...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2C3639] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#3F4E4F] rounded-lg shadow-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#DCD7C9]">
                            Panel de Turnos
                        </h1>
                        <div className="flex gap-4 items-center">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                className="p-2 rounded bg-[#DCD7C9] text-[#2C3639] font-bold"
                            />
                            <button
                                onClick={handlePrint}
                                className="flex items-center px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] rounded-lg
                                    hover:bg-[#4A5759] transition-all duration-300"
                            >
                                <FaPrint className="mr-2" />
                                Imprimir Turnos
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table id="appointments-table" className="w-full">
                            <thead className="bg-[#2C3639] text-[#DCD7C9]">
                                <tr>
                                    <th className="px-6 py-3 text-left">Cliente</th>
                                    <th className="px-6 py-3 text-left">Servicio</th>
                                    <th className="px-6 py-3 text-left">Fecha</th>
                                    <th className="px-6 py-3 text-left">Hora</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#DCD7C9]">
                                {appointments.length > 0 ? appointments.map((appointment) => (
                                    <tr 
                                        key={appointment.id}
                                        className="border-b border-[#4A5759] hover:bg-[#2C3639]"
                                    >
                                        <td className="px-6 py-4">
                                            {appointment.cliente_nombre ||
                                                (appointment.orden && appointment.orden.usuario ?
                                                    `${appointment.orden.usuario.first_name} ${appointment.orden.usuario.last_name}` :
                                                    appointment.cliente || "-")}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.servicio_nombre || appointment.servicio?.nombre || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FaCalendar className="mr-2 text-[#A27B5C]" />
                                                {appointment.fecha || appointment.horario?.fecha || "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FaClock className="mr-2 text-[#A27B5C]" />
                                                {appointment.hora || appointment.horario?.hora || "-"}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={4} className="text-center py-4">No hay turnos para este día.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfesionalPanel;