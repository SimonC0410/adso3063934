import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL de la API Laravel

// Crear instancia de axios con interceptor para token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
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

// Función para obtener mascotas
export const fetchPets = async () => {
  try {
    const response = await api.get('/api/pets/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};