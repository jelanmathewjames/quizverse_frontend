import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CheckAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ? allowedRoles?.length > 0
                ? auth?.roles?.find(role => allowedRoles.includes(role))
                    ? <Outlet />
                    : <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default CheckAuth;