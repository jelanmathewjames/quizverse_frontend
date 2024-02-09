import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidPassword } from "../helpers/regexMatcher";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signinDetails, setSigninDetails] = useState({
    userName: "",
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
    if (!signinDetails.userName || !signinDetails.password) {
      toast.error("Please fill all the details");
      return;
    }
    if (setSigninDetails.userName.length < 5) {
      toast.error("userName should be at least 5 characters");
      return;
    }
    if (!isValidPassword(signinDetails.password)) {
      console.log(signinDetails.password);
      console.log(isValidPassword(signinDetails.password));
      toast.error(
        "Invalid Password,Password should be 6 to 16 character long with atleast a number and special character"
      );
      return;
    }

    const response = await dispatch(login(signinDetails));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/dashboard");
    }
    setSigninDetails({
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
          className="flex flex-col justify-center gap-3 rounded-lg p-10 bg-blue-700  backdrop-blur-md "
        >
          <h1 className="text-2xl text-center font-bold pb-3">SignIn</h1>
{/* 
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
              value={signinDetails.userName}
              className="input input-bordered w-full max-w-xs"
            />
          </div> */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span    className="label-text text-white font-bold">userName</span>
            </div>
            <input
             onChange={handleUserInputs}
             type="text"
             placeholder="Enter userName"
             id="userName"
             name="userName"
             value={signinDetails.userName}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-white font-bold">
              Password{" "}
            </label>
            <input
              onChange={handleUserInputs}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={signinDetails.password}
              className="input input-bordered w-full max-w-xs"
            />
          </div> */}
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
