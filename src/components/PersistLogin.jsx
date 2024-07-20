import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import Preloader from './PreLoader'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth, persist, refresh } = useAuth()

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false)
        return () => {
            isMounted = false
        }
    }, [isLoading])

    return <>{!persist ? <Outlet /> : isLoading ? <Preloader /> : <Outlet />}</>
}

export default PersistLogin
