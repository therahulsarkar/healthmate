"use client"

import React,{ useState } from 'react'
import axios from "axios"


const Query = () => {

  const [post, setPost] = useState('');

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };
  const handleSubmit = async () =>{
    console.log(post)

    const check_form = {
      "description" : post
    }
    const check_descp = await axios.post('https://speak-flask-text-api.onrender.com/simple',check_form)
    
    let descp = check_descp.data.message
    console.log(descp.length)
    if(descp.length >0)document.querySelectorAll(".error")[0].style.display = "block"
    else
    document.querySelectorAll(".error")[0].style.display = "none"

  }
  return (
    <div className="cont">

       <div className="w-90">
        <div className="submit-bar">
           <input value={post} onChange={handleInputChange} className="post_bar" type="text"/>
           <button onClick={handleSubmit} className="submit_post bg-blue-800">Post</button>
        </div>
        <div className="error font-pop">
            <p className="font-pop text-red-600">!!There are innappropriate words  detected!!</p>
        </div>
        
       </div>

    </div>
  )
}

export default Query