"use client"
import React, { useState } from 'react'
import axios from "axios"

const Diabetes = () => {

  const [Result, setResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [verdict, setVerdict] = useState("Your Verdict Here!!!")
  const [highBP, setHighBp] = useState()
  const [hgCholstrl, setHgCholstrl] = useState()
  const [last5Cholstrl, setLast5Cholstrl] = useState()
  const [bmi, setBmi] = useState()
  const [smokeInfo, setSmokeInfo] = useState();
  const [strokInfo, setStrokInfo] = useState();
  const [heartcond, setHeartCond] = useState();
  const [physactivity, setPhysactivity] = useState();
  const [gender, setGender] = useState();
  const url = "https://diabetes-api-j3ba.onrender.com/api"

  const checkVerdict = (value) => {
    if (value == 0) {
      setVerdict("You're Good and Safe")
    } else if (value == 1) {
      setVerdict("You're prone to Diabetes")
    } else {
      setVerdict("You have diabetes, go & consult to a doctor")
    }
    setLoading(false)
  }

  const handleData = async () => {
    setLoading(true)
    await axios.post(url, {
      hbp: highBP,
      hCholestrol: hgCholstrl,
      lst5chol: last5Cholstrl,
      bmi: bmi,
      data5: smokeInfo,
      data6: strokInfo,
      data7: heartcond,
      data8: physactivity,
      data9: gender,

    }).then((res) => {
      setResult(res)
      checkVerdict(Result?.data?.class)
    })
  }

  const handleHighBP = (e) => {
    setHighBp(e.target.value);
  }

  const handleHighCholstrl = (e) => {
    setHgCholstrl(e.target.value)
  }

  const handleLast5Cholstrl = (e) => {
    setLast5Cholstrl(e.target.value)
  }

  const handleBMI = (e) => {
    setBmi(e.target.value)
  }

  const setsmokedata = (e) => {
    setSmokeInfo(e.target.value);
    console.log(smokeInfo);
  }
  const setstrokedata = (e) => {
    setStrokInfo(e.target.value);

  }
  const setHeartdata = (e) => {
    setHeartCond(e.target.value);

  }
  const setphysicaldata = (e) => {
    setPhysactivity(e.target.value);
  }

  const handleGender = (e) => {
    setGender(e.target.value)
  }

  return (
<>

    <div className='max-w-full w-screen flex justify-center items-center font-pop bg-slate-100'>
      <div className='max-w-full  font-bold mt-[100px] rounded-2xl shadow-xl bg-white  mb-10'>
        <h1 className='font-semibold text-blue-700 text-4xl text-center m-10'>Diabetes Detection</h1>
        <div className='flex gap-4 '>
          <div className='m-10'>
            <h6 className='text-gray-700 font-pop'>High Blood Pressure</h6>
            <label htmlFor="highBp" className='font-normal'>Yes</label>
            <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' onChange={handleHighBP} value={1} name="highBp" id="" />
            <label htmlFor="highBp" className='ml-3 font-normal'>No</label>
            <input type="radio" onChange={handleHighBP} className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' value={0} name="highBp" id="" />
          </div>



          <div className='m-10'>
            <h6 className='text-gray-700'>High Cholestrol</h6>
            <label htmlFor="highCholstrl" className='font-normal'>Yes</label>
            <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' onChange={handleHighCholstrl} value={1} name="highCholstrl" id="" />
            <label htmlFor="highCholstrl" className='ml-3 font-normal'>No</label>
            <input type="radio" onChange={handleHighCholstrl} className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' value={0} name="highCholstrl" id="" />
          </div>
        </div>
        <div className='flex justify-center gap-1'>
          <div className='m-10'>
            <h6 className='text-gray-700'>Have you checked in last 5 years?</h6>
            <label htmlFor="last5Cholstrl" className='font-normal'>Yes</label>
            <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 ' onChange={handleLast5Cholstrl} value={1} name="last5Cholstrl" id="" />
            <label htmlFor="last5Cholstrl" className='ml-3 font-normal'>No</label>
            <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' onChange={handleLast5Cholstrl} value={0} name="last5Cholstrl" id="" />
          </div>


          <div className='m-10 font-bold'>
            <h6 className='text-gray-700'>Body Mass Index</h6>
            <input onChange={handleBMI} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="ex-58" type="number" />
          </div>
        </div>
        <div className='m-10'>
          <h6 className='text-gray-700'>Have you smoked atleast five packets of ciggerate in your life?</h6>
          <label htmlFor="smoke" className='font-normal'>Yes</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="smoke" value={1} onClick={setsmokedata}></input>
          <label htmlFor="smoke" className='ml-3 font-normal'>No</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="smoke" value={0} onClick={setsmokedata}></input>
        </div>

        <div className='m-10'>
          <h6 className='text-gray-700'>Have you had a stroke or not?</h6>
          <label htmlFor="stroke" className='font-normal'>Yes</label>
          <input type="radio" className='m-2' name="stroke" value={1} onClick={setstrokedata}></input>
          <label htmlFor="stroke" className='ml-3 font-normal'>No</label>
          <input type="radio" className='m-2' name="stroke" value={0} onClick={setstrokedata}></input>
        </div>

        <div className='m-10'>
          <h6 className='text-gray-700'>Have you any heart disease?</h6>
          <label htmlFor="heart" className='font-normal'>Yes</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="heart" value={1} onClick={setHeartdata}></input>
          <label htmlFor="heart" className='ml-3 font-normal'>No</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="heart" value={0} onClick={setHeartdata}></input>
        </div>

        <div className='m-10'>
          <h6 className='text-gray-700'>Have you done any physical activity without Your daily job or work?</h6>
          <label htmlFor="activity" className='font-normal'>Yes</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="activity" value={1} onClick={setphysicaldata}></input>
          <label htmlFor="activity" className='ml-3 font-normal'>No</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="activity" value={0} onClick={setphysicaldata}></input>
        </div>

        <div className='m-10'>
          <h6 className='text-gray-700'>gender</h6>
          <label htmlFor="gender" className='font-normal'>Male</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="gender" value={1} onClick={handleGender}></input>
          <label htmlFor="gender" className='ml-3 font-normal'>Female</label>
          <input type="radio" className='m-2 w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700' name="gender" value={0} onClick={handleGender}></input>
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={handleData} className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Check</button>
        </div>
        <div className="output text-2xl text-blue-600 m-5 text-center">
          {loading ? "loading..." : verdict}
        </div>

      </div>
    </div>
    </>
  )
}

export default Diabetes