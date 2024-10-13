import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; // Import Firestore functions

const firebaseConfig = {
	apiKey: "AIzaSyCZF3dZgi6s9-rld7alzjlqw8fTOo7mW0g",
	authDomain: "izmirguessrcompetitive.firebaseapp.com",
	projectId: "izmirguessrcompetitive",
	storageBucket: "izmirguessrcompetitive.appspot.com",
	messagingSenderId: "139244678550",
	appId: "1:139244678550:web:edbb8fa379e11439c801b7",
	measurementId: "G-345W0ZZRY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

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
		window.document.getElementById("usernameHere").innerText = `Username: ${user.uid}`;
	} else {
		window.document.getElementById("usernameHere").innerText = "Login pleeease"
	}
});

function incrementPlayCount(district) {
	const userId = auth.currentUser.uid;

	// Reference to the user's play counts in Firestore
	const userPlayCountsRef = doc(db, `users/${userId}/playCounts/${district}`);
	
	getDoc(userPlayCountsRef).then((docSnapshot) => {
		const currentCount = docSnapshot.exists() ? docSnapshot.data().count : 0;

		// Increment play count and update Firestore
		setDoc(userPlayCountsRef, { count: currentCount + 1 }, { merge: true })
			.then(() => {
				console.log(`Play count for ${district} incremented successfully!`);
			})
			.catch((error) => {
				console.error(`Error incrementing play count for ${district}:`, error);
			});
	});
}
