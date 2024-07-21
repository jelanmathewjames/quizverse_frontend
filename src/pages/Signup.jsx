import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../components/HomeLayout'
import axiosInstance from '../config/axiosInstance'
import { formVariants } from '../helpers/animationHelpers/formVariants'
import {
    isValidEmail,
    isValidPassword,
    isValidUsername,
} from '../helpers/regexMatcher'

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [signupDetails, setSignupDetails] = useState({
        email: '',
        username: '',
        password: '',
    })

    const emailRef = useRef()
    // set focuss on email on page load
    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleUserInputs = (e) => {
        const { name, value } = e.target
        setSignupDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (
            !signupDetails.email ||
            !signupDetails.username ||
            !signupDetails.password
        ) {
            toast.error('Please fill all the details')
            return
        }
        if (!isValidEmail(signupDetails.email)) {
            toast.error('Invalid Email ID')
            return
        }
        if (!isValidUsername(signupDetails.username)) {
            toast.error('username should be at least 5 characters')
            return
        }
        if (!isValidPassword(signupDetails.password)) {
            toast.error(
                'Invalid Password,Password should be 6 to 16 character long with atleast a number and special character'
            )
            return
        }

        try {
            setLoading(true)
            await axiosInstance.post('/auth/register/', signupDetails)
            navigate('/signin')
            toast.success(
                'Account created successfully! Please verify your email.',
                {
                    duration: 5000,
                }
            )
        } catch (err) {
            if (!err.response) {
                toast.error('No server Response, Please try again later')
                return
            } else {
                toast.error(err.response.data.details)
                return
            }
        } finally {
            setLoading(false)
        }
        setSignupDetails({
            email: '',
            username: '',
            password: '',
        })
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] relative overflow-hidden ">
                <div className="absolute opacity-40 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
                <div className="absolute opacity-40 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
                <div className="absolute opacity-40 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div>

                <motion.form
                    {...formVariants}
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col justify-center gap-3 rounded-lg p-10   shadow-2xl 
          w-[80vw] sm:w-[410px]  border-2   backdrop-blur-md "
                >
                    <h1 className="text-2xl text-center font-bold pb-3">
                        SignUp
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className=" font-bold">
                            Email{' '}
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <span className="text-gray-400">
                                <MdEmail />{' '}
                            </span>
                            <input
                                type="text"
                                className="grow"
                                placeholder="name23@gmail.com"
                                onChange={handleUserInputs}
                                id="email"
                                name="email"
                                value={signupDetails.email}
                                ref={emailRef}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className=" font-bold">
                            username{' '}
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 text-gray-400"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                                onChange={handleUserInputs}
                                id="username"
                                name="username"
                                value={signupDetails.username}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className=" font-bold">
                            Password{' '}
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 text-gray-400"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                onChange={handleUserInputs}
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                value={signupDetails.password}
                            />
                        </label>
                    </div>
                    <button className="btn btn-outline btn-active">
                        {loading ? (
                            <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
                        ) : (
                            'Create account'
                        )}
                    </button>
                    <p className="text-center">
                        already have an account ?{' '}
                        <Link to="/signin" className="cursor-pointer ">
                            Login
                        </Link>
                    </p>
                </motion.form>
            </div>
        </HomeLayout>
    )
}

export default Signup
