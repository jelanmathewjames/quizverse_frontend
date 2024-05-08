import useAxiosPrivate  from "../hooks/useAxiosPrivate";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const logout = async () => {
        try {
            await axiosPrivate.post("/auth/logout/");
            localStorage.removeItem("persist");
            window.location.href = "/signin";
        } catch (e) {
            localStorage.removeItem("persist");
            window.location.href = "/signin"
        }
    };
    
    return logout;
}

export default useLogout;