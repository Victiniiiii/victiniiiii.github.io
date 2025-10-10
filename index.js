document.addEventListener("DOMContentLoaded", event => {
	if (window.location.hash) {
		document.getElementById(window.location.hash.slice(1)).click();
	} else {
		document.getElementById("general").click();
	}

	function loadProjects(jsonPath, containerId) {
		const container = document.getElementById(containerId);
		fetch(jsonPath)
			.then(res => res.json())
			.then(projects => {
				projects.forEach(project => {
					const mainDiv = document.createElement("div");
					mainDiv.className = "mainmenuproject";

					const a = document.createElement("a");
					a.href = project.url;
					a.title = project.name;
					a.setAttribute("aria-label", project.name);

					const langDiv = document.createElement("div");
					langDiv.className = "mainmenulanguage";
					langDiv.title = project.language;
					langDiv.textContent = project.language;

					const picture = document.createElement("picture");
					const source = document.createElement("source");
					source.srcset = `static/imageswebp/${project.image}.webp`;
					source.type = "image/webp";
					const img = document.createElement("img");
					img.src = `static/images/${project.image}.png`;
					img.alt = project.name;

					picture.appendChild(source);
					picture.appendChild(img);

					const release = document.createElement("div");
					release.className = "mainmenunew";
					release.textContent = `Release Date: ${project.release}`;

					a.appendChild(langDiv);
					a.appendChild(picture);
					a.appendChild(release);

					const nameDiv = document.createElement("div");
					nameDiv.className = "projectname";

					const p = document.createElement("p");
					p.textContent = project.name;

					const h6 = document.createElement("h6");
					h6.textContent = project.description;

					nameDiv.appendChild(p);
					nameDiv.appendChild(h6);

					mainDiv.appendChild(a);
					mainDiv.appendChild(nameDiv);
					container.appendChild(mainDiv);
				});

				document.querySelectorAll(`#${containerId} .projectname`).forEach(name => {
					name.addEventListener("click", function () {
						name.parentElement.classList.toggle("expanded");
						updateExpandedHeights();
					});
				});

				document.querySelectorAll(`#${containerId} .mainmenulanguage`).forEach(div => {
					const lang = div.textContent.trim();
					const icons = {
						JavaScript: "/icons/javascript.svg",
						Python: "/icons/python.svg",
						React: "/icons/react.svg",
						TypeScript: "/icons/typescript.svg",
						R: "/icons/r.svg",
						"Next.js": "/icons/next.svg",
						Go: "/icons/golang.svg",
					};
					if (icons[lang]) div.innerHTML = `<img src="${icons[lang]}" alt="${lang}">`;
				});

				updateExpandedHeights();
			})
			.catch(err => console.error(`Failed to load project data from ${jsonPath}:`, err));
	}

	loadProjects("datas/generalprojects.json", "mainmenugeneralprojects");
	loadProjects("datas/skyblockprojects.json", "mainmenuskyblockprojects");

	const container = document.getElementById("aboutMeBox");
	fetch("datas/aboutme.json")
		.then(res => res.json())
		.then(data => {
			container.innerHTML = "";

			function addSection(title, content) {
				if (!content) return;
				const h2 = document.createElement("h2");
				h2.textContent = title;
				container.appendChild(h2);
				container.appendChild(document.createElement("pre"));

				if (typeof content === "string") {
					const p = document.createElement("p");
					p.textContent = content;
					container.appendChild(p);
				} else if (Array.isArray(content)) {
					content.forEach(item => {
						const div = document.createElement("div");
						const img = document.createElement("img");
						img.src = item.icon;
						img.alt = item.name;
						const p = document.createElement("p");
						p.textContent = item.name;
						div.appendChild(img);
						div.appendChild(p);
						container.appendChild(div);
					});
				} else if (typeof content === "object") {
					for (let subsection in content) {
						const h3 = document.createElement("h3");
						h3.textContent = subsection;
						container.appendChild(h3);
						container.appendChild(document.createElement("pre"));
						content[subsection].forEach(item => {
							const div = document.createElement("div");
							const img = document.createElement("img");
							img.src = item.icon;
							img.alt = item.name;
							const p = document.createElement("p");
							p.textContent = item.name;
							div.appendChild(img);
							div.appendChild(p);
							container.appendChild(div);
						});
						container.appendChild(document.createElement("pre"));
					}
				}
			}

			addSection("About Me:", data.aboutMe);
			addSection("Technologies:", data.technologies);
			addSection("Other Skills:", data.otherSkills);
			addSection("Speaking:", data.speaking);
		})
		.catch(err => console.error("Failed to load About Me data:", err));
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
			warningMessage.textContent = `Warning: This will open your email client for sending mail to ${email}`;
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
	if (targetLink) window.open(targetLink, "_blank");
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
