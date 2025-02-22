document.body.style.background = "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.875) 100%)";

if (window.location.hash) {
	document.getElementById(window.location.hash.slice(1)).click();
}

let modal = document.getElementById("warningModal");
let proceedBtn = document.getElementById("proceedBtn");
let cancelBtn = document.getElementById("cancelBtn");
let targetLink = null;

document.querySelectorAll("a").forEach(function (anchor) {
	if (anchor.hostname !== window.location.hostname) {
		anchor.addEventListener("click", function (event) {
			event.preventDefault();
			targetLink = anchor.href;
			modal.style.display = "flex";
		});
	}
});

document.addEventListener("click", function (event) {
	if (!document.getElementById("warningModal").contains(event.target) &&
		!document.querySelector(".mainmenuproject")?.contains(event.target)) {
		document.getElementById("cancelBtn").click();
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
	const otherstab = document.getElementById("mainmenuotherprojects");

	generaltab.style.display = "none";
	skyblocktab.style.display = "none";
	otherstab.style.display = "none";
	clicked.style.display = "grid";

	window.location.hash = clicked.id.slice(8, -8);
	clicked.scrollTop = 0;
}

document.querySelectorAll(".projectname").forEach(function (name) {
	name.addEventListener("click", function () {
		name.parentElement.classList.toggle("expanded");
	});
});

document.querySelectorAll(".mainmenulanguage").forEach(function (div) {
	if (div.innerHTML.trim() === "JavaScript") {
		div.style.margin = "3px 0 0 -10px";
		div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-javascript" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="yellow" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
                            <path d="M7.5 8h3v8l-2 -1" />
                            <path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" />
                        </svg>`;
	} else if (div.innerHTML.trim() === "Python") {
		div.style.margin = "5px 0 0 -3px";
		div.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#paint0_linear_87_8204)"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#paint1_linear_87_8204)"/>
                            <defs>
                            <linearGradient id="paint0_linear_87_8204" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#327EBD"/>
                            <stop offset="1" stop-color="#1565A7"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_87_8204" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FFDA4B"/>
                            <stop offset="1" stop-color="#F9C600"/>
                            </linearGradient>
                            </defs>
                        </svg>`;
		div.style.width = "70px";
		div.style.height = "60px";
		div.style.margin = "0 0 0 -10px";
	}
});
