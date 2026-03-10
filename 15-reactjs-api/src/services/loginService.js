import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL de la API Laravel

// Función para login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    return response.data; // Debe incluir { token, user }
  } catch (error) {
    throw error; // Lanza el error para manejarlo en el componente
  }
};