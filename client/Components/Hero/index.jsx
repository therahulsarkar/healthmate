"use client"
import React, { useState } from "react";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-white pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 font-pop text-3xl font-bold !leading-[1.208] text-dark  sm:text-[3rem]  bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text">
                Revitalize Your Health: Where Compassion Meets Cutting-Edge Care
                </h1>
                <p className="mb-8 font-pop max-w-[480px] text-lg text-gray-700 dark:text-dark-6">
                Experience compassionate care and expert guidance as we work together to enhance your well-being. Your health journey is our priority, ensuring a path to a healthier and happier life.
                </p>
             
 
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="/doctor.png"
                    alt="hero"
                    className="max-w-full lg:ml-auto "
                  />
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center  shadow-lg shadow-blue-100`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className=" w-full px-4">
            <a href="/#" className="block w-full py-5 font-pop text-2xl px-4 font-semibold text-blue-800">
    Health Mate
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div className="text-black">
              
              <nav
                id="navbarCollapse"
                
              >
                <ul className="block lg:flex text-black">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/#">Payment</ListItem>
                  <ListItem NavLink="/#">About</ListItem>
                  <ListItem NavLink="/#">Blog</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a
                href="/#"
                className="px-7 py-3  text-base font-medium text-dark hover:text-primary "
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
