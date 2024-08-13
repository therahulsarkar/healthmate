"use client";
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import CryptoJS from "crypto-js";

const Features = () => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const ciphertext = localStorage.getItem('user');
        if (ciphertext) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            setUser(decryptedData);
        }
    }, []);
    return (

        <div class="flex justify-evenly gap-4 font-pop mb-[5rem] mx-4 flex-wrap">
            <div class="max-w-sm bg-white border-2 border-gray-100 rounded-lg shadow-2xl  ">
                <div class="max-w-sm   ">
                    <a href="#">
                        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text ">One-to-one
                                Video Conferencing
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Health Mate revolutionizes healthcare with one-to-one video conferences, offering patients personalized consultations from anywhere.</p>
                        {
                            user?.email === 'arya.bhattacharya.4622@gmail.com' ?
                                (<Link href="/videoconference/doc" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    go to doctor room
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>) :
                                (<Link href="/videoconference" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Explore
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>)
                        }
                    </div>
                </div>
            </div>
            <div class="max-w-sm bg-white border-2 border-gray-100 rounded-lg shadow-2xl  ">
                <div class="max-w-sm  ">
                    <a href="#">
                        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text ">Patient Query
                                System</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The Patient Query System in Health Mate empowers users to directly post health-related queries for timely responses from healthcare professionals</p>
                        <a href="/Query" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Explore
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            <div class="max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow-2xl  ">
                <div class="max-w-sm   ">
                    <a href="#">
                        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text ">AI-Powered ​ Diabetes Diagnosis
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">HealthMate's AI-Powered Diabetes Diagnosis employs machine learning model to predict potential diabetic conditions.</p>
                        <a href="AI/Diabetes" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Explore
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>



            <div class="max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow-2xl  ">
                <div class="max-w-sm   ">
                    <a href="#">
                        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text ">AI-Powered ​ Dementia Diagnosis
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">HealthMate's AI-Powered Dementia Diagnosis employs machine learning model to detect early signs of dementia.</p>
                        <a href="AI/Dementia" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Explore
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            <div class="max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow-2xl  ">
                <div class="max-w-sm   ">
                    <a href="#">
                        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-transparent bg-clip-text ">AI-Powered Kidney Diagnosis
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">HealthMate's AI-Powered Kidney Diagnosis employs machine learning model to predict chronic kidney disease.</p>
                        <a href="AI/Kidney" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Explore
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


        </div>




    )
}

export default Features