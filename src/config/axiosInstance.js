import axios from 'axios'

//BASE_URL have to be const, for the production build
let BASE_URL = ''
if (window.location.hostname === 'localhost') {
    BASE_URL = 'http://127.0.0.1:8000/api/v1'
} else {
    BASE_URL = 'https://quizverse1.azurewebsites.net/api/v1'
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

export default axiosInstance

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})
