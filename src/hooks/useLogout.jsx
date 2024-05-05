import axiosInstance from "../config/axiosInstance";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        await axiosInstance.post(
            '/auth/logout/',
            null,
            { withCredentials : true}
        );
        setAuth(null);
    }
    return logout;
}

export default useLogout;