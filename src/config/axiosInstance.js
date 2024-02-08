import axios from "axios";

const BASE_URL = "http://localhost:5014/api";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 5000;
export default axiosInstance;