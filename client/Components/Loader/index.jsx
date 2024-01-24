"use client"

import React, { useEffect, useState } from "react";


import "./load.css"

const Loader = () =>{

   useEffect(()=>{

      document.body.style.overflow = "hidden";

      return () =>{
         document.body.style.overflow = "scroll";
      }

   })

   return(

<div className="loader_main">
   <div className="load">
       <img className="doctor" src="/doctor.gif"></img>
       <p className="font-pop grey-text">Fact of the day</p>
       <p className="text_design font-pop text-grey-600">Regular physical activity has numerous health benefits, including improved cardiovascular health, reduced risk of chronic diseases, and enhanced mental well-being</p>
   </div>
   <div className="footer_logo"> <a href="/#" className="block w-full py-5 font-pop text-2xl px-4 font-semibold text-blue-800">
    Health Mate
            </a></div>
</div>
   )

}

export default Loader;

