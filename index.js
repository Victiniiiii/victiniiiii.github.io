document.addEventListener("DOMContentLoaded", event => {
	if (window.location.hash) {
		document.getElementById(window.location.hash.slice(1)).click();
	} else {
		document.getElementById("general").click();
	}
});

let modal = document.getElementById("warningModal");
let proceedBtn = document.getElementById("proceedBtn");
let cancelBtn = document.getElementById("cancelBtn");
let warningMessage = document.getElementById("warningMessage");
let targetLink = null;

document.addEventListener("click", function (event) {
	let anchor = event.target.closest("a");
	if (anchor) {
		let url = new URL(anchor.href);

		if (url.protocol === "mailto:") {
			event.preventDefault();
			let email = url.pathname;
			targetLink = anchor.href;
			warningMessage.textContent = `Warning: This will open email client to send to ${email}`;
			modal.style.display = "flex";
			return;
		} else if (url.protocol.startsWith("http") && url.hostname !== window.location.hostname) {
			event.preventDefault();
			let domain = url.hostname.replace(/^www\./, "");
			targetLink = anchor.href;
			warningMessage.textContent = `Warning: This will open ${domain}`;
			modal.style.display = "flex";
			return;
		}
	}

	if (!modal.contains(event.target) && !event.target.closest("a") && !event.target.closest("img")) {
		cancelBtn.click();
	}
});

proceedBtn.addEventListener("click", function () {
	if (targetLink) {
		window.open(targetLink, "_blank");
	}
	modal.style.display = "none";
});

cancelBtn.addEventListener("click", function () {
	modal.style.display = "none";
});

function switchtab(clicked) {
	const generaltab = document.getElementById("mainmenugeneralprojects");
	const skyblocktab = document.getElementById("mainmenuskyblockprojects");
	const aboutme = document.getElementById("aboutMeBox");

	generaltab.style.display = "none";
	skyblocktab.style.display = "none";
	aboutme.style.display = "none";
	clicked.style.display = "grid";

	if (clicked.id === "aboutMeBox") {
		clicked.style.display = "flex";
		clicked.style.color = "white";
		window.location.hash = "aboutme";
	} else {
		window.location.hash = clicked.id.slice(8, -8);
	}

	clicked.scrollTop = 0;
	updateExpandedHeights();
}

function updateExpandedHeights() {
	let baseHeight = window.innerWidth > 768 ? window.innerHeight * 0.3 : window.innerHeight * 0.2;
	let marginBottom = window.innerWidth > 768 ? 30 : 10;

	document.querySelectorAll("h6").forEach(function (h6) {
		let grandParent = h6.parentElement?.parentElement;
		if (!grandParent) return;

		let h6Height = h6.offsetHeight;

		if (grandParent.classList.contains("expanded")) {
			grandParent.style.height = baseHeight + "px";
		} else {
			grandParent.style.height = baseHeight + h6Height + marginBottom + "px";
		}
	});
}

document.querySelectorAll(".projectname").forEach(function (name) {
	name.addEventListener("click", function () {
		name.parentElement.classList.toggle("expanded");
		updateExpandedHeights();
	});
});

document.querySelectorAll(".mainmenulanguage").forEach(function (div) {
	if (div.innerHTML.trim() === "JavaScript") {
		div.innerHTML = `<img src="/icons/javascript.svg" alt="Javascript">`;
	} else if (div.innerHTML.trim() === "Python") {
		div.innerHTML = `<img src="/icons/python.svg" alt="Python">`;
	} else if (div.innerHTML.trim() === "React") {
		div.innerHTML = `<img src="/icons/react.svg" alt="React">`;
	} else if (div.innerHTML.trim() === "TypeScript") {
		div.innerHTML = `<img src="/icons/typescript.svg" alt="Typescript">`;
	} else if (div.innerHTML.trim() === "R") {
		div.innerHTML = `<img src="/icons/r.svg" alt="R">`;
	} else if (div.innerHTML.trim() === "Next.js") {
		div.innerHTML = `<img src="/icons/next.svg" alt="Next.js">`;
	}
});
