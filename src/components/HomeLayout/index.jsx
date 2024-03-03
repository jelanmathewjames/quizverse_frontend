import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FooterNew from "../Footer";
import ThemeToggle from "../ThemeToggle";

const HomeLayout = ({ children }) => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar z-49">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2"></div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link to="/"> Home </Link>
                </li>
                <li>
                  <Link to="/about"> About </Link>
                </li>
                <li>
                  <Link to="/contact"> Contact us </Link>
                </li>
                <ThemeToggle />
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <div className=" min-h-[100vh]">{children}</div>
          <FooterNew />
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <ThemeToggle />
            <li className="mt-5">
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/about"> About </Link>
            </li>
            <li>
              <Link to="/contact"> Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default HomeLayout;
