"use client";
import { useSocket } from "@/context/socketProvider"
import { useEffect, useCallback, useState } from "react";
import peer from "@/service/peer";
import ReactPlayer from "react-player";

export default function rooms(){

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemoteStream] = useState();
    
    const handleUserJoined = useCallback(({email, id})=> {
        console.log(`email ${email} joined room`)
        setRemoteSocketId(id)
    }, [])


    const handleCallUser = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio : true,
            video : true,
        })
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream)
    },[remoteSocketId, socket])



    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
          setRemoteSocketId(from);
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          setMyStream(stream);
          console.log(`Incoming Call`, from, offer);
          const ans = await peer.getAnswer(offer);
          socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
      );


      const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
          peer.peer.addTrack(track, myStream);
        }
      }, [myStream]);


      const handleCallAccepted = useCallback(
        ({ from, ans }) => {
          peer.setLocalDescription(ans);
          console.log("Call Accepted!");
          sendStreams();
        },
        [sendStreams]
      );


      const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
      }, [remoteSocketId, socket]);

      
    


      useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
          peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
      }, [handleNegoNeeded]);


      const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
          const ans = await peer.getAnswer(offer);
          socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
      );
    
      const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
      }, []);




      useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
          const remoteStream = ev.streams;
          console.log("GOT TRACKS!!");
          setRemoteStream(remoteStream[0]);
        });
      }, []);


    useEffect(()=>{
        socket.on('user:joined', handleUserJoined)
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        return ()=>{
            socket.off('user:joined', handleUserJoined)
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        }
    }, [socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,])

    return(
        <div className="flex flex-col items-center justify-center min-w-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">Rooms</h1>
      <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>

      <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0">
        {myStream && (
          <div className="md:mr-4">
            <h2 className="text-xl font-bold mb-2">My Stream</h2>
            <ReactPlayer
              playing
              muted
              height="100%"
              width="100%"
              style={{ borderRadius: '8px' }} // Add some border radius for styling
              url={myStream}
            />
          </div>
        )}

        {remoteStream && (
          <div>
            <h2 className="text-xl font-bold mb-2">Remote Stream</h2>
            <ReactPlayer
              playing
              muted
              height="100%"
              width="100%"
              style={{ borderRadius: '8px' }}
              url={remoteStream}
            />
          </div>
        )}
      </div>

      <div className="flex mt-8 space-x-4">
        {myStream && (
          <button
            onClick={sendStreams}
            className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Stream
          </button>
        )}
        {remoteSocketId && (
          <button
            onClick={handleCallUser}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            CALL
          </button>
        )}
      </div>
    </div>
    )
}