import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // URL de la API Laravel

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
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

// Auth endpoints
export const login = (email, password) => 
  api.post('/login', { email, password }); // Ajusta según tus rutas Laravel

export const register = (userData) => 
  api.post('/register', userData);

// Pets endpoints
export const getPets = () => api.get('/pets');
export const getPet = (id) => api.get(`/pets/${id}`);
export const createPet = (petData) => api.post('/pets', petData);
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData);
export const deletePet = (id) => api.delete(`/pets/${id}`);

export default api;