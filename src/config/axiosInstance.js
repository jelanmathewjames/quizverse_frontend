import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default axiosInstance;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
