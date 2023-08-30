import axios from "axios";

export const BACKEND_RUL = "http://localhost:8000";
export const BASE_URL = "http://118.27.15.130/api";


const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false  // setting for cors
});

export default axiosApi;