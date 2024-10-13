// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCZF3dZgi6s9-rld7alzjlqw8fTOo7mW0g",
authDomain: "izmirguessrcompetitive.firebaseapp.com",
projectId: "izmirguessrcompetitive",
storageBucket: "izmirguessrcompetitive.appspot.com",
messagingSenderId: "139244678550",
appId: "1:139244678550:web:edbb8fa379e11439c801b7",
measurementId: "G-345W0ZZRY9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();

// Anonymous Login Function
function loginAnonymously() {
    auth.signInAnonymously()
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
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
    .then((result) => {
        const user = result.user;
        console.log("Logged in with Google:", user);
        // You can also save user data or track gameplay here
    })
    .catch((error) => {
        console.error("Error during Google login:", error);
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, you can use user.uid to identify the user
        console.log("User ID:", user.uid);
    } else {
        // User is signed out
        console.log("No user signed in.");
    }
});
