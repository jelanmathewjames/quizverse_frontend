import PropTypes from "prop-types";
import { Children, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { MdWavingHand } from "react-icons/md";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";

import ThemeToggle from "../ThemeToggle";

const DashboardLayout = ({ navitems, children, title }) => {
  const [option, setOption] = useState(0);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
 }, [lastScrollTop]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-10 bg-base-100 lg:hidden shadow-lg transition-all duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className=" flex items-center justify-between py-4 px-6  ">
          <div className="flex items-center left-0 ">
            <button
              id="hamburger-menu"
              className="mr-4 p-2 lg:hidden"
              onClick={() => {
                const drawer = document.getElementById("my-drawer-2");
                drawer.checked = !drawer.checked;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold lg:hidden">QuizVerse</h1>
            
            <h1 className="text-2xl font-semibold ml-[300px] hidden lg:block">Hello  </h1>
            {/* <div className="m-3 ">{<MdWavingHand  size={30} />}  </div> */}
          </div>
          <ul className=" flex items-center  space-x-4">
           
            <ul className="items-center ">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className=" rounded-full ">
                  <PiChalkboardTeacherDuotone size={36} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  rounded-box w-52"
                >
                  <li>
                    <button onClick={()=> setOption(3) } className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={()=> setOption(5) }>Settings</button>
                  </li>
                  <li>
                    {/* add a logout functionality */}
                    <button > <span><AiOutlineLogout /></span>  Logout</button>
                  </li>
                </ul>
              </div>
            </ul>
          </ul>
        </div>
      </nav>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  flex flex-col bg-base-200 ">
          <div className="min-h-[85vh] mt-20 lg:mt-0 p-5">
            {Children.toArray(children)[option]}
          </div>
        </div>
        <div className="drawer-side z-20  ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100   text-base-content  border-base-300 ">
            {/* Sidebar content here */}
            <h1 className="text-3xl p-4 pb-0  font-bold">QuizVerse </h1>
            <span className=" m-3  mb-5 badge badge-ghost font-semibold ">{title}</span>
            {navitems.map((item, index) => (
              <li
                key={index}
                className= {` font-bold text-[16px] shadow-sm  rounded-lg mb-4 ${option === index? 'bg-base-300' : ''} `}
              >
                <button onClick={() => setOption(index)}> {item.name}</button>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

DashboardLayout.propTypes = {
  navitems: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;
