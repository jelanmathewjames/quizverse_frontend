import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import axiosInstance from "../config/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleUserInputs = (e) => {
    const {name, value } = e.target;
    setSignupDetails((prevState) =>({
      ...prevState,[name]:value
    }));
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !signupDetails.email ||
      !signupDetails.username ||
      !signupDetails.password
    ) {
      toast.error("Please fill all the details");
      return;
    }
    if (signupDetails.username.length < 5) {
      toast.error("username should be at least 5 characters");
      return;
    }
    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid Email ID");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Invalid Password,Password should be 6 to 16 character long with atleast a number and special character"
      );
      return;
    }
   
    try{
      const response = await axiosInstance.post("/auth/register/", signupDetails);
      navigate("/signin");
      toast.success(
        "Account created successfully! Please verify your email."
      );
    }
    catch(e){
      toast.error(
        e.response.data.details
      );
    }
    setSignupDetails({
      email: "",
      username: "",
      password: "",
    });

  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-10  bg-gray-900 border-2   backdrop-blur-md "
        >
          <h1 className="text-2xl text-center font-bold pb-3">SignUp</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-white font-bold">
              Email{" "}
            </label>
            <input
              onChange={handleUserInputs}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={signupDetails.email}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-white font-bold">
              username{" "}
            </label>
            <input
              onChange={handleUserInputs}
              type="text"
              placeholder="Enter username"
              id="username"
              name="username"
              value={signupDetails.username} 
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-white font-bold">
              Password{" "}
            </label>
            <input
              onChange={handleUserInputs}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={signupDetails.password}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button className="btn btn-outline btn-info">Create account</button>
          <p className="text-center">
            already have an account ?{" "}
            <Link to="/signin" className="cursor-pointer text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
