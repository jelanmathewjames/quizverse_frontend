import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const CheckAuth = ({ allowedRoles, requireAuth }) => {
    const { auth } = useAuth()
    const location = useLocation()

    return requireAuth ? (
        auth?.user ? (
            allowedRoles?.length > 0 ? (
                auth?.role?.find((role) => allowedRoles.includes(role)) ? (
                    <Outlet />
                ) : (
                    <Navigate
                        to="/unauthorized"
                        state={{ from: location }}
                        replace
                    />
                )
            ) : (
                <Outlet />
            )
        ) : (
            <Navigate to="/signin" state={{ from: location }} replace />
        )
    ) : auth?.user ? (
        <Navigate to="/dashboard" state={{ from: location }} replace />
    ) : (
        <Outlet />
    )
}

export default CheckAuth
