import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpWeUDIuwFpVRgDDu8Y5kEY_5gSGTBMPI",
  authDomain: "healthmate-2024.firebaseapp.com",
  projectId: "healthmate-2024",
  storageBucket: "healthmate-2024.appspot.com",
  messagingSenderId: "910719823538",
  appId: "1:910719823538:web:b2d376199c0acbc21ee3ab"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebase_app;