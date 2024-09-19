import axios from 'axios';

// Determina la URL base dependiendo del entorno
const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

// Crea una instancia de Axios con la URL base para la autenticación
const AuthApi = axios.create({
  baseURL: `${URL}/token/`,
  withCredentials: true, // Incluye cookies en las solicitudes
});

// Función para obtener el token
export const Validationuser = async (credentials) => {
  try {
    const { data } = await AuthApi.post("/", credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data; // Retorna solo los datos
  } catch (error) {
    console.error("Error al obtener el token:", error.response ? error.response.data : error.message);
    throw error;
  }
};
