import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";

import HomeLayout from "../components/HomeLayout";
import axiosInstance from "../config/axiosInstance";
import { formVariants } from "../helpers/animationHelpers/formVariants";
import useAuth from "../hooks/useAuth";


const Signin = () => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || { pathname: "/dashboard" };
  const [loading, setLoading] = useState(false);
  const [signinDetails, setSigninDetails] = useState({
    username_or_email: "",
    password: "",
  });
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setSigninDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!signinDetails.username_or_email || !signinDetails.password) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
          "/auth/login/",  
          signinDetails,
          { withCredentials: true }
      );
     
      let userData = jwtDecode(response.data.access_token);
      setAuth(
        {
          user: userData?.user,
          role: userData?.role,
          access_token: response?.data?.access_token,
        }
      );
      navigate(from, { replace: true });
      toast.success(
        "Successfully Logged In."
      );
    }
    catch (e) {
      toast.error(
        e.response.data.details
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
      localStorage.setItem("persist", persist);
  }, [persist])
  
  return (
    <HomeLayout>
   
      <div className="flex items-center  justify-center h-[100vh] relative overflow-hidden ">
        <div className="absolute opacity-40 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
        <div className="absolute opacity-40 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
        <div className="absolute opacity-40 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div>

        <motion.form
          {...formVariants}
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg border-[1px]  p-10 backdrop-blur-md shadow-2xl 
          w-[80vw] sm:w-[410px] 
          "
        >
          <h1 className="text-2xl text-center font-bold pb-3">SignIn</h1>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">user name</span>
            </div>
            <input
              onChange={handleUserInputs}
              type="text"
              placeholder="Enter user name"
              id="username_or_email"
              name="username_or_email"
              value={signinDetails.username_or_email}
              className="input input-bordered w-full max-w-xs"
              ref={usernameRef}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span
                htmlFor="password"
                className="label-text  font-bold"
              >
                Password
              </span>
            </div>
            <input
              onChange={handleUserInputs}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={signinDetails.password}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">
                <input
                  type="checkbox"
                  id="persist"
                  checked={persist}
                  onChange={togglePersist}
                />
                <label htmlFor="stayLoggedIn" className="cursor-pointer">
                  Stay logged in
                </label>
                
              </span>
              <span className="label-text-alt">
                <Link
                  to="/resetPassword"
                  className="cursor-pointer "

                >
                  Forgot password ?
                </Link>
              </span>
            </div>
          </label>
          <button className="btn btn-outline btn-active">
            {
              loading?
              <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
              :"Login"
            }
          </button>
          <p className="text-center">
            Don&rsquo;t have an account ?{" "}
            <Link to="/signup" className="cursor-pointer ">
              Signup
            </Link>
          </p>
        </motion.form>
      </div>
    </HomeLayout>
  );
};

export default Signin;
