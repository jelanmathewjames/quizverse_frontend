import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

const newDate = new Date();
const year = newDate.getFullYear();
const Footer = () => {
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center  justify-between sm:px-20 text-white bg-gray-800">
        <section className="text-lg">
          Copyright {year} | All rights are reserved.
        </section>
        <section className="flex justify-center items-center text-2xl text-white gap-5">
          <a href="#" className="hover:text-blue-400 transition-all ease-in-out duration-500">
            <BsFacebook />
          </a>
          <a href="#" className="hover:text-blue-400 transition-all ease-in-out duration-500">
            <BsInstagram />
          </a>
          <a href="#" className="hover:text-blue-400 transition-all ease-in-out duration-500">
            <BsLinkedin />
          </a>
          <a href="#" className="hover:text-blue-400 transition-all ease-in-out duration-500">
            <BsTwitterX />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
