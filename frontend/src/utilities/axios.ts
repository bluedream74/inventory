import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false  // setting for cors
});

export default axiosApi;