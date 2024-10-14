import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

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
		if (user.isAnonymous) {
			window.document.getElementById("usernameHere").innerText = `Anonymous`;
		} else {
			window.document.getElementById("usernameHere").innerText = `Username: ${user.displayName}`;
		}
	} else {
		signInAnonymously(auth)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("Logged in anonymously:", user);
			})
			.catch((error) => {
				console.error("Error during anonymous login:", error);
			});
	}
});

function incrementPlayCount(district) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = currentUser.uid;
		const userPlayCountsRef = doc(db, `users/${userId}/playCounts/${district}`);

		getDoc(userPlayCountsRef).then((docSnapshot) => {
			const currentCount = docSnapshot.exists() ? docSnapshot.data().count : 0;
			setDoc(userPlayCountsRef, { count: currentCount + 1 }, { merge: true })
				.then(() => {
					console.log(`Play count for ${district} incremented successfully!`);
				})
				.catch((error) => {
					console.error(`Error incrementing play count for ${district}:`, error);
				});
		});
	}
}

function updateHighScore(district, score) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = auth.currentUser.uid;
		const userHighScore = doc(db, `users/${userId}/HighScores/${district}`);

		getDoc(userHighScore)
			.then((docSnapshot) => {
				const currentCount = docSnapshot.exists() ? docSnapshot.data().count : 0;
				if (!docSnapshot.exists() || currentCount < score) {
					setDoc(userHighScore, { count: score }, { merge: true })
						.then(() => {
							console.log(`Current High Score for ${district}:`, currentCount);
							console.log(`New Score Attempt:`, score);
							console.log(`High Score for ${district} updated successfully!`);
						})
						.catch((error) => {
							console.error(`Error updating high score for ${district}:`, error);
						});
				} else {
					console.log("High score not high enough");
				}
			})
			.catch((error) => {
				console.error(`Error retrieving high score for ${district}:`, error);
			});
	}
}

async function increaseRoundCount(district) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = auth.currentUser.uid;
		const Ref = doc(db, `users/${userId}/GameData/${district}`);

		await updateDoc(Ref, {
			playCount: increment(1),
		});
		console.log(`Incremented by 1: ${district}`);
	}
}

async function addToTotalScore(district, number) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = auth.currentUser.uid;
		const Ref = doc(db, `users/${userId}/GameData/${district}`);

		await updateDoc(Ref, {
			TotalScore: increment(number),
		});
		console.log(`Total score for ${district} increased by ${number}`);
	}
}

// game count, high score, round count, total score, hepsi-tek ilçe ayrımına dikkat

window.incrementPlayCount = incrementPlayCount;
window.updateHighScore = updateHighScore;
window.increaseRoundCount = increaseRoundCount;
window.addToTotalScore = addToTotalScore;
