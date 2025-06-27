import axios from 'axios';

export async function registerUser(formData) {
    try {
        // Mapea los campos al formato esperado por el backend
        const payload = {
            first_name: formData.firstName, // Mapea firstName a first_name
            last_name: formData.lastName,  // Mapea lastName a last_name
            email: formData.email,
            password: formData.password,
        };

        const response = await axios.post('http://localhost:8000/api/register/', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        return { success: true, message: 'Usuario registrado exitosamente' };
    } catch (error) {
        if (error.response) {
            return { success: false, message: JSON.stringify(error.response.data) };
        } else if (error.request) {
            return { success: false, message: 'No se recibió respuesta del servidor' };
        } else {
            return { success: false, message: error.message || 'Error desconocido' };
        }
    }
}