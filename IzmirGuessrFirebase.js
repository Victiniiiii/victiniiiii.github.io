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
const docRef = db.collection('users').doc(userId).collection('GameData').doc(district);




        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const highScore = data.highScore;
                const playCount = data.playCount;
                const roundCount = data.roundCount;
                const totalScore = data.totalScore;
        
                console.log('High Score:', highScore);
                console.log('Play Count:', playCount);
                console.log('Round Count:', roundCount);
                console.log('Total Score:', totalScore);
            } else {
                console.log('No such document!');
            }
        }).catch((error) => {
            console.error('Error getting document:', error);
        });
        
/* 
		if (docSnap.exists()) {
			const data = docSnap.data();
            console.log("Document data:", data); // Debugging
			const currentHighScore = data?.highScore;

			if (typeof currentHighScore === 'undefined') {
				// High score does not exist yet, setting it for the first time
				console.log("High score field not found, setting it for the first time.");
				await setDoc(Ref, { highScore: score }, { merge: true });
				console.log(`First high score set for ${district}: ${score}!`);
			} else if (score > currentHighScore) {
				// Update the high score if the new score is greater
				await setDoc(Ref, { highScore: score }, { merge: true });
				console.log(`New high score for ${district}: ${score}!`);
			} else {
				console.log(`No update needed, current high score for ${district} is higher or equal: ${currentHighScore}`);
			}
		} else {
			// Document doesn't exist, create it with the high score field
			await setDoc(Ref, { highScore: score }, { merge: true });
			console.log(`First high score set for ${district}: ${score}!`);
		} */
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
