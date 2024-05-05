import { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Dashboard = () => {
    const {auth} = useAuth();
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/faculty">
            <button className="btn ">Faculty</button>
            </Link>
            <Link to="/student">
            <button className="btn ">Student</button>
            </Link>
        </div>
    );
}

export default Dashboard;
