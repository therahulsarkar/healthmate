"use client";
import CryptoJS from "crypto-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import "./comment.css"

const Reply = (props) =>{
  const [reply_vis,setVisibility] = useState(null)
  function handleReplybar(id){

    if(reply_vis){
        document.getElementById("reply_bar_"+id).style.display = "none";
        setVisibility(null)  
    }
    else{
      document.getElementById("reply_bar_"+id).style.display = "block";
      setVisibility(1)
    }
   

  }
  return(
    <>

      <div className="comment_box">
        <div className="comment_head">
            <img
              className="rounded-full h-6 w-6"
              src={props.img}
              alt="Brandon Luke Williams"
            />
           <div>
            <h5 className="text-blue-800 text-sm">{props.user}</h5>
           <p className="text-size text-black-600 text-sm">
           Just another magical day in my world! Starting the day with a cup of positivity and a sprinkle of good vibes. ✨ Remember, you're amazing and capable of anything you set your mind to. 💪 Embrace the challenges, spread kindness, and make today awesome! 🚀✌️ #PositiveVibesOnly #MorningMotivation #BelieveInYourself
          </p>
          <button onClick={()=>{handleReplybar(props.id)}} style={{display:"flex",outline:'none',border:'none',background:'none',color:"black"}} className="text-sm">Reply </button>
          <div className="reply_bar" id={`reply_bar_${props.id}`}>
             <input className="w-[400px] mt-2" /> 
             <div className="reply_butts">
             <button onClick={()=>{handleReplybar(props.id)}} className="h-6 w-20 flex justify-center items-center text-xs">Cancel</button> 
             <button className="h-6 w-20 flex justify-center items-center text-xs bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700">Reply</button> 
             </div>
          </div>
           </div>
          
        </div>
        

      </div>
      
    </>
  )

}


const Comment = (props) =>{

  const [reply_vis,setVisibility] = useState(null)
  function handleReplyDisplay(id){
    const up = document.getElementById("up_"+id)
    const down = document.getElementById("down_"+id)
    if(up.style.display == "none"){
       document.getElementById(id).style.display = "block";
       up.style.display = "block";
       down.style.display = "none";
    }
    else{
      document.getElementById(id).style.display = "none";
      up.style.display = "none";
      down.style.display = "block";
    }

  }

  function handleReplybar(id){

    if(reply_vis){
        document.getElementById("reply_bar_"+id).style.display = "none";
        setVisibility(null)  
    }
    else{
      document.getElementById("reply_bar_"+id).style.display = "block";
      setVisibility(1)
    }
   

  }
  return(
    <>

      <div className="comment_box">
        <div className="comment_head">
            <img
              className="rounded-full h-6 w-6"
              src={props.img}
              alt="Brandon Luke Williams"
            />
           <div>
            <h5 className="text-blue-800 text-sm">{props.user}</h5>
           <p className="text-size text-black-600 text-sm">
           Just another magical day in my world! Starting the day with a cup of positivity and a sprinkle of good vibes. ✨ Remember, you're amazing and capable of anything you set your mind to. 💪 Embrace the challenges, spread kindness, and make today awesome! 🚀✌️ #PositiveVibesOnly #MorningMotivation #BelieveInYourself
          </p>

          <button onClick={()=>{handleReplybar(props.id)}} style={{display:"flex",outline:'none',border:'none',background:'none',color:"black"}} className="text-sm">Reply </button>
          <div className="reply_bar" id={`reply_bar_${props.id}`}>
             <input className="w-[400px] mt-2" /> 
             <div className="reply_butts">
             <button onClick={()=>{handleReplybar(props.id)}} className="h-6 w-20 flex justify-center items-center text-xs">Cancel</button> 
             <button className="h-6 w-20 flex justify-center items-center text-xs bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700">Reply</button> 
             </div>
          </div>
          
          <button onClick={()=>{handleReplyDisplay(props.id)}} style={{display:"flex",outline:'none',border:'none',background:'none'}} className="text-blue-800 text-sm">Replies <span   id={`down_${props.id}`}>&#8628;</span><span  style={{display:"none"}}  id={`up_${props.id}`}>&#8638;</span></button>
          <div style={{display:"none"}} id={props.id} className="replies">
                      <Reply 
                         img = {props.img}
                         user = {props.user}
                         id={1}
                        />
                         <Reply 
                         img = {props.img}
                         user = {props.user}
                         id={1}
                        />
                        <Reply 
                         img = {props.img}
                         user = {props.user}
                         id={1}
                        />
          </div>
           </div>
          
        </div>
        

      </div>
      
    </>
  )

}



const Query = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const router = useRouter();
 
  function handleCommentDisplay(id){
    const up = document.getElementById("up_"+id)
    const down = document.getElementById("down_"+id)
    if(up.style.display == "none"){
       document.getElementById(id).style.display = "block";
       up.style.display = "block";
       down.style.display = "none";
    }
    else{
      document.getElementById(id).style.display = "none";
      up.style.display = "none";
      down.style.display = "block";
    }

  }
   
  useEffect(() => {
    
    

    const ciphertext = localStorage.getItem("user");
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUser(decryptedData);
    } else{
      router.push("/login")
    }

    const db = getDatabase();
    const postsRef = ref(db, "posts/");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPosts = [];
      for (let id in data) {
        loadedPosts.push({
          id,
          ...data[id],
        });
      }
      const loaded_posts =loadedPosts.map((post,idx) => (
        <section key={post.id}>
          <div className="font-pop shadow-lg border-2 border-gray-200 w-full p-4 mb-4 flex flex-row gap-4">
            <img
              className="rounded-full h-12 w-12"
              src={post.image}
              alt={post.username}
            />

            <div>
              <h2 className="text-blue-800 text-sm">{post.username}</h2>
              <p className="max-w-xl">{post.post}</p>
              <div className="flex flex-row justify-center items-center gap-4">
                <input className="w-[400px] mt-2" /> <button className="h-6 w-20 flex justify-center items-center text-xs bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700">Comment</button> 
                  
                
              </div>
              <div className="comments_box">
              <button onClick={()=>{handleCommentDisplay(post.id)}} style={{display:"flex",outline:'none',border:'none',background:'none',color:'black'}} className="text-sm"> 2 Comments <span  id={`down_${post.id}`}>&#8628;</span><span style={{display:"none"}} id={`up_${post.id}`}>&#8638;</span></button>
                   <div style={{display:"none"}} id={post.id} className="comments">
                      <Comment 
                         img = {post.image}
                         user = {post.username}
                         id={`${post.id}_${idx}`}
                        />
                         <Comment 
                         img = {post.image}
                         user = {post.username}
                         id={`${post.id}_${idx}`}
                        />
                   </div>
              </div>
            </div>
          </div>
          
        </section>
      ))

      setPosts(loaded_posts)
    });
  }, []);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };
  const handleSubmit = async () => {
    // console.log(post);
    setLoading(true)
    const check_form = {
      description: post,
    };
    const check_descp = await axios.post(
      "https://speak-flask-text-api.onrender.com/simple",
      check_form
    );

    let descp = check_descp.data.message;
    console.log(descp.length);
    if (descp.length > 0) {
      document.querySelectorAll(".error")[0].style.display = "block";
      setLoading(false);
    } else {
      document.querySelectorAll(".error")[0].style.display = "none";
      // console.log(post)
      const newPost = {
        username: user?.name, // replace with actual username
        image: user?.img, // replace with actual image URL
        uid: user?.uid,
        timestamp: Date.now(),
        post: post,
      };

      try {
        // setLoading(true);
        const db = getDatabase();
        const postsRef = ref(db, "posts");
        const newPostRef = push(postsRef);
        const timestamp = new Date().toISOString();
        // Saving data
        await set(newPostRef, {
          ...newPost,
          id: newPostRef.key,
          timestamp,
        });
        toast.success("Your post has been added!");
        setPost("");
        setLoading(false)
        router.refresh();

      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  };
  return (
    <div className="cont font-pop">
      <Toaster />
      <div className="w-90">
        <div className=" pt-[100px] mb-8 ">
          <input
            value={post}
            onChange={handleInputChange}
            className=" border-2 border-blue-600 w-[700px] mr-4 rounded-full h-16 "
            type="text"
          />
          <button onClick={handleSubmit} className="submit_post bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700">
            {loading ? "Please wait.." : "Post"} 
          </button>
        </div>
        <div className="error font-pop">
          <p className="font-pop text-red-600 text-center mb-8">
            !!There are innappropriate words detected!!
          </p>
        </div>

        <div>
          {
            !posts?
            <Loader/>
            :
            <div>
            {posts}
            </div>
            

          }
        </div>
      </div>
    </div>
  );
};

export default Query;
