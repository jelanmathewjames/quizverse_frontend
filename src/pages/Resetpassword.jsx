import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";


const Resetpassword= () => {
  const navigate = useNavigate();
  const [resetDetails, setResetDetails] = useState({
    email: "",
    newPassword: "",
    confirmPassword:"",
    otp:""
  });
  const [passwordEnable,setPasswordEnable] = useState(false);

  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setResetDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordReset = e => {
    const { name, value} = e.target;
  }
  const otpSubmit = async (otp) => {
    const response = await axiosInstance.post();
    if(response == true){
        setPasswordEnable(true);
    }
    setResetDetails({
      otp: "",
    });
  };

  const isOtpEntered = e => {
    const otp = e.target.value;
    if(otp.length === 6){
        otpSubmit(otp);
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] ">
        <form
            onClick={handlePasswordReset}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-10 bg-gray-900 border-2  backdrop-blur-md "
        >
          <h1 className="text-2xl text-center font-bold pb-3">Reset password</h1>
          <form ></form>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span    className="label-text text-white font-bold">email</span>
            </div>
            <input
             
             type="email"
             placeholder="Enter registered email"
             id="email"
             name="email"
             value={resetDetails.email}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span    className="label-text text-white font-bold">otp</span>
            </div>
            <input
             onChange={isOtpEntered}
             type="number"
             placeholder="Enter otp"
             id="otp"
             name="otp"
             value={resetDetails.otp}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
         
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span
                htmlFor="password"
                className="label-text text-white font-bold"
              >
                
              </span>
            </div>
            <input
              onChange={handleUserInputs}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={resetDetails.password}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span
                htmlFor="confirmPassword"
                className="label-text text-white font-bold"
              >
                
              </span>
            </div>
            <input
              onChange={handleUserInputs}
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              value={resetDetails.confirmPassword}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button className="btn btn-outline btn-info"> Reset Password</button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Resetpassword;
