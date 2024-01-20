"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/context/socketProvider';
import CryptoJS from "crypto-js";
import Link from 'next/link';

const VideoConference = () => {

  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [user, setUser] = useState(null);


    useEffect(() => {
        const ciphertext = localStorage.getItem('user');
        if (ciphertext) {
          const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          setEmail(decryptedData.email);
          setUser(decryptedData);

        }
      }, []);

  //hard coded doctors
  const rooms = [
    { id: 1, roomNumber: 1234, name:"Dr. Ronit Das", dept:"Oncology"  },
    { id: 2, roomNumber: 5678 , name:"Dr. Diganta Biswas", dept:"Cardiology"},
  ];

  const socket = useSocket();

  const handleSubmitForm = useCallback((clickedRoomNumber) => (e) => {
    e.preventDefault();
    console.log("trying to connect:", { email, roomNumber: clickedRoomNumber });
    socket.emit("room:join",{email,roomNumber: clickedRoomNumber})
  }, [email,socket]);

  

  const handleJoinRoom = useCallback((data)=>{
    const {email, roomNumber} = data;
    if(localStorage.getItem("type")=="pat")
      router.push(`videoconference/room/${roomNumber}`)
    else
    router.push(`videoconference/doc`)
    //console.log("routing to : ",roomNumber)
  }, [])
  
  
   useEffect(()=>{
    socket.on("room:join", handleJoinRoom);
    return ()=>{
      socket.off("room:join", handleJoinRoom)
    }
   }, [socket])

  return (
    <div>
      {user?(
        <div className="flex justify-center items-center h-screen font-pop w-screen m-w-screen">
      
        {rooms.map((room) => (
          <form onSubmit={handleSubmitForm(room.roomNumber)}>
  
          <section key={room.id} className="text-gray-600 body-font ">
        <div className="container px-2 mx-auto">
          <div className="">
            <div className="">
              <div className="flex border-2  rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col shadow-xl">
                <div className="w-20 h-20 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                 <img className="overflow-hidden" src="/doctor-dp.png"/>
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-1">{room.name}</h2>
                  <p className="leading-relaxed text-base mb-2">Depatment: {room.dept}</p>
                  <button
                className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700"
                value={room.roomNumber}
                onClick={() => setRoomNumber(room.roomNumber)}
                >
                  give a call
                </button>
  
                </div>
              </div>
            </div>
           
     
          </div>
        </div>
      </section>
          </form>
         
        ))}
      </div>
      ):
      (
        <div className="flex flex-col items-center justify-center w-screen m-w-screen">
          <h1 className="text-3xl font-bold mb-4">Error: You are not logged in</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please log in to access this page.
          </p>
          <Link href="/" className="text-blue-500 hover:underline">
            go to home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoConference