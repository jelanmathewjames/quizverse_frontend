import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";


const Dashboard = () => {
    const {auth} = useContext(AuthContext);
    console.log(auth);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
