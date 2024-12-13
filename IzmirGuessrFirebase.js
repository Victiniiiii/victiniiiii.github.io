import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, addDoc, increment, getDoc, getDocs, collection, runTransaction, Timestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

		provider.setCustomParameters({
			prompt: "select_account",
		});

		signInWithPopup(auth, provider)
			.then(() => {
				const currentUser = auth.currentUser;
				const userId = currentUser.uid;
				const ref = doc(db, `users/${userId}`);

				runTransaction(db, async (transaction) => {
					const userData = await transaction.get(ref);
					console.log("test");
					if (!userData.exists()) {
						console.log("Nickname set as", currentUser.displayName);
						nickname = currentUser.displayName;
						transaction.set(ref, {
							Nickname: nickname,
						});
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
	const ref = doc(db, `users/${auth.currentUser.uid}`);

	await runTransaction(db, async (transaction) => {
		const userData = await transaction.get(ref);
		const input = document.getElementById("changeUsernameInput").value;
		const now = Date.now();

		if (input.length > 15) {
			alert("Please choose a shorter nickname. ( The limit is 15 because i said so )");
			return;
		}

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
		const ref = doc(db, `users/${auth.currentUser.uid}`);
		try {
			const docSnap = await getDoc(ref);
			if (docSnap.exists()) {
				nickname = docSnap.data().Nickname;
			} else {
				nickname = user.displayName;
				await runTransaction(db, async (transaction) => {
					console.log("Nickname set as", nickname);
					transaction.set(ref, {
						Nickname: nickname,
					});
				});
			}

			window.document.getElementById("usernameHere").innerText = `Username: ${nickname}`;
			window.document.getElementById("secondButton").innerText = `Log Out`;
			calculateDistrictData();
			competitiveCheck();
			logTopHighScores();
		} catch (error) {
			console.error("Error fetching nickname from Firestore:", error);
		}
	} else {
		window.document.getElementById("usernameHere").innerText = `Anonymous`;
		window.document.getElementById("secondButton").innerText = `Log in with Google`;
		competitiveCheck();
		logTopHighScores();
	}
});

async function saveData(district, score) {
	if (auth.currentUser) {
		const userId = auth.currentUser.uid;
		const ref = doc(db, `users/${userId}/GameData/${district}`);
		const ref2 = doc(db, `users/${userId}/GameData/${selectedGameMode}`);

		try {
			await runTransaction(db, async (transaction) => {
				const userGameData = await transaction.get(ref);
				const userGameData2 = await transaction.get(ref2);

				if (!userGameData.exists()) {
					transaction.set(ref, { totalScore: score, highScore: score, roundCount: 1, playCount: 0 });
				} else {
					const data = userGameData.data();
					const highScore = data.highScore;

					if (totalPoints > highScore && ref == ref2) {
						transaction.update(ref, { highScore: totalPoints });
					}

					transaction.update(ref, {
						totalScore: increment(score),
						roundCount: increment(1),
					});
				}

				if (ref != ref2) {
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

			if (districtName !== "Every District" && districtName !== "Custom") {
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

		const statisticsMenuText = document.getElementById("statisticsMenuText");
		statisticsMenuText.innerHTML = "";

		if (snapshot.empty) {
			statisticsMenuText.innerHTML = `<p>You haven’t played a competitive game yet!</p>`;
		} else {
			let documents = [];
			snapshot.forEach((doc) => {
				documents.push({ id: doc.id, data: doc.data() });
			});

			documents.sort((a, b) => a.id.localeCompare(b.id, "tr"));

			documents.forEach((doc) => {
				const data = doc.data;
				statisticsMenuText.innerHTML += `<p> District: ${doc.id}, High Score: ${data.highScore}, Games Played: ${data.playCount}, Rounds Played: ${data.roundCount}, Success Percentage: ${(data.totalScore / data.roundCount / 10).toFixed(2)}%</p>`;
			});
		}
	} else {
		document.getElementById("statisticsMenuText").innerHTML = `<p>You need to be logged in to do this!</p>`;
	}
}

async function logTopHighScores() {
	const usersRef = collection(db, "users");
	const usersSnapshot = await getDocs(usersRef);

	const allHighScores = new Map();

	for (const userDoc of usersSnapshot.docs) {
		const userId = userDoc.id;
		const username = userDoc.data().Nickname;
		const gameDataRef = collection(db, `users/${userId}/GameData`);
		const gameDataSnapshot = await getDocs(gameDataRef);

		gameDataSnapshot.forEach((districtDoc) => {
			const highScore = districtDoc.data().highScore;

			if (highScore >= 100) {
				if (!allHighScores.has(userId) || allHighScores.get(userId).highScore < highScore) {
					allHighScores.set(userId, {
						username: username,
						highScore: highScore,
					});
				}
			}
		});
	}

	document.getElementById("miniLeaderboard").innerHTML = `<h1>Leaderboard</h1>`;

	const topHighScores = Array.from(allHighScores.values())
		.sort((a, b) => b.highScore - a.highScore)
		.slice(0, 3);

	topHighScores.forEach((score, index) => {
		document.getElementById("miniLeaderboard").innerHTML += `<p>${index + 1}. ${score.username} - High Score: ${score.highScore}</p>`;
	});
}

async function leaderboardModal() {
	const usersRef = collection(db, "users");
	const usersSnapshot = await getDocs(usersRef);
	const allHighScores = new Map();
	const chosenDistrict = document.getElementById("izmirDistrictSelect").value;

	for (const userDoc of usersSnapshot.docs) {
		const userId = userDoc.id;
		const username = userDoc.data().Nickname;

		const gameDataRef = doc(db, `users/${userId}/GameData/${chosenDistrict}`);
		const gameDataSnapshot = await getDoc(gameDataRef);

		if (gameDataSnapshot.exists()) {
			const highScore = gameDataSnapshot.data().highScore;

			if (highScore >= 2500) {
				if (!allHighScores.has(userId) || allHighScores.get(userId).highScore < highScore) {
					allHighScores.set(userId, {
						username: username,
						highScore: highScore,
					});
				}
			}
		}
	}

	document.getElementById("modalHighScores").innerHTML = `<h1>Leaderboard</h1>`;

	const topHighScores = Array.from(allHighScores.values())
		.sort((a, b) => b.highScore - a.highScore)
		.slice(0, 10);

	if (topHighScores.length > 0) {
		topHighScores.forEach((score, index) => {
			document.getElementById("modalHighScores").innerHTML += `<p>${index + 1}. ${score.username} - High Score: ${score.highScore}</p>`;
		});
	} else {
		document.getElementById("modalHighScores").innerHTML = "Nobody has played on this district yet!";
	}
}

async function saveMatchHistory() {
	if (auth.currentUser) {
		const userId = auth.currentUser.uid;
        const d = new Date();
        const currentDate = (`${d.getDate().toString().padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`);

		await runTransaction(db, async (transaction) => {
            let endingScore = 0;
            let wastedTime = 0;

			for (let i = 0; i < roundLimit; i++) {
				const matchHistoryRoundRef = collection(db, `users/${userId}/MatchHistory/Round ${i+1}`);
				transaction.set(matchHistoryRoundRef, { score: roundPoints[i], time: roundTimes[i], coordinates: actualCoordinates[i] });
                endingScore += roundPoints[i];
                wastedTime += roundTimes[i];
			}

			const matchHistoryTotalRef = collection(db, `users/${userId}/MatchHistory/Total`);
			transaction.set(matchHistoryTotalRef, { date: currentDate, totalScore: endingScore, totalTime: wastedTime, gameMode: selectedGameMode });
		});
	}
}

window.leaderboardModal = leaderboardModal;
window.logTopHighScores = logTopHighScores;
window.logStatistics = logStatistics;
window.calculateDistrictData = calculateDistrictData;
window.saveData = saveData;
window.changeNickname = changeNickname;
window.saveMatchHistory = saveMatchHistory;
