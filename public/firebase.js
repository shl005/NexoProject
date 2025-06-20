

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import {getAuth ,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCWXxZH-I3OmVn7QegqUisFquA3Pn5FMQY",
  authDomain: "myproject-1-a4656.firebaseapp.com",
  projectId: "myproject-1-a4656",
  storageBucket: "myproject-1-a4656.firebasestorage.app",
  messagingSenderId: "325285282437",
  appId: "1:325285282437:web:6e1d4c49333e9b68f2dfec",
  measurementId: "G-8PXXSNRLE9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const pr=new GoogleAuthProvider();
export {auth, pr,app};