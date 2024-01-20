"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/context/socketProvider';

const VideoConference = () => {

  const router = useRouter();
  
  const [email, setEmail] = useState("arya.bhattacharya@gmail.com");
  const [roomNumber, setRoomNumber] = useState("");

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
    <div className="flex justify-center items-center h-screen font-pop">
      
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
  );
};

export default VideoConference