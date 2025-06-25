import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPrint, FaCalendar, FaClock } from 'react-icons/fa';

export function ProfesionalPanel() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const response = await axios.get(
                'https://web-production-5825.up.railway.app/api/profesional/appointments/',
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
                        <button
                            onClick={handlePrint}
                            className="flex items-center px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] rounded-lg
                                hover:bg-[#4A5759] transition-all duration-300"
                        >
                            <FaPrint className="mr-2" />
                            Imprimir Turnos
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table id="appointments-table" className="w-full">
                            <thead className="bg-[#2C3639] text-[#DCD7C9]">
                                <tr>
                                    <th className="px-6 py-3 text-left">Cliente</th>
                                    <th className="px-6 py-3 text-left">Servicio</th>
                                    <th className="px-6 py-3 text-left">Fecha</th>
                                    <th className="px-6 py-3 text-left">Hora</th>
                                    <th className="px-6 py-3 text-left">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#DCD7C9]">
                                {appointments.map((appointment) => (
                                    <tr 
                                        key={appointment.id}
                                        className="border-b border-[#4A5759] hover:bg-[#2C3639]"
                                    >
                                        <td className="px-6 py-4">
                                            {appointment.client_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.service_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FaCalendar className="mr-2 text-[#A27B5C]" />
                                                {new Date(appointment.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FaClock className="mr-2 text-[#A27B5C]" />
                                                {appointment.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                appointment.status === 'pending' 
                                                    ? 'bg-yellow-500' 
                                                    : 'bg-green-500'
                                            } text-white`}>
                                                {appointment.status === 'pending' ? 'Pendiente' : 'Confirmado'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfesionalPanel;