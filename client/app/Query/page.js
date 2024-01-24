"use client";
import CryptoJS from "crypto-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";

const Query = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const router = useRouter();

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
      
      const loaded_posts = loadedPosts.map((post) => (
        <section key={post.id}>
          <div className="font-pop shadow-lg border-2 border-gray-200 w-full p-4 mb-4 flex flex-row gap-4">
            <img
              className="rounded-full h-12 w-12"
              src={post.image}
              alt={post.username}
            />

            <div>
              <h2 className="text-blue-800 text-sm">{post.username}</h2>
              <p>{post.post}</p>
              <div className="flex flex-row justify-center items-center gap-4">
                {/* <input className="border-2 border-gray-300 h-6 w-[400px] mt-2" /> <button className="h-6 w-20 flex justify-center items-center text-xs ">Comment</button>  */}
              </div>
            </div>
          </div>
          <div></div>
        </section>
      ))

      setPosts(loaded_posts);
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
          { !posts ?
          
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
