import  { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../config/axiosInstance";
import { isValidEmail, isValidPassword ,isValidUsername} from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";

const Signup = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    username: "",
    password: ""
  });
  
  const emailRef = useRef();
  // set focuss on email on page load
  useEffect(() => {
    emailRef.current.focus();
  }, []);

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
    if (!isValidEmail(signupDetails.email)) {
      toast.error("Invalid Email ID");
      return;
    }
    if (!isValidUsername(signupDetails.username)) {
      toast.error("username should be at least 5 characters");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Invalid Password,Password should be 6 to 16 character long with atleast a number and special character"
      );
      return;
    }
   
    try{
      setLoading(true);
      const response = await axiosInstance.post("/auth/register/", signupDetails);
      navigate("/signin");
      toast.success(
        "Account created successfully! Please verify your email.",{
          duration: 5000
        }
      );
      
    }
    catch(err){
      if(!err.response){
        toast.error("No server Response, Please try again later")
        return
      }else{
        toast.error(err.response.data.details)
        return
      }
    }
    finally{
      setLoading(false);
    }
    setSignupDetails({
      email: "",
      username: "",
      password: "",
    });

  };
  return (
    <HomeLayout>
      {
        loading && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#483eda]"></div>
        </div>
      }
      <div className="flex items-center justify-center h-[100vh] relative overflow-hidden ">
      <div className="absolute opacity-40 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
          <div className="absolute opacity-40 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
          <div className="absolute opacity-40 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div> 

        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-10   shadow-2xl 
          w-[80vw] sm:w-[410px]  border-2   backdrop-blur-md "
        >
          <h1 className="text-2xl text-center font-bold pb-3">SignUp</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className=" font-bold">
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
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className=" font-bold">
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
            <label htmlFor="password" className=" font-bold">
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
          <button className="btn btn-outline btn-active">Create account</button>
          <p className="text-center">
            already have an account ?{" "}
            <Link to="/signin" className="cursor-pointer ">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;