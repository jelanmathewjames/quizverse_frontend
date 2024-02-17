
import FooterNew from "../components/Footer";

import React from "react";
import { Link } from "react-router-dom";

const HomeLayout = ({ children }) => {

    return (
    <>
      {/* <div className=" min-h-[100vh]"> */}
        {/* <div className="drawer absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        <label htmlFor="my-drawer">
            <FiMenu onClick={changeWidth} size={"32px"} className="font-bold m-4"/>
        </label>
        </div>
        <div className="drawer-side w-0 ">
        <label htmlFor="my-drawer" aria-label="close sidebar"  className="drawer-overlay">
            <ul className="menu h-[100vh] p-4 w-48 sm:w-80  bg-base-200 text-base-content relative">
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
        </div> */}
        
        {/* {children}

      </div>
      <FooterNew /> */}
      <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="w-full navbar z-49">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current rounded-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2"></div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/about"> About </Link></li>
                <li><Link to="/contact"> Contact us </Link></li>
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <div className=" min-h-[100vh]">
    {children}
    </div>
    <FooterNew />
 
  </div> 
  <div className="drawer-side z-50">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay">
    
    </label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
                <li className="mt-5"><Link to="/"> Home </Link></li>
                <li><Link to="/about"> About </Link></li>
                <li><Link to="/contact"> Contact</Link></li>
    </ul>
  </div>
</div>
    </>
  );
};

export default HomeLayout;
