import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDoadv1iszuWKrEdAz_hBYsu9DJLJ932kE",
  authDomain: "fb-crud-react-a8f89.firebaseapp.com",
  projectId: "fb-crud-react-a8f89",
  storageBucket: "fb-crud-react-a8f89.appspot.com",
  messagingSenderId: "952792991136",
  appId: "1:952792991136:web:8d03d75c6dd4b48b0710c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Conexion a base de datos
export const db = getFirestore(app);