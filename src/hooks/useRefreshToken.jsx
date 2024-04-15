import axiosInstance from "../config.axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = userAuth();

    const refresh = async () => {
        const response = await axiosInstance.post(
            '/auth/refresh/',
            { withCredentials : true}
        );
        setAuth(prev => {
            return {...prev, acess_token: response?.data?.access_token}
        })
        return response?.data?.access_token
    }
    return refresh;
} 

export default useRefreshToken;