import axios from 'axios';

// Determina la URL base dependiendo del entorno
const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

// Crea una instancia de Axios con la URL base
const ProductsApi = axios.create({
  baseURL: `${URL}/inventory/api/products/`,
});

// Interceptor para agregar el token de autenticación a las solicitudes
ProductsApi.interceptors.request.use(
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


const ProductsApiedit = axios.create({
  baseURL: `${URL}/inventory/api/products/edit/`,
});

// Interceptor para agregar el token de autenticación a las solicitudes
ProductsApiedit.interceptors.request.use(
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
export const getAllProducts = () => ProductsApi.get("/");

// Función para obtener un producto por su ID
export const getProducts = (id) => ProductsApiedit.get(`/${id}`);

// Función para crear un nuevo producto
export const createProducts = (productData) => ProductsApi.post("/", productData);

export const updateProduct = (id, Products) => ProductsApiedit.put(`/${id}/`, Products);

export const updateProductStock  = (id, Products) => ProductsApiedit.patch(`/${id}/`, Products);

// Función para eliminar un producto por su ID 
export const deleteProducts = (id) => ProductsApi.delete(`/${id}`);
