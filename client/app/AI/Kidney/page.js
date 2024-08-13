"use client"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import CryptoJS from 'crypto-js';
import { useRouter } from "next/navigation";
import { set } from 'firebase/database';

const Diabetes = () => {

  const [loading, setLoading] = useState(false)
  const [verdict, setVerdict] = useState("Your Verdict Here!!!")

  const [bp, setBp] = useState()
  const [albumin, setAlbumin] = useState()
  const [urea, setUrea] = useState()
  const [creatine, setCreatine] = useState()
  const [sodium, setSodium] = useState()
  const [potas, setPotas] = useState()
  const [haemoglobin, setHaemoglobin] = useState()
  const [wbc, setWbc] = useState()
  const [rbc, setRbc] = useState()
  const [hypertention, setHypertention] = useState()



  const url = "https://chronic-kidney-disease-pred.onrender.com/chronic-kidney"


  const router = useRouter();
  useEffect(() => {

    const ciphertext = localStorage.getItem("user");
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    } else {
      return router.push("/login")
    }
  }, []);


  const handlePrediction = (pred) => {
    console.log(pred)
    if (pred == 0) {
      setVerdict("You're safe but must take care of yourself!")

    } else {
      setVerdict("You have chronic disease. Consult a doctor!")

    }
  }




  const handleRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (
      !bp &&
      !albumin &&
      !urea &&
      !creatine &&
      !sodium &&
      !potas &&
      !haemoglobin &&
      !wbc &&
      !rbc &&
      !hypertention
    ) {
      alert("Please fill all the fields!")
      setLoading(false)
      return;
    }
    await axios.post(url, {
      //     "bp":76,
      //     "albumin":1,
      //     "urea":176.0,
      //     "creatinine": 13.8,
      //     "sodium":136.00,
      //     "potas":4.50,
      //     "haemo":8.6,
      //     "wbcc":13200,
      //     "rbcc":2.7,
      //     "hbp":1
      // }
      // {
      bp, albumin, urea, creatine, sodium, potas, haemoglobin, wbc, rbc, hypertention
    }
    ).then(res => {
      handlePrediction(res?.data?.class)
    })
    setLoading(false)
  }

  const handleBp = (e) => {
    setBp(e.target.value)
  }

  const handleAlbumin = (e) => {
    setAlbumin(e.target.value)
  }
  const handleUrea = (e) => {
    setUrea(e.target.value)
  }
  const handleCreatine = (e) => {
    setCreatine(e.target.value)
  }
  const handleSodium = (e) => {
    setSodium(e.target.value)
  }
  const handlePotas = (e) => {
    setPotas(e.target.value)
  }
  const handleHaemo = (e) => {
    setHaemoglobin(e.target.value)
  }
  const handleWbcc = (e) => {
    setWbc(e.target.value)
  }
  const handleRbcc = (e) => {
    setRbc(e.target.value)
  }
  const handleHypertention = (e) => {
    setHypertention(e.target.value)
  }



  return (
    <>

      <div className='max-w-full w-screen flex justify-center items-center font-pop bg-slate-100'>
        <div className='max-w-full bg-white px-10 py-6 font-bold mt-[100px] rounded-2xl shadow-xl mb-10'>

          <h1 className='font-semibold text-blue-700 text-4xl text-center m-10'>Diabetes Detection</h1>

          <div className='flex  justify-evenly gap-4 mb-8'>
            <div>
              <div className='text-sm'>Blood Pressure</div>
              <input value={bp} onChange={handleBp} type='number' className='bp rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 110 mmHg'></input>
            </div>
            <div>
              <div className='text-sm'>Albumin</div>
              <input value={albumin} onChange={handleAlbumin} type='number' className='albumin rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 4.0 g/dL'></input>
            </div>
          </div>

          <div className='flex justify-evenly gap-4 mb-8'>
            <div>
              <div className='text-sm'>Urea</div>
              <input value={urea} onChange={handleUrea} type='number' name='' className='urea rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 15 mg/dL'></input>
            </div>
            <div>
              <div className='text-sm'>Creatinine</div>
              <input value={creatine} onChange={handleCreatine} type='number' className='creatine rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 0.9 mg/dL'></input>
            </div>
          </div>

          <div className='flex justify-evenly gap-4 mb-8'>
            <div>
              <div className='text-sm'>Sodium</div>
              <input value={sodium} onChange={handleSodium} type='number' className='sodium rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 140 mEq/L'></input>
            </div>
            <div>
              <div className='text-sm'>Potassium</div>
              <input value={potas} onChange={handlePotas} type='number' className='potas rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 4.2 mmol/L'></input>
            </div>
          </div>

          <div className='flex justify-evenly gap-4 mb-8'>
            <div>
              <div className='text-sm'>Haemoglobin</div>
              <input value={haemoglobin} onChange={handleHaemo} type='number' className='haemoglobin rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 14.5 g/dL'></input>
            </div>
            <div>
              <div className='text-sm'>White Blood Cells</div>
              <input value={wbc} onChange={handleWbcc} type='number' className='wbc rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 8000 cells/μL'></input>
            </div>
          </div>

          <div className='flex justify-evenly items-start gap-4 mb-8'>
            <div className='w-[94%] ml-2'>
              <div className='text-sm'>Red Bllod Cells</div>
              <input value={rbc} onChange={handleRbcc} type='number' className='rbc rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='eg: 5.2 M cells/μL'></input>
            </div>
            <div className='w-full flex justify-center items-center'>
              <div className=''>
                <h6 className='text-sm mb-2'>Hypertention</h6>
                <div className='flex justify-evenly items-center'>
                  <div className='flex justify-evenly items-start'>
                    <label htmlFor="hypertention" className='font-medium text-lg'>Yes</label>
                    <input onChange={handleHypertention} type="radio" className='m-1 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 ' value={1} name="hypertention" id="" />
                  </div>
                  <div className='flex justify-evenly items-start'>
                    <label htmlFor="hypertention" className='ml-3 font-medium text-lg'>No</label>
                    <input onChange={handleHypertention} type="radio" className='m-1 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' value={0} name="hypertention" id="" />
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className='flex items-center justify-center'>
            <button onClick={handleRequest} className='w-[7rem] text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Check</button>
          </div>
          <div className="output text-md text-blue-600 m-5 text-center">
            {loading ? "loading..." : verdict}
          </div>

        </div>
      </div>
    </>
  )
}

export default Diabetes