import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";



const Signin = () => {
  const navigate = useNavigate();
  const [signinDetails, setSigninDetails] = useState({
    username_or_email: "",
    password: "",
  });

  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setSigninDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onFormSubmit = async (e) => {
    console.log(signinDetails);
    e.preventDefault();
    if (!signinDetails.username_or_email || !signinDetails.password) {
      toast.error("Please fill all the details");
      return;
    }
    
    try{
      const response = await axiosInstance.post("/auth/login/", signinDetails);
      window.localStorage.setItem('access',response.data.access_token);
      window.localStorage.setItem('refresh',response.data.refresh_token);
      navigate("/dashboard");
      toast.success(
        "Successfully Logged In."
      );
    }
    catch(e){
      toast.error(
        e.response.data.details
      );
    }
  
    setSigninDetails({
      username_or_email: "",
      password: "",
    });
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-10 bg-gray-900 border-2  backdrop-blur-md "
        >
          <h1 className="text-2xl text-center font-bold pb-3">SignIn</h1>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span    className="label-text text-white font-bold">user name</span>
            </div>
            <input
             onChange={handleUserInputs}
             type="text"
             placeholder="Enter user name"
             id="username_or_email"
             name="username_or_email"
             value={signinDetails.username_or_email}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span
                htmlFor="password"
                className="label-text text-white font-bold"
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
              <span className="label-text-alt"></span>
              <span className="label-text-alt">
                <Link
                  to="/resetPassword"
                  className="cursor-pointer text-accent"
                >
                  Forgot password ?
                </Link>
              </span>
            </div>
          </label>
          <button className="btn btn-outline btn-info">Login</button>
          <p className="text-center">
            Donot have an account ?{" "}
            <Link to="/signup" className="cursor-pointer text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signin;
