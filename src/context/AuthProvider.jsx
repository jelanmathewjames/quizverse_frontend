import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../config/axiosInstance";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
  const navigate = useNavigate();
  const login = async (signinDetails, from) => {
    try{
      const response = await axiosInstance.post(
                          "/auth/login/",  
                          signinDetails,
                          { withCredentials: true }
                        );
      let userData = jwtDecode(response.data.access_token);
      setAuth({
        user: userData?.user,
        role: userData?.roles,
        access_token: response?.data?.access_token,
      });
      navigate(from, { replace: true });
      toast.success(
        "Successfully Logged In."
      );
    }
    catch (e) {
      toast.error(
        e.response.data.details
      );
    }
  }

  const refresh = async () => {
    if (!persist) return;
    const response = await axiosInstance.post(
        '/auth/refresh/',
        null,
        { withCredentials: true }
    );
    let userData = jwtDecode(response.data.access_token);
    setAuth({
      user: userData?.user, 
      role: userData?.roles, 
      access_token: response?.data?.access_token 
    })

    return response?.data?.access_token
  }

  return (
    <AuthContext.Provider value={{auth, setAuth, persist, setPersist, login, refresh}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};