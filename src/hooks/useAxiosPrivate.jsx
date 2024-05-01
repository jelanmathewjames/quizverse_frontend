import { axiosPrivate } from '../config/axiosInstance';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers['Authorization'] = `${auth?.access_token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const access_token = await refresh();
                    originalRequest.headers['Authorization'] = `${access_token}`;
                    return axiosPrivate(originalRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate
}

export default useAxiosPrivate;