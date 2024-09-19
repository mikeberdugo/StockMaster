import axios from "axios";

const URL =
    process.env.NODE_ENV === "login"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const CreateuserApi = axios.create({
    baseURL: `${URL}/register/`,
});

export const Createuser = (User) => CreateuserApi.post("/",User);





