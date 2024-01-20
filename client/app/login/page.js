"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import firebase_app from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import CryptoJS from 'crypto-js';

const Login = () => {

  const notify = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  // Loading state
  const [loading, setLoading] = useState(false);
  const router = useRouter();


const googleProvider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

async function googleSignIn() {
    let result = null,
      error = null;
    try {
      result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
            const userData = {
                uid: result.user.uid,
                name: result.user.displayName,
                img: result.user.photoURL,
                email: result.user.email,
              };

            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userData), 'secret key 123').toString();
            localStorage.setItem('user', ciphertext);
            return true;
        } else {
          throw new Error("Access denied. Your email does not match xyz@gmail.com.");
        }
    } catch (e) {
      error = e;
    }
  
    return { result: false, error };
  }



  // Handle google sign in
  const googleClick = async (e) => {
    e.preventDefault();
    try {
      const { result, error } = await googleSignIn();
      if (error) {
        notify("Login failed, Please try again");
        return;
      } else {
        notifySuccess("Congratulations! 🎉 Your login was successful");
        return router.push("/");
      }
    } catch (error) {
      notify("Login failed, Please try again");
      return;
    }
  };

  return (
    <section
      className="bg-cover bg-no-repeat bg-center w-full"
    >
     
      <Toaster position="top-center" />

      <div className="container px-5 mx-auto py-10 flex font-pop justify-center mt-[5rem]">
        <div className="max-w-xl mt-0 mb-10 xl:px-8 pt-20 sm:pt-12">
          <div className="rounded-xl shadow-2xl p-7 sm:p-10 ">
            <h3 className="mb-2 text-2xl font-semibold text-center sm:mb-[2rem] sm:text-2xl text-blue-600 ">
              Sign In
            </h3>

            <form>
              <div className="mt-2 mb-2 sm:mb-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-lg border border-sky-500 text-gray-600"
                  onClick={googleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
