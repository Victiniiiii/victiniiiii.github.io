import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, increment, getDoc, getDocs, collection, runTransaction, Timestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

const secondButton = document.getElementById("secondButton");
const thirdButton = document.getElementById("thirdButton");

secondButton.addEventListener("click", () => {
	if (secondButton.innerText == "Log in with Google") {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then(() => {
				const currentUser = auth.currentUser;
				const userId = currentUser.uid;
				const ref = doc(db, `users/${userId}/UserData/Nickname`);

				runTransaction(db, async (transaction) => {
					const userData = await transaction.get(ref);
					if (!userData.exists()) {
						transaction.set(ref, { Nickname: currentUser.displayName });
						console.log("Nickname set as", currentUser.displayName);
						nickname = currentUser.displayName;
					}
				});
			})
			.catch((error) => {
				console.error("Error during Google login:", error);
			});
	} else {
		signOut(auth)
			.then(() => {
				console.log("User signed out successfully");
			})
			.catch((error) => {
				console.error("Error signing out: ", error);
			});
	}
});

thirdButton.addEventListener("click", () => {
	if (auth.currentUser) {
		document.getElementById("changeUsernameModal").style.display = "block";
	} else {
		alert("You have to be logged in to change username!");
	}
});

async function changeNickname() {
	const ref = doc(db, `users/${auth.currentUser.uid}/UserData/Nickname`);

	await runTransaction(db, async (transaction) => {
		const userData = await transaction.get(ref);
		const input = document.getElementById("changeUsernameInput").value;
		const now = Date.now();

		if (badwords.some((badword) => input.toLowerCase().includes(badword))) {
			alert("Please do not use bad words 😭");
			return;
		}

		const lastNicknameChange = userData.exists() ? userData.data().lastNicknameChange?.toMillis() : null;

		if (lastNicknameChange && now - lastNicknameChange < nicknamecooldown) {
			const timeLeft = nicknamecooldown - (now - lastNicknameChange);
			alert(`Please wait ${(timeLeft / 1000 / 60).toFixed(1)} more minutes before changing your nickname again.`);
			return;
		}

		transaction.set(ref, {
			Nickname: input,
			lastNicknameChange: Timestamp.fromMillis(now),
		});

		window.document.getElementById("usernameHere").innerText = `Username: ${input}`;
		document.getElementById("changeUsernameModal").style.display = "none";
	});
}

onAuthStateChanged(auth, async (user) => {
	if (user) {
		const ref = doc(db, `users/${auth.currentUser.uid}/UserData/Nickname`);
		try {
			const docSnap = await getDoc(ref);
			if (docSnap.exists()) {
				nickname = docSnap.data().Nickname;
			} else {
				nickname = user.displayName;
			}
			window.document.getElementById("usernameHere").innerText = `Username: ${nickname}`;
			window.document.getElementById("secondButton").innerText = `Log Out`;
			calculateDistrictData();
			competitiveCheck();
		} catch (error) {
			console.error("Error fetching nickname from Firestore:", error);
		}
	} else {
		window.document.getElementById("usernameHere").innerText = `Anonymous`;
		window.document.getElementById("secondButton").innerText = `Log in with Google`;
	}
});

async function saveData(district, score) {
	if (auth.currentUser && selectedGameMode != "Custom") {
		const userId = auth.currentUser.uid;
		const ref = doc(db, `users/${userId}/GameData/${district}`);
		let ref2;
		if (selectedGameMode == "Every District") {
			ref2 = doc(db, `users/${userId}/GameData/Every District`);
		} else {
			ref2 = doc(db, `users/${userId}/GameData/${district}`);
		}

		try {
			await runTransaction(db, async (transaction) => {
				const userGameData = await transaction.get(ref);
				const userGameData2 = await transaction.get(ref2);

				if (!userGameData.exists()) {
					transaction.set(ref, { totalScore: score, highScore: score, roundCount: 1, playCount: 0 });
				} else {
					const data = userGameData.data();
					const highScore = data.highScore;

					if (totalPoints > highScore) {
						transaction.update(ref, { highScore: totalPoints });
					}

					transaction.update(ref, {
						totalScore: increment(score),
						roundCount: increment(1),
					});
				}

				if (selectedGameMode == "Every District") {
					if (!userGameData2.exists()) {
						transaction.set(ref2, { totalScore: score, highScore: score, roundCount: 1, playCount: 0 });
					} else {
						const data2 = userGameData2.data();
						const highScore2 = data2.highScore;

						if (totalPoints > highScore2) {
							transaction.update(ref2, { highScore: totalPoints });
						}

						transaction.update(ref2, {
							totalScore: increment(score),
							roundCount: increment(1),
						});
					}
				}

				if (roundCount == 5) {
					transaction.update(ref2, {
						playCount: increment(1),
					});
				}
			});
		} catch (error) {
			console.error("Transaction failed: ", error);
		}
	}
}

async function calculateDistrictData() {
	if (auth.currentUser) {
		const userId = auth.currentUser.uid;
		const gameDataRef = collection(db, `users/${userId}/GameData`);

		let totalRoundCount = 0;
		let totalScore = 0;
		let bestHighScore = 0;

		const snapshot = await getDocs(gameDataRef);
		snapshot.forEach((doc) => {
			const data = doc.data();
			const districtName = doc.id;

			if (districtName !== "Every District") {
				totalRoundCount += data.roundCount || 0;
				totalScore += data.totalScore || 0;
			}

			bestHighScore = Math.max(bestHighScore, data.highScore || 0);
		});

		document.getElementById("statsPlayedRounds").innerHTML = `Total Round Count: ${totalRoundCount}`;
		document.getElementById("statsPercentages").innerHTML = `Success Percentage: ${(totalScore / totalRoundCount / 10).toFixed(2)}%`;
		document.getElementById("statsHighScore").innerHTML = `Best High Score: ${bestHighScore}`;
	}
}

async function logStatistics() {
	if (auth.currentUser) {
		const userId = auth.currentUser.uid;
		const gameDataRef = collection(db, `users/${userId}/GameData`);
		const snapshot = await getDocs(gameDataRef);

		document.getElementById("statisticsMenuText").innerHTML = "";

		snapshot.forEach((doc) => {
			const data = doc.data();
			document.getElementById("statisticsMenuText").innerHTML += `<p> District: ${doc.id}, High Score: ${data.highScore}, Games Played: ${data.playCount}, Rounds Played: ${data.roundCount}, Success Percentage: ${(data.totalScore / data.roundCount / 10).toFixed(2)}</p>`;
		});
	} else {
		document.getElementById("statisticsMenuText").innerHTML = `<p> You need to be logged in to do this! </p>`;
	}
}

async function logLeaderboard() {
	const usersRef = collection(db, "users");
	const usersSnapshot = await getDocs(usersRef);
	const allHighScores = [];

	console.log("Fetching users...");

	for (const userDoc of usersSnapshot.docs) {
		const userId = userDoc.id;
		const gameDataRef = collection(db, `users/${userId}/GameData`);
		const gameDataSnapshot = await getDocs(gameDataRef);

		gameDataSnapshot.forEach((districtDoc) => {
			const highScore = districtDoc.data().highScore;

			console.log(`User: TODO, District: ${districtDoc.id}, High Score: ${highScore}`);

			if (highScore >= 4000) {
				allHighScores.push({
					district: districtDoc.id,
					highScore: highScore,
				});
			}
		});
	}

	const topHighScores = allHighScores.sort((a, b) => b.highScore - a.highScore).slice(0, 3);

	console.log("Top High Scores:");
	topHighScores.forEach((score, index) => {
		console.log(`Rank ${index + 1}: District: ${score.district}, High Score: ${score.highScore}`);
	});
}

async function logUserIds() {
    try {
        const usersCollection = collection(db, 'users'); // Change 'users' to your collection name if different
        const userSnapshot = await getDocs(usersCollection);
        
        userSnapshot.forEach((doc) => {
            console.log(doc.id); // Log the document ID (user ID)
        });
    } catch (error) {
        console.error("Error retrieving user IDs:", error);
    }
}

window.logUserIds = logUserIds
window.logLeaderboard = logLeaderboard;
window.logStatistics = logStatistics;
window.calculateDistrictData = calculateDistrictData;
window.saveData = saveData;
window.changeNickname = changeNickname;
