import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'

import HomeLayout from '../components/HomeLayout'
import { formVariants } from '../helpers/animationHelpers/formVariants'
import useAuth from '../hooks/useAuth'

const Signin = () => {
    const { login, persist, setPersist } = useAuth()
    const location = useLocation()
    const from = location?.state?.from || { pathname: '/dashboard' }
    const [loading, setLoading] = useState(false)
    const [signinDetails, setSigninDetails] = useState({
        username_or_email: '',
        password: '',
    })
    const usernameRef = useRef()
    useEffect(() => {
        usernameRef.current.focus()
    }, [])
    const handleUserInputs = (e) => {
        const { name, value } = e.target
        setSigninDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (!signinDetails.username_or_email || !signinDetails.password) {
            toast.error('Please fill all the details')
            return
        }
        setLoading(true)
        await login(signinDetails, from)
        setLoading(false)
    }

    const togglePersist = () => {
        setPersist((prev) => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', persist)
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
                    <h1 className="text-2xl text-center font-bold pb-3">
                        SignIn
                    </h1>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-bold">
                                user name
                            </span>
                        </div>

                        <label className="input input-bordered flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 "
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username or email"
                                onChange={handleUserInputs}
                                id="username_or_email"
                                name="username_or_email"
                                value={signinDetails.username_or_email}
                                ref={usernameRef}
                            />
                        </label>
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

                        <label className="input input-bordered flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
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
                                value={signinDetails.password}
                            />
                        </label>

                        <div className="label">
                            <span className="label-text-alt">
                                <input
                                    type="checkbox"
                                    id="persist"
                                    checked={persist}
                                    onChange={togglePersist}
                                />
                                <label
                                    htmlFor="stayLoggedIn"
                                    className="cursor-pointer"
                                >
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
                        {loading ? (
                            <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <p className="text-center">
                        Don&rsquo;t have an account ?{' '}
                        <Link to="/signup" className="cursor-pointer ">
                            Signup
                        </Link>
                    </p>
                </motion.form>
            </div>
        </HomeLayout>
    )
}

export default Signin
