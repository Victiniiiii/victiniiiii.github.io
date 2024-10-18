import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, increment, getDoc, runTransaction } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

const secondButton = document.getElementById('secondButton');
const thirdButton = document.getElementById('thirdButton');

secondButton.addEventListener('click', () => {
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
                        console.log("Nickname set as",currentUser.displayName);
                        nickname = currentUser.displayName
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

thirdButton.addEventListener('click', () => {
    const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) { 
        document.getElementById("changeUsernameModal").style.display = "block";
    } else {
        alert("You have to be logged in to change username!")
    }
});

function changeNickname() {
    runTransaction(db, async (transaction) => {
        const currentUser = auth.currentUser;
        const ref = doc(db, `users/${currentUser.uid}/UserData/Nickname`);
        const userData = await transaction.get(ref);
        const input = document.getElementById("changeUsernameInput").value;
        console.log("input:",input);
        if (badwords.some(badword => input.toLowerCase().includes(badword))) {
            alert("Please do not use bad words 😭")
            return;
        }   
        if (userData.exists()) {
            transaction.set(ref, { Nickname: input });
            console.log("Nickname set as", input);
            nickname = input;
        } else {
            transaction.set(ref, { Nickname: currentUser.displayName });
            console.log("Something broke");
            nickname = currentUser.displayName;
        }
    });
}

onAuthStateChanged(auth, (user) => {
	if (user) {
		if (user.isAnonymous) {
			window.document.getElementById("usernameHere").innerText = `Anonymous`;
            window.document.getElementById("secondButton").innerText = `Log in with Google`;
		} else {
            const ref = doc(db, `users/${auth.currentUser.uid}/UserData/Nickname`);
            const docSnap = getDoc(ref);
            if (docSnap.exists()) {
                nickname = docSnap.data().Nickname;
                window.document.getElementById("usernameHere").innerText = `Username: ${nickname}`;
                window.document.getElementById("secondButton").innerText = `Log Out`;
            } else {
                nickname = user.displayName;
                window.document.getElementById("usernameHere").innerText = `Username: ${nickname}`;
                window.document.getElementById("secondButton").innerText = `Log Out`;
            }            
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

async function saveData(district, score) {
	const currentUser = auth.currentUser;
	if (currentUser && !currentUser.isAnonymous) {
		const userId = currentUser.uid;
		const ref = doc(db, `users/${userId}/GameData/${district}`);
		const ref2 = doc(db, `users/${userId}/GameData/${selectedGameMode}`);

		try {
			await runTransaction(db, async (transaction) => {
				const userGameData = await transaction.get(ref);

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
			});
		} catch (error) {
			console.error("Transaction failed: ", error);
		}

		if (roundCount == 5) {
			try {
				await runTransaction(db, async (transaction) => {
					const userGameData = await transaction.get(ref2);

					if (!userGameData.exists()) {
						transaction.set(ref2, { playCount: 1 });
					} else {
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
}

window.saveData = saveData;
window.changeNickname = changeNickname;
