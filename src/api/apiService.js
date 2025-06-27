import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

function handleAuthError(error) {
  if (
    error?.response?.data?.code === 'token_not_valid' ||
    error?.response?.status === 401
  ) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    // Solo redirigir si NO estamos en /login ni en /register
    const path = window.location.pathname.toLowerCase();
    if (path !== '/login' && path !== '/register') {
      window.location.href = '/login';
    }
  }
  throw error;
}

// 1. User Registration
export const registerClient = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registro/cliente/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerProfessional = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registro/profesional/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 2. Account Management
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:8000/api/user/profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/perfil-cuenta/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 3. Shopping Cart
export const addToCart = async (serviceData) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(`${BASE_URL}/carrito/`, serviceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const getCartItems = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${BASE_URL}/carrito/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const removeFromCart = async (itemId) => {
  const token = localStorage.getItem('accessToken');
  try {
    await axios.delete(`${BASE_URL}/carrito/${itemId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleAuthError(error);
  }
};

export const clearCart = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    await axios.delete(`${BASE_URL}/carrito/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleAuthError(error);
  }
};

// 4. Appointment Queries
export const getAvailableTimeSlots = async (serviceId, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/horarios-disponibles/?servicio=${serviceId}&fecha=${date}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAvailableProfessionals = async (serviceId, date, time) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/profesionales-disponibles/?servicio_id=${serviceId}&fecha=${date}&hora=${time}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 5. Appointment Booking
export const bookAppointments = async (appointmentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reservar-turnos/`, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 6. Order Payment
export const payOrder = async (orderId, paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/pagar-orden/${orderId}/`, paymentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Axios interceptor for adding auth token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
