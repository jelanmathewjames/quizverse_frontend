import axiosInstance from "../config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth, persist} = useAuth();

    const refresh = async () => {
        if (!persist) return;
        const response = await axiosInstance.post(
            '/auth/refresh/',
            null,
            { withCredentials: true }
        );
        let userData = jwtDecode(response.data.access_token);
        setAuth(prev => {
            return { ...prev, 
                        user: userData?.user, 
                        role: userData?.role, 
                        access_token: response?.data?.access_token 
                    }
        })
        return response?.data?.access_token
    }
    return refresh;
}

export default useRefreshToken;