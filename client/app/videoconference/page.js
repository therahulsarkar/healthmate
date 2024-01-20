"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/context/socketProvider';

const VideoConference = () => {

  const router = useRouter();
  
  const [email, setEmail] = useState("arya.bhattacharya@gmail.com");
  const [roomNumber, setRoomNumber] = useState("");

  const rooms = [
    { id: 1, roomNumber: 1234, name:"Dr. ronit", dept:"Oncology"  },
    { id: 2, roomNumber: 5678 , name:"Dr. digan", dept:"Cardiology"},
  ];

  const socket = useSocket();

  const handleSubmitForm = useCallback((clickedRoomNumber) => (e) => {
    e.preventDefault();
    console.log("trying to connect:", { email, roomNumber: clickedRoomNumber });
    socket.emit("room:join",{email,roomNumber: clickedRoomNumber})
  }, [email,socket]);

  

  const handleJoinRoom = useCallback((data)=>{
    const {email, roomNumber} = data;
    router.push(`videoconference/room/${roomNumber}`)
    //console.log("routing to : ",roomNumber)
  }, [])
  
  
   useEffect(()=>{
    socket.on("room:join", handleJoinRoom);
    return ()=>{
      socket.off("room:join", handleJoinRoom)
    }
   }, [socket])

  return (
    <div className="flex justify-center items-center h-screen">
      
      {rooms.map((room) => (
        <form onSubmit={handleSubmitForm(room.roomNumber)}>
        <div
          key={room.id}
          className="max-w-xl mx-4 pe-10 bg-white shadow-lg rounded-md overflow-hidden my-4"
        >
          
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{room.name}</h2>
            <h2 className="text-l font-bold mb-2">dept : {room.dept}</h2>
            
            
            
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              value={room.roomNumber}
              onClick={() => setRoomNumber(room.roomNumber)}
              >
                give a call
              </button>
              
            
          </div>
          
        </div>
        </form>
       
      ))}
    </div>
  );
};

export default VideoConference