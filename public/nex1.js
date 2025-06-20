import { auth,pr } from "./firebase.js";
import {signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"
const container = document.getElementById("cardContainer");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const google_btn=document.getElementById("google-btn");
const submit =document.getElementById("submit");
const si =document.getElementById("si");
const sub=document.getElementById("submited");
const lo=document.getElementById("lo");
document.getElementById("Home").style.display="none";
document.getElementById("navs").style.display="none";

console.log("but:" ,google_btn);
async function google_handle(){
  console.log("waiting");
  try{
    const r= await signInWithPopup(auth, pr);
    console.log(r.user); 
    
    document.getElementById("form-box").style.display="none";
  
// document.getElementById("Home").style.display="block";
// document.getElementById("navs").style.display="block";
window.location.href="home.html"
  }
  catch(err){
    console.log(err);
    alert(err.message);
  }
}
async function EmailAndPass(){
   const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try{
    const ru=await signInWithEmailAndPassword(auth,email,password);
    console.log(ru.user);
    if (ru){
      document.getElementById("form-box").style.display="none";
      // document.getElementById("Home").style.display="block";
      // document.getElementById("navs").style.display="block";
      window.location.href="home.html"
    }
  }
  catch(err){
    alert(err.message);
  }
}
async function cret() {
  const reem=document.getElementById("regEmail").value;
const pas=document.getElementById("regPassword").value;
  try{
const r=await createUserWithEmailAndPassword(auth,reem,pas);
if (r){
  
  showLogin();
}
  }
  catch(err){
    console.log(err)
    alert(err.message);
  }
  
}
lo.addEventListener("click",showLogin);
loginBtn.addEventListener("click",showLogin);
sub.addEventListener("click",cret);
  google_btn.addEventListener("click", google_handle);
  submit.addEventListener("click",EmailAndPass);
si.addEventListener("click",showRegister);
si.addEventListener("click",showRegister);
loginBtn.addEventListener("click", showLogin);
registerBtn.addEventListener("click", showRegister);
registerBtn.addEventListener("click",showRegister);
function showLogin() {
  container.classList.remove("active");
}
function showRegister() {
  container.classList.add("active");
}

function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

// Email validation function
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Register form validation
document.getElementById("registerForm").addEventListener("submit", function (e) {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
    return;
  }

 
});


document.getElementById("loginForm").addEventListener("submit", function (e) {
 const email = document.getElementById("loginEmail").value;
 const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill out both email and password.");
    e.preventDefault();
  } else if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
  }
});
