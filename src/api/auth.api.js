import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


/**
 * Realiza una solicitud POST al endpoint de login para obtener los tokens JWT.
 * @param {Object} credentials - Credenciales del usuario (username y password).
 * @returns {Object} - Respuesta con los tokens de acceso y refresco.
 * @throws {Error} - Error si las credenciales son inválidas o la solicitud falla.
 */



export async function login(credentials) {
    try {
        const response = await axios.post(`${API_URL}/token/`, {
            email: credentials.email,
            password: credentials.password
        });
        
        if (response.data.access) {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            // Obtener datos del usuario
            const userResponse = await getUserProfile();
            localStorage.setItem('userData', JSON.stringify(userResponse.data));
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error en el inicio de sesión');
    }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      password: userData.password,
      tipo_usuario: userData.tipo_usuario || 'cliente'
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Error en el registro' 
    };
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('accessToken');
  return axios.get(`${API_URL}/user/profile/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}