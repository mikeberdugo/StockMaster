// import axios from 'axios'

// export const getAllProducts = () => {
//     return axios.get('http://localhost:8000/inventory/api/products/')
    

// }

import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const ProductssApi = axios.create({
  baseURL: `${URL}/inventory/api/products/`,
});

export const getAllProducts = () => ProductssApi.get("/");

export const getProducts = (id) => ProductssApi.get(`/${id}`);

export const createProducts = (Products) => ProductssApi.post("/", Products);

export const updateProducts = (id, Products) => ProductssApi.put(`/${id}/`, Products);

export const deleteProducts = (id) => ProductssApi.delete(`/${id}`);


