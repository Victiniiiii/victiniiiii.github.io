document.body.style.background = "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.875) 100%)";

if (window.location.hash) {
	document.getElementById(window.location.hash.slice(1)).click();
}

let modal = document.getElementById("warningModal");
let proceedBtn = document.getElementById("proceedBtn");
let cancelBtn = document.getElementById("cancelBtn");
let targetLink = null;

document.addEventListener("click", function (event) {
	let anchor = event.target.closest("a");
	if (anchor && anchor.hostname !== window.location.hostname) {
		event.preventDefault();
		targetLink = anchor.href;
		modal.style.display = "flex";
		return;
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
	const aboutMe = document.getElementById("aboutMe");

	generaltab.style.display = "none";
	skyblocktab.style.display = "none";
	aboutMe.style.display = "none";
	clicked.style.display = "grid";

	if (clicked.id === "aboutMe") {
		clicked.style.display = "flex";
		clicked.style.color = "white";
	}

	window.location.hash = clicked.id.slice(8, -8);
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
			grandParent.style.height = baseHeight + h6Height + marginBottom + "px";
		} else {
			grandParent.style.height = baseHeight + "px";
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
		div.style.margin = "-1vh 0 0 -2.5vh";
		div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="0 0 1052 1052"><path fill="#f0db4f" d="M0 0h1052v1052H0z"/><path d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z" fill="#323330"/></svg>`;
	} else if (div.innerHTML.trim() === "Python") {
		div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="16 16 32 32"><path fill="url(#a)" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/><path fill="url(#b)" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/><defs><linearGradient id="a" x1="19.075" x2="34.898" y1="18.782" y2="34.658" gradientUnits="userSpaceOnUse"><stop stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="b" x1="28.809" x2="45.803" y1="28.882" y2="45.163" gradientUnits="userSpaceOnUse"><stop stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient></defs></svg>`;
		div.style.margin = "0 0 0 -2vh";
	}
});
