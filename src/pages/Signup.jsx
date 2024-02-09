import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    userName: "",
    password: ""
  });

  const handleUserInputs = (e) => {
    const {name, value } = e.target;
    setSignupDetails((prevState) =>({
      ...prevState,[name]:value
    }));
  };
  const onFormSubmit = async (e) => {
    console.log(signupDetails);
    e.preventDefault();
    if (
      !signupDetails.email ||
      !signupDetails.userName ||
      !signupDetails.password
    ) {
      toast.error("Please fill all the details");
      return;
    }
    if (signupDetails.userName.length < 5) {
      toast.error("userName should be at least 5 characters");
      return;
    }
    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid Email ID");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      console.log(signupDetails.password);
      console.log(isValidPassword(signupDetails.password));
      toast.error(
        "Invalid Password,Password should be 6 to 16 character long with atleast a number and special character"
      );
      return;
    }
    const formData = new FormData();
    formData.append("userName",  signupDetails.userName);
    formData.append("email",   signupDetails.email);
    formData.append("password",  signupDetails.password);

    const response = await dispatch(createAccount(formData));
    console.log(response);
    if(response?.payload?.success){
      navigate("/dashboard");
    }
    setSignupDetails({
      email: "",
      userName: "",
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
            <label htmlFor="userName" className="text-white font-bold">
              UserName{" "}
            </label>
            <input
              onChange={handleUserInputs}
              type="text"
              placeholder="Enter userName"
              id="userName"
              name="userName"
              value={signupDetails.userName} 
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
