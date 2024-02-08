import collegeLogo from '../assets/images/college-logo.png';

import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

import React from "react";
import { Footer } from "react-daisyui";


const newDate = new Date();
const year = newDate.getFullYear();
const FooterNew = () => {
  return (
    <>
    
      
<Footer className="p-10 bg-neutral text-neutral-content" >
<div>
<svg width="60" height="60" viewBox="0  0  24  24" xmlns="" fillRule="evenodd" clipRule="evenodd" className="fill-current" style={{backgroundImage: `url(${collegeLogo})`, backgroundSize: 'cover'}}>
  <path d=""></path>
</svg>
  <p>
    College Of Engineering Adoor
    <br />
    Copyright {year} | All rights are reserved.
  </p>
</div>

<div>
  <Footer.Title>Social Media</Footer.Title>
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
</div>
<div>
  <Footer.Title>Pages</Footer.Title>
  <a className="link link-hover">About us</a>
  <a className="link link-hover">Contact</a>
  <a className="link link-hover">Jobs</a>
  <a className="link link-hover">Press kit</a>
</div>
<div>
  <Footer.Title>Legal</Footer.Title>
  <a className="link link-hover">Terms of use</a>
  <a className="link link-hover">Privacy policy</a>
  <a className="link link-hover">Cookie policy</a>
</div>
</Footer>

    </>
  );
};

export default FooterNew;

