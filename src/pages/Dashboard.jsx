import { useContext } from "react";

import useAuth from "../hooks/useAuth";


const Dashboard = () => {
    const {auth} = useAuth();
    console.log(auth);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
