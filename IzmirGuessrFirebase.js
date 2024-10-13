// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZF3dZgi6s9-rld7alzjlqw8fTOo7mW0g",
    authDomain: "izmirguessrcompetitive.firebaseapp.com",
    projectId: "izmirguessrcompetitive",
    storageBucket: "izmirguessrcompetitive.appspot.com",
    messagingSenderId: "139244678550",
    appId: "1:139244678550:web:edbb8fa379e11439c801b7",
    measurementId: "G-345W0ZZRY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Use getAuth to get the auth instance

// Anonymous Login Function
function loginAnonymously() {
    signInAnonymously(auth)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in anonymously:", user);
        // You can also save user data or track gameplay here
    })
    .catch((error) => {
        console.error("Error during anonymous login:", error);
    });
}

// Google Login Function
function loginWithGoogle() {
    const provider = new GoogleAuthProvider(); // Use GoogleAuthProvider from the imports

    signInWithPopup(auth, provider) // Use signInWithPopup with the auth instance
    .then((result) => {
        const user = result.user;
        console.log("Logged in with Google:", user);
        // You can also save user data or track gameplay here
    })
    .catch((error) => {
        console.error("Error during Google login:", error);
    });
}

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can use user.uid to identify the user
        console.log("User ID:", user.uid);
    } else {
        // User is signed out
        console.log("No user signed in.");
    }
});
