
import FooterNew from "../components/Footer";

import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

import React from "react";
import { Link } from "react-router-dom";

const HomeLayout = ({ children }) => {
    const changeWidth = () =>{
        const drawerSide  = document.getElementsByClassName('drawer-side')
        drawerSide[0].style.width = 'auto';
    }
    const hideDrawer = () =>{
        const element = document.getElementsByClassName('drawer-toggle'); 
        element[0].checked = false;
        const drawerSide  = document.getElementsByClassName('drawer-side')
        drawerSide[0].style.width = 0;
    }

    return (
    <>
      <div className=" min-h-[100vh]">
        <div className="drawer absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        <label htmlFor="my-drawer">
            <FiMenu onClick={changeWidth} size={"32px"} className="font-bold m-4"/>
        </label>
        </div>
        <div className="drawer-side w-0 ">
        <label htmlFor="my-drawer" className="drawer-overlay">
            <ul className="menu p-4 w-48 sm:w-80  bg-base-200 text-base-content relative">
                <li className="absolute w-fit right-2 z-50">
                    <button onClick={hideDrawer}> <AiFillCloseCircle size={24} /></button>
                </li>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/about"> About </Link></li>
                <li><Link to="/contact"> Contact us </Link></li>
                <li><Link to="/quiz"> quiz </Link></li>
                <li><Link to="/admin"> admin </Link></li>
            </ul>
        </label>
        </div>
        </div>
        {children}
      </div>
    
      <FooterNew />
    </>
  );
};

export default HomeLayout;
