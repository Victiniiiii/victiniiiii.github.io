let checks = [true, true, true, true];
let theButton = document.getElementById("checkAll");
let children = document.querySelectorAll("#passwordSettings > div");

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?`~\\/-=";

function checkCheckboxes() {
	children.forEach((child, index) => {
		child.innerHTML.includes("✔") ? (checks[index - 1] = true) : (checks[index - 1] = false);
		if (index === 0) {
			child.style.backgroundColor = "";
			child.onmouseover = null;
			child.onmouseout = null;
		} else {
			const isChecked = checks[index - 1];
			child.style.backgroundColor = isChecked ? "rgba(0,250,0,0.2)" : "rgba(250,0,0,0.2)";

			child.onmouseover = function () {
				this.style.backgroundColor = isChecked ? "rgba(0,250,0,0.3)" : "rgba(250,0,0,0.3)";
			};

			child.onmouseout = function () {
				this.style.backgroundColor = isChecked ? "rgba(0,250,0,0.2)" : "rgba(250,0,0,0.2)";
			};
		}
	});

	if (checks.every((value) => value === false)) {
		theButton.innerHTML = "Check All";
	} else if (checks.every((value) => value === true)) {
		theButton.innerHTML = "Uncheck All";
	}
}

document.querySelectorAll(".passwordAllows").forEach(function (div) {
	div.addEventListener("click", function () {
		let theText = div.innerHTML;
		div.innerHTML = theText.includes("✔") ? theText.replace("✔", "✖") : theText.replace("✖", "✔");
		checkCheckboxes();
	});
});

function checkAll() {
	if (theButton.innerHTML == "Check All") {
		checks.fill(true);
		children.forEach((child) => {
			child.innerHTML = child.innerHTML.includes("✔") ? child.innerHTML : child.innerHTML.replace("✖", "✔");
		});
		theButton.innerText = "Uncheck All";
	} else if (theButton.innerHTML == "Uncheck All") {
		checks.fill(false);
		children.forEach((child) => {
			child.innerHTML = child.innerHTML.includes("✔") ? child.innerHTML.replace("✔", "✖") : child.innerHTML;
		});
		theButton.innerText = "Check All";
	}
	checkCheckboxes();
}

async function generatePassword() {
	checkCheckboxes();
	let allCharacters = "";
	document.getElementById("password").value = "";

	if (checks.every((value) => value === false)) {
		alert("Please select at least one setting.");
		return;
	} else if (document.getElementById("passwordlength").value > 100) {
		alert("Please generate a shorter password.");
		return;
	} else {
		if (checks[0]) {
			allCharacters += lowercase;
		}
		if (checks[1]) {
			allCharacters += uppercase;
		}
		if (checks[2]) {
			allCharacters += numbers;
		}
		if (checks[3]) {
			allCharacters += symbols;
		}
	}

	for (i = 0; i < document.getElementById("passwordlength").value; i++) {
		const randomIndex = Math.floor(Math.random() * allCharacters.length);
		document.getElementById("password").value += allCharacters[randomIndex];
		await new Promise((resolve) => setTimeout(resolve, 2000 / document.getElementById("passwordlength").value));
	}
	document.getElementById("copyPassword").disabled = false;
}

function copyAll() {
	document.getElementById("password").select();
	document.execCommand("copy");
	alert("Copied your password!");
}

document.addEventListener("DOMContentLoaded", function () {
	checkAll();
});
