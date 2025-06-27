import axios from 'axios';

const API_URL = "http://localhost:8000/api/turnos/";

export async function getTurnos() {
    const token = localStorage.getItem('accessToken'); 
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener los turnos:", error);
        throw error;
    }
}