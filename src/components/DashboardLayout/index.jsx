import PropTypes from 'prop-types';

import NavItems from "../NavItems";

const DashboardLayout = ({ navitems, children, title }) => {

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="w-full navbar !bg-[#ffffff] shadow-lg z-49 ">
          <div className="flex-none lg:hidden ">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
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
          <div className="flex-1 px-2 mx-2">{title}</div>
          <div className="flex-none hidden lg:block">
            <NavItems className="menu menu-horizontal"  items={navitems}/>
          </div>
        </div>
        {/* Page content here */}
        <div className=" min-h-[100vh] mt-20">{children}</div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <NavItems className="menu p-4 w-80 min-h-full bg-base-200 " items={navitems}/>
      </div>
    </div>
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