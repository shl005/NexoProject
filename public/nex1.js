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


console.log("but:" ,google_btn);
async function google_handle(){
  console.log("waiting");
  try{
    const r= await signInWithPopup(auth, pr);
    console.log(r.user); 
    document.getElementById("form-box").style.display="none";
  
document.getElementById("Home").style.display="block";
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
      document.getElementById("Home").style.display="block";
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
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 6 characters long and contain at least one letter and one number.");
    e.preventDefault();
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


// DOM elements
const container = document.getElementById("cardContainer");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const googleBtn = document.getElementById("google-btn");
const loginSubmit = document.getElementById("submit");
const registerSubmit = document.getElementById("submited");
const switchToRegister = document.getElementById("si");
const switchToLogin = document.getElementById("lo");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Hide home page initially
document.getElementById("Home").style.display = "none";

// Form toggle functions
function showLogin(e) {
    if (e) e.preventDefault();
    container.classList.remove("flipped");
}

function showRegister(e) {
    if (e) e.preventDefault();
    container.classList.add("flipped");
}

// Password visibility toggle
function togglePassword(id) {
    const field = document.getElementById(id);
    const toggleBtn = field.nextElementSibling;
    
    if (field.type === "password") {
        field.type = "text";
        toggleBtn.textContent = "🔒";
    } else {
        field.type = "password";
        toggleBtn.textContent = "👁️";
    }
}

// Email validation
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Password validation
function isValidPassword(password) {
    return password.length >= 6;
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = "block";
    element.previousElementSibling.previousElementSibling.parentElement.classList.add("error");
}

// Clear error
function clearError(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = "none";
    element.previousElementSibling.previousElementSibling.parentElement.classList.remove("error");
}

// Show notification
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("bx-x");
});

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("bx-x");
    });
});

// Event Listeners
switchToLogin.addEventListener("click", showLogin);
loginBtn.addEventListener("click", showLogin);
switchToRegister.addEventListener("click", showRegister);
registerBtn.addEventListener("click", showRegister);

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Check if user has visited before
    if(localStorage.getItem("visited")) {
        document.getElementById("Home").innerHTML += 
            `<p class="last-visit">Welcome back! Your last visit was ${localStorage.getItem("lastVisit") || 'recently'}</p>`;
    } else {
        localStorage.setItem("visited", "true");
    }
    
    // Store last visit date
    localStorage.setItem("lastVisit", new Date().toLocaleDateString());
});

// Firebase Authentication Functions
async function handleGoogleSignIn(e) {
    e.preventDefault();
    
    try {
        showNotification("Signing in with Google...", "info");
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google sign-in success:", result.user);
        
        showNotification("Signed in successfully!");
        document.getElementById("form-box").style.display = "none";
        document.getElementById("Home").style.display = "block";
    } catch (error) {
        console.error("Google sign-in error:", error);
        showNotification(error.message, "error");
    }
}

async function handleEmailLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    // Clear previous errors
    clearError("loginEmailError");
    clearError("loginPasswordError");
    
    // Validate inputs
    if (!email) {
        showError("loginEmailError", "Email is required");
        return;
    }
    
    if (!isValidEmail(email)) {
        showError("loginEmailError", "Please enter a valid email");
        return;
    }
    
    if (!password) {
        showError("loginPasswordError", "Password is required");
        return;
    }
    
    try {
        showNotification("Signing in...", "info");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Email login success:", userCredential.user);
        
        showNotification("Logged in successfully!");
        document.getElementById("form-box").style.display = "none";
        document.getElementById("Home").style.display = "block";
        
        // Remember user if checkbox is checked
        if (document.getElementById("login-check").checked) {
            localStorage.setItem("rememberUser", "true");
        }
    } catch (error) {
        console.error("Email login error:", error);
        
        let errorMessage = "Login failed";
        switch (error.code) {
            case "auth/user-not-found":
                errorMessage = "No user found with this email";
                break;
            case "auth/wrong-password":
                errorMessage = "Incorrect password";
                break;
            case "auth/invalid-credential":
                errorMessage = "Invalid credentials";
                break;
            default:
                errorMessage = error.message;
        }
        
        showNotification(errorMessage, "error");
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    
    // Clear previous errors
    clearError("firstNameError");
    clearError("lastNameError");
    clearError("regEmailError");
    clearError("regPasswordError");
    
    // Validate inputs
    if (!firstName) {
        showError("firstNameError", "First name is required");
        return;
    }
    
    if (!lastName) {
        showError("lastNameError", "Last name is required");
        return;
    }
    
    if (!email) {
        showError("regEmailError", "Email is required");
        return;
    }
    
    if (!isValidEmail(email)) {
        showError("regEmailError", "Please enter a valid email");
        return;
    }
    
    if (!password) {
        showError("regPasswordError", "Password is required");
        return;
    }
    
    if (!isValidPassword(password)) {
        showError("regPasswordError", "Password must be at least 6 characters");
        return;
    }
    
    try {
        showNotification("Creating account...", "info");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registration success:", userCredential.user);
        
        showNotification("Account created successfully!");
        showLogin();
        document.getElementById("registerForm").reset();
    } catch (error) {
        console.error("Registration error:", error);
        
        let errorMessage = "Registration failed";
        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "Email already in use";
                break;
            case "auth/weak-password":
                errorMessage = "Password is too weak";
                break;
            default:
                errorMessage = error.message;
        }
        
        showNotification(errorMessage, "error");
    }
}

// Form submissions
document.getElementById("loginForm").addEventListener("submit", handleEmailLogin);
document.getElementById("registerForm").addEventListener("submit", handleRegister);
googleBtn.addEventListener("click", handleGoogleSignIn);

// Animation event listeners for debugging
container.addEventListener('transitionstart', () => {
    console.log('Flip animation started');
});

container.addEventListener('transitionend', () => {
    console.log('Flip animation completed');
});
