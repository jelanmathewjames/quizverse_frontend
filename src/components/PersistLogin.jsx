import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";

import useAuth from '../hooks/useAuth'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist, refresh } = useAuth();
    
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);
        return () => {
            isMounted = false;
        }
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin;