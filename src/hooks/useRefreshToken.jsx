import axiosInstance from "../config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosInstance.post(
            '/auth/refresh/',
            { withCredentials : true}
        );
        let userData = jwtDecode(response.data.access_token);
        let authData = {
            user: userData?.user,
            role: userData?.role,
            acess_token: response?.data?.access_token
        }
        setAuth(prev => {
            return {...prev, authData}
        })
        return response?.data?.access_token
    }
    return refresh;
} 

export default useRefreshToken;