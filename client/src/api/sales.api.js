import axios from 'axios';

// Determina la URL base dependiendo del entorno
const URL =
  process.env.NODE_ENV === "sales"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

// Crea una instancia de Axios con la URL base
const SalesApi = axios.create({
    baseURL: `${URL}/inventory/api/sales/`,
});

// Interceptor para agregar el token de autenticación a las solicitudes
SalesApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token en el encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Función para obtener todos los productos
export const getAllSales = () => SalesApi.get("/");

// Función para crear un nuevo producto
export const createSale = (SalesData) => SalesApi.post("/", SalesData);
