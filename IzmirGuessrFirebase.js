import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

async function incrementPlayCount(district) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = currentUser.uid;
		const Ref = doc(db, `users/${userId}/GameData/${district}`);

        await setDoc(Ref, { playCount: increment(1) }, { merge: true });
        console.log(`Incremented playCount by 1 for: ${district}`);
	}
}

async function increaseRoundCount(district) {
    const currentUser = auth.currentUser;
    if (currentUser && !currentUser.isAnonymous) {
        const userId = auth.currentUser.uid;
        const Ref = doc(db, `users/${userId}/GameData/${district}`);

        await setDoc(Ref, { roundCount: increment(1) }, { merge: true });
        console.log(`Incremented roundCount by 1 for: ${district}`);
    }
}

async function updateHighScore(district, score) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = auth.currentUser.uid;
		const Ref = doc(db, `users/${userId}/GameData/${district}`);

		const docSnap = await getDoc(Ref);

		if (docSnap.exists()) {
			const data = docSnap.data();
			const currentHighScore = data.highScore;
            console.log("currentHighScore",currentHighScore);

			if (score > currentHighScore) {
				await setDoc(Ref, { highScore: score }, { merge: true });
				console.log(`New high score for ${district}: ${score}!`);
			} else {
				console.log(`No update needed, current high score for ${district} is higher or equal: ${currentHighScore}`);
			}
		} else {
			await setDoc(Ref, { highScore: score }, { merge: true });
			console.log(`First high score set for ${district}: ${score}!`);
		}
	}
}

async function addToTotalScore(district, score) {
    const currentUser = auth.currentUser;
    if (currentUser && !currentUser.isAnonymous) {
        const userId = auth.currentUser.uid;
        const Ref = doc(db, `users/${userId}/GameData/${district}`);

        await setDoc(Ref, { totalScore: increment(score) }, { merge: true });
        console.log(`Total score for ${district} increased by ${score}`);
    }
}

// hepsi-tek ilçe ayrımına dikkat

window.incrementPlayCount = incrementPlayCount;
window.updateHighScore = updateHighScore;
window.increaseRoundCount = increaseRoundCount;
window.addToTotalScore = addToTotalScore;
