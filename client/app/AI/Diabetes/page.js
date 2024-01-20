import React from 'react'

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
      setVerdict("You have high diabetes")
    }
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
    setLoading(false)
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
    // <div>Diabetes</div>
    <>
      <div>
        <h6>High Blood Pressure</h6>
        <label htmlFor="highBp">Yes</label>
        <input type="radio" onChange={handleHighBP} value={1} name="highBp" id="" />
        <label htmlFor="highBp">No</label>
        <input type="radio" onChange={handleHighBP} value={0} name="highBp" id="" />
      </div>



      <div>
        <h6>High Cholestrol</h6>
        <label htmlFor="highCholstrl">Yes</label>
        <input type="radio" onChange={handleHighCholstrl} value={1} name="highCholstrl" id="" />
        <label htmlFor="highCholstrl">No</label>
        <input type="radio" onChange={handleHighCholstrl} value={0} name="highCholstrl" id="" />
      </div>


      <div>
        <h6>Have you checked in last 5 years?</h6>
        <label htmlFor="last5Cholstrl">Yes</label>
        <input type="radio" onChange={handleLast5Cholstrl} value={1} name="last5Cholstrl" id="" />
        <label htmlFor="last5Cholstrl">No</label>
        <input type="radio" onChange={handleLast5Cholstrl} value={0} name="last5Cholstrl" id="" />
      </div>


      <div>
        <h6>Body Mass Index</h6>
        <input onChange={handleBMI} type="number" />
      </div>

      <div>
        <h6>Have you smoked atleast five packets of ciggerate in your life?</h6>
        <label htmlFor="smoke">Yes</label>
        <input type="radio" name="smoke" value={1} onClick={setsmokedata}></input>
        <label htmlFor="smoke">No</label>
        <input type="radio" name="smoke" value={0} onClick={setsmokedata}></input>
      </div>

      <div>
        <h6>Have you had a stroke or not?</h6>
        <label htmlFor="stroke">Yes</label>
        <input type="radio" name="stroke" value={1} onClick={setstrokedata}></input>
        <label htmlFor="stroke">No</label>
        <input type="radio" name="stroke" value={0} onClick={setstrokedata}></input>
      </div>

      <div>
        <h6>Have you any heart disease?</h6>
        <label htmlFor="heart">Yes</label>
        <input type="radio" name="heart" value={1} onClick={setHeartdata}></input>
        <label htmlFor="heart">No</label>
        <input type="radio" name="heart" value={0} onClick={setHeartdata}></input>
      </div>

      <div>
        <h6>Have you done any physical activity without Your daily job or work?</h6>
        <label htmlFor="activity">Yes</label>
        <input type="radio" name="activity" value={1} onClick={setphysicaldata}></input>
        <label htmlFor="activity">No</label>
        <input type="radio" name="activity" value={0} onClick={setphysicaldata}></input>
      </div>

      <div>
        <h6>gender</h6>
        <label htmlFor="gender">Male</label>
        <input type="radio" name="gender" value={1} onClick={handleGender}></input>
        <label htmlFor="gender">Female</label>
        <input type="radio" name="gender" value={0} onClick={handleGender}></input>
      </div>

      <button onClick={handleData}>Check</button>
      <div className="output">
        {loading ? "loading..." : verdict}
      </div>
    </>
  )
}

export default Diabetes