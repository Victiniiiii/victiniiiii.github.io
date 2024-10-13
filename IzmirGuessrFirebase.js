import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyCZF3dZgi6s9-rld7alzjlqw8fTOo7mW0g",
	authDomain: "izmirguessrcompetitive.firebaseapp.com",
	projectId: "izmirguessrcompetitive",
	storageBucket: "izmirguessrcompetitive.appspot.com",
	messagingSenderId: "139244678550",
	appId: "1:139244678550:web:edbb8fa379e11439c801b7",
	measurementId: "G-345W0ZZRY9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = firebase.firestore();

window.loginAnonymously = function () {
	signInAnonymously(auth)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("Logged in anonymously:", user);
		})
		.catch((error) => {
			console.error("Error during anonymous login:", error);
		});
};

window.loginWithGoogle = function () {
	const provider = new GoogleAuthProvider();

	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			console.log("Logged in with Google:", user);
		})
		.catch((error) => {
			console.error("Error during Google login:", error);
		});
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("User ID:", user.uid);
	} else {
		console.log("No user signed in.");
	}
});

function incrementPlayCount(district) {
    const userId = auth.currentUser.uid;
    const userPlayCountsRef = firebase.database().ref(`users/${userId}/playCounts/${district}`);
    userPlayCountsRef.transaction((currentCount) => {
        return (currentCount || 0) + 1; // If currentCount is null, start from 0
    })
    .then(() => {
        console.log(`Play count for ${district} incremented successfully!`);
    })
    .catch((error) => {
        console.error(`Error incrementing play count for ${district}:`, error);
    });
}
