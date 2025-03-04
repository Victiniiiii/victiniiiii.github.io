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
		div.innerHTML = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#paint0_linear_87_8204)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#paint1_linear_87_8204)"></path> <defs> <linearGradient id="paint0_linear_87_8204" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse"> <stop stop-color="#327EBD"></stop> <stop offset="1" stop-color="#1565A7"></stop> </linearGradient> <linearGradient id="paint1_linear_87_8204" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFDA4B"></stop> <stop offset="1" stop-color="#F9C600"></stop> </linearGradient> </defs> </g></svg>`;
		div.style.margin = "0 0 0 -2vh";
	}
});
