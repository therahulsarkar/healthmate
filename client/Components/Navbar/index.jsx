"use client"
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebase_app from "../../firebase";
import Link from "next/link";
import Loader from "../Loader";

const Navbar = () => {
  const [user, setUser] = useState(null);
  
  const userAuth = localStorage.getItem('auth');
const auth = getAuth(firebase_app);

const router = useRouter();




useEffect(() => {
  
  router.refresh();

}, []);

const logout = async () => {
  try {
    console.log("logging out")
    await signOut(auth);
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    window.location.href="/"
    setUser(null);
   
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

  useEffect(() => {
    const ciphertext = localStorage.getItem('user');
    
    console.log(userAuth)
    
   
    console.log(ciphertext)
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData)
      setUser(decryptedData);

    }
    
  }, []);

  return (
    <>
    
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center  shadow-lg shadow-blue-100`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className=" w-full px-4">
            <a href="/" className="block w-full py-5 font-pop text-2xl px-4 font-semibold text-blue-800">
    Health Mate
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div className="text-black">
            </div>
            <div className=" sm:flex lg:pr-0">
             
            {user ? <div className="font-pop flex flex-row justify-center items-center gap-2">Welcome, {user?.name}
            <img className="rounded-full w-8 h-8" src={user?.img}/>
            
            <div onClick={logout} className="flex gap-1  flex-row bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-white p-1 justify-center items-center rounded-full px-2 cursor-pointer">Logout
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M312 372c-7.7 0-14 6.3-14 14 0 9.9-8.1 18-18 18H94c-9.9 0-18-8.1-18-18V126c0-9.9 8.1-18 18-18h186c9.9 0 18 8.1 18 18 0 7.7 6.3 14 14 14s14-6.3 14-14c0-25.4-20.6-46-46-46H94c-25.4 0-46 20.6-46 46v260c0 25.4 20.6 46 46 46h186c25.4 0 46-20.6 46-46 0-7.7-6.3-14-14-14z" fill="#fff"/><path d="M372.9 158.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-5.5 5.5-5.5 14.3 0 19.8l65.2 64.2H162c-7.7 0-14 6.3-14 14s6.3 14 14 14h256.6L355 334.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l82.6-82.4c4.3-4.3 6.5-9.3 6.5-14.7 0-5.3-2.3-10.3-6.5-14.5l-84.5-84.2z" fill="#fff"/></svg>
            </div>
            </div>
              :
              <Link
                href="/login"
                className="px-7 flex flex-row justify-center items-center py-1 gap-2 text-white rounded-full bg-gradient-to-r from-blue-700 via-sky-600 to-sky-700 text-base font-medium text-dark hover:text-primary "
              >
                Sign in <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>
              </Link>}
              
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};