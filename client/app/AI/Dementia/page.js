"use client"
import React, { useState,useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useRouter } from "next/navigation";
// import logo from './assets/logo.png'
const App = () => {
  const router = useRouter();
  useEffect(() => {
    const ciphertext = localStorage.getItem("user");
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    } else{
      return router.push("/login")
    }
  }, []);
  const [formData, setFormData] = useState({
    'M/F': '',
    'Age': '',  
    'EDUC': '',
    'SES': '',
    'MMSE': '',
    'eTIV': '',
    'nWBV': '',
    'ASF': '',
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [colorImage, setColorImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    // Check if all fields are filled
    const isAnyFieldEmpty = Object.values(formData).some((value) => value === '');
    if (isAnyFieldEmpty) {
      alert('Please fill in all fields');
      return false;
    }

    const isAnyFieldNotNumeric = Object.values(formData).some(
    (value) => isNaN(Number(value))
  );
  if (isAnyFieldNotNumeric) {
    alert('Please enter numeric values only');
    return false;
  }

    return true;
  };

   const fillRandomData = () => {
    const getRandomNumberInRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    setFormData({
      'M/F': getRandomNumberInRange(0, 1).toString(),
      'Age': getRandomNumberInRange(1, 100).toString(),
      'EDUC': getRandomNumberInRange(0, 30).toString(),
      'SES': getRandomNumberInRange(1, 5).toString(),
      'MMSE': getRandomNumberInRange(22, 30).toString(),
      'eTIV': getRandomNumberInRange(600, 2000).toString(),
      'nWBV': (Math.random() * (0.9 - 0.6) + 0.6).toFixed(2).toString(),
      'ASF': (Math.random() * (1.5 - 0.5) + 0.5).toFixed(2).toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }
   document.getElementById("load").style.display = "block";

  
    try {
      const numericFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );

      const response = await fetch('https://dementia-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setPredictionResult(result);
      setColorImage(result.probability > 0.5);
      document.getElementById("load").style.display = "none";
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const imageStyle = {
    filter: colorImage ? 'none' : 'grayscale(100%)',
    borderRadius: '5px',
  };

  const textStyle = {
    color: colorImage ? 'red' : 'green',
  };

  return (
  <div>
    
   
      <div className = "navbar">
      <p className='text-blue-600 font-pop'>Empowering Tomorrow: Your Ally in Alzheimer's Prediction and Prevention.</p>

      </div>
    <div className="prediction-container font-pop">
      <div className="prediction-form-container font-pop">
        <h2>AI Alzheimer's Prediction </h2>
        <form className="prediction-form font-pop" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="input-container font-pop" key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
          <button className='bg-gradient-to-r from-blue-700 to-sky-600 font-pop' type="submit">Predict</button>
           <button className='bg-gradient-to-r from-blue-700 to-sky-600 font-pop' type="button" onClick={fillRandomData}>
              Fill Random Data
            </button>
        </form>

        
      </div>

      <div className={`image-container`}>
      
        <img
          src="/brain.png"
          alt="Prediction Result"
          style={imageStyle} 
        />
        {predictionResult && (
          <div className="result">
            
            <p id="prob">Probability of developing Alzheimer's : <span style={textStyle}> {(predictionResult.probability * 100).toFixed(2)}%</span></p>
          </div>
        )}
        <h2 id="load" className="text-blue-600 font-pop">Loading....</h2>
      </div>
    </div>
    <div className="disclaimer font-pop">

      <p>

Disclaimer:

The predictions provided by this Alzheimer's prediction model are based on a machine learning algorithm trained on a limited dataset. It is essential to understand that the model's accuracy and reliability may vary, and the predictions should not be considered as a definitive diagnosis.</p>
    <p>For queries contact <a  href="mailto:therahulsarkar@gmail.com"> Rahul</a></p>
    </div>
    <div className="info font-pop">
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>M/F</td>
            <td>Gender: 0 for Female, 1 for Male</td>
        </tr>
        <tr>
            <td>Age</td>
            <td>Age of the individual</td>
        </tr>
        <tr>
            <td>EDUC</td>
            <td>Years of Education</td>
        </tr>
        <tr>
            <td>SES</td>
            <td>Socioeconomic status as assessed by the Hollingshead Index of Social Position and classified into categories from 1 (highest status) to 5 (lowest status)</td>
        </tr>
        <tr>
            <td>MMSE</td>
            <td>Mini-Mental State Examination score (range is from 0 [worst] to 30 [best]) (Folstein, Folstein, & McHugh, 1975)</td>
        </tr>
        <tr>
            <td>eTIV</td>
            <td>Estimated Total Intracranial Volume</td>
        </tr>
        <tr>
            <td>nWBV</td>
            <td>Normalized Whole Brain Volume</td>
        </tr>
        <tr>
            <td>ASF</td>
            <td>Atlas Scaling Factor</td>
        </tr>
    </table>
    </div>
    </div>
  );
};

export default App;