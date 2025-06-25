import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

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
    const response = await axios.get(`${BASE_URL}/perfil-cuenta/`);
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
  try {
    const response = await axios.post(`${BASE_URL}/carrito/`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/carrito/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
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
