// Game Settings:

let selectedDistrict;
let selectedGameMode;
let roundCount = 0;
let roundLimit = 5;
let timerSeconds = 30;
let hintsAreEnabled = false;

// Game Points:

let roundPoints = new Array(roundLimit).fill(0);
let guessedCoordinates = new Array(roundLimit).fill(0);
let actualCoordinates = new Array(roundLimit).fill(0);
let totalPoints = 0;

// Firebase Settings:

let nickname;
const nicknamecooldown = 300000; // 5 minutes ( 300,000 milliseconds )

// HTML Elements:

const startPage = document.getElementById("startpage");
const returnButton = document.getElementById("returnbutton");
const modaltogglebutton = document.getElementById("modaltoggle-button");
const overlayContainer = document.getElementById("overlay-container");
const finalresultsmodal = document.getElementById("final-results-modal");
const buttonrow = document.getElementById("buttonrow");
const resultModal = document.getElementById("result-modal");
const confirmButton = document.getElementById("action-button");
const startPageLeftHalf = document.querySelector(".startpagelefthalf");
const buttons = document.querySelectorAll("#izmirilcebox button");
const expandButton = document.getElementById("expandButton");
const competitiveChecks = document.getElementById("competitiveChecks");
const gameplayBackground = document.getElementById("gameplayBackground");
const backgroundText = document.getElementById("backgroundText");
const titleSection = document.getElementById("title-section");
const loadingScreen = document.getElementById("loadingScreen");
let gamemap = document.getElementById("gamemap"); // Has to be "let"

// Game Elements:

let theKey = "AIzaSyBvjbX7ao3UbTO56SwG9IJ_KAXOtM5Guo4"; // It's restricted to the page
let gameOngoing = false;
let guessedLocationMarker;
let randomLocation;
let minimap;
let minimapcenter;
let minimapzoom;
let roundTimer;
let isTimerPaused = false;
let finalgoruntulendimi = false;
const initiallyGreenDistricts = [];
const districtLayers = [];
let mobileUser;

// Leaflet Map:

const initialLat = 38.545325;
const initialLon = 27.402211;
let initialZoom;
let maxZoomValue;
let minZoomValue;

if (parseInt(window.getComputedStyle(titleSection).width) < 768) {
	maxZoomValue = 9;
	minZoomValue = 7;
	initialZoom = 8;
	mobileUser = true;
} else {
	maxZoomValue = 10;
	minZoomValue = 8;
	initialZoom = 9;
	mobileUser = false;
}

const map2 = L.map("map2", {
	maxZoom: maxZoomValue,
	minZoom: minZoomValue,
	maxBounds: [
		[39.444306, 28.559917],
		[37.708722, 26.203444],
	], // (North, East, South, West)
}).setView([initialLat, initialLon], initialZoom);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
	attribution: "© OpenStreetMap contributors © CartoDB",
	subdomains: "abcd",
	maxZoom: 19,
}).addTo(map2);

districtsData.forEach((district) => {
	const polygon = L.polygon(district.designcoordinates, { fill: true, color: "green" }).addTo(map2);
	districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

	if (district.state === 1) {
		initiallyGreenDistricts.push({ bounds: district.bounds });
	}
});

buttons.forEach((button) => {
	button.style.backgroundColor = "green";
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	if (!gameOngoing && !initiallyGreenDistricts.length == 0) {
		removeAllDistricts();
	} else if (!gameOngoing && initiallyGreenDistricts.length == 0) {
		addAllDistricts();
	}
});

// Functions:

function refreshMap() {
	map2.setView([initialLat, initialLon], initialZoom);
	map2.invalidateSize();
}

function isPointInPolygon(point, polygon) {
	let x = point[0],
		y = point[1];
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		let xi = polygon[i][0],
			yi = polygon[i][1];
		let xj = polygon[j][0],
			yj = polygon[j][1];
		let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

map2.on("mousedown", function (event) {
	districtLayers.forEach((district) => {
		const latLngs = district.layer.getLatLngs()[0];
		const x = event.latlng.lng;
		const y = event.latlng.lat;
		let inside = false;

		for (let i = 0, j = latLngs.length - 1; i < latLngs.length; j = i++) {
			const xi = latLngs[i].lng;
			const yi = latLngs[i].lat;
			const xj = latLngs[j].lng;
			const yj = latLngs[j].lat;

			const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

			if (intersect) inside = !inside;
		}

		if (inside) {
			setTimeout(function () {
				toggleDistrict(district);
			}, 100);
		}
	});
});

function toggleDistrict(input) {
	let district;

	if (typeof input === "string") {
		district = districtLayers.find((d) => d.name === input);
	} else {
		district = input;
	}

	const button = Array.from(buttons).find((b) => b.innerText.trim() === district.name);

	if (district.layer.options.fill) {
		district.layer.setStyle({ fill: false, color: "red" });
		district.state = 0;
		if (button) button.style.backgroundColor = "red";

		const index = initiallyGreenDistricts.findIndex((greenDistrict) => greenDistrict.bounds === district.bounds);
		if (index !== -1) {
			initiallyGreenDistricts.splice(index, 1);
		}
	} else {
		district.layer.setStyle({ fill: true, color: "green" });
		district.state = 1;
		if (button) button.style.backgroundColor = "green";

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}
	}

	ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
	competitiveCheck();
}

function addAllDistricts() {
	buttons.forEach((button) => {
		button.style.backgroundColor = "green";
	});
	districtLayers.forEach((district) => {
		district.layer.setStyle({ fill: true, color: "green" });
		district.state = 1;

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}

		ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
	});
	competitiveCheck();
}

function removeAllDistricts() {
	buttons.forEach((button) => {
		button.style.backgroundColor = "red";
	});
	districtLayers.forEach((district) => {
		district.layer.setStyle({ fill: false, color: "red" });
		district.state = 0;

		initiallyGreenDistricts.length = 0;

		ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
	});
	competitiveCheck();
}

function getRandomLocation() {
	let polygon = districtsData.find((district) => district.name === selectedDistrict).bounds;
	let minX = polygon[0][0];
	let maxX = polygon[0][0];
	let minY = polygon[0][1];
	let maxY = polygon[0][1];
	let lat;
	let lng;

	for (let i = 1; i < polygon.length; i++) {
		minX = Math.min(minX, polygon[i][0]);
		maxX = Math.max(maxX, polygon[i][0]);
		minY = Math.min(minY, polygon[i][1]);
		maxY = Math.max(maxY, polygon[i][1]);
	}

	do {
		lat = Math.random() * (maxX - minX) + minX;
		lng = Math.random() * (maxY - minY) + minY;
	} while (!isPointInPolygon([lat, lng], polygon));

	return { lat, lng };
}

function initMap() {
	gameOngoing = true;
	loadingScreen.style.display = "flex";
	guessedLocationMarker = null;

	if (mobileUser) {
		minimapCloseButton();
	}

	let formattedNames = initiallyGreenDistricts.map((district) => district.bounds);
	shuffleArray(formattedNames);
	selectedDistrict = districtsData.find((district) => district.bounds === formattedNames[0]).name;
	randomLocation = getRandomLocation();

	startPage.style.display = "none";
	titleSection.style.display = "none";
	gameplayBackground.style.display = "block";
	buttonrow.style.display = "flex";

	document.getElementById("modaltoggle-button").style.display = "none";
	document.getElementById("final-results-modal").style.display = "none";
	document.getElementById("gamemap").style.display = "block";
    document.getElementById("gamemap").innerHTML = "";
    clearImageCache();
	resultModal.style.display = "none";
	backgroundText.innerHTML = "";

    if (mobileUser) {
        document.getElementById("action-button").style.width = "75%";
        document.getElementById("minimapCloseButton").style.width = "25%";
        document.getElementById("minimapCloseButton").innerHTML = "Close";
    }

	gamemap = new google.maps.Map(document.getElementById("gamemap"), {
		center: randomLocation,
		zoom: 14,
		...panoramaOptions,
	});

	const streetViewService = new google.maps.StreetViewService();
	streetViewService.getPanorama({ location: randomLocation, radius: 200 }, function (data, status) {
		if (status === "OK") {
			const latLng = data.location.latLng;

			randomLocation = {
				lat: latLng.lat(),
				lng: latLng.lng(),
			};

			const panorama = new google.maps.StreetViewPanorama(document.getElementById("gamemap"), {
				position: randomLocation,
				pov: { heading: 34, pitch: 1 },
				zoom: 1,
				...panoramaOptions,
			});

			gamemap.setStreetView(panorama);

			if (initiallyGreenDistricts.length == 1) {
				minimapcenter = districtsData.find((d) => d.name === selectedGameMode).zoom;
				minimapzoom = 12;
			} else {
				minimapcenter = { lat: 38.4192, lng: 27.1287 };
				minimapzoom = 10;
			}

			minimap = new google.maps.Map(document.getElementById("mini-map"), {
				center: minimapcenter,
				zoom: minimapzoom,
				draggable: true,
				mapTypeControl: false,
				clickableIcons: false,
				...panoramaOptions,
				restriction: {
					latLngBounds: {
						north: 39.47,
						south: 37.85,
						east: 28.41,
						west: 26.21,
					},
					strictBounds: true,
				},
			});

			google.maps.event.addListener(minimap, "click", function (event) {
				if (guessedLocationMarker) {
					guessedLocationMarker.setMap(null);
				}

				guessedLocationMarker = new google.maps.Marker({
					position: event.latLng,
					map: minimap,
					title: "Guessed Location",
					icon: "static/images/redpin.png",
				});
			});

			google.maps.event.addListener(gamemap, "click", function (event) {
				if (guessedLocationMarker) {
					guessedLocationMarker.setMap(null);
				}

				guessedLocationMarker = new google.maps.Marker({
					position: event.latLng,
					map: minimap,
					title: "Original Location",
					icon: "static/images/greenpin.png",
				});
			});

			document.getElementById("action-button").onclick = function () {
				const distance = google.maps.geometry.spherical.computeDistanceBetween(guessedLocationMarker.getPosition(), randomLocation);
				const points = calculatePoints(distance);
				displayResults(distance, points);
			};

			resumeTimer();

			if (roundTimer) {
				clearInterval(roundTimer);
			}

			timerSeconds = 30;
			document.getElementById("timer").innerHTML = `Remaining: ${timerSeconds} Seconds`;
			roundTimer = setInterval(updateTimer, 1000);
			document.getElementById("selectGameMode").innerText = `Selected Mode: ${selectedGameMode}`;
			document.getElementById("roundCount").innerText = `Round ${roundCount + 1}`;
			loadingScreen.style.display = "none";
		} else {
			initMap();
		}
	});
}

function toggleModal() {
	if (roundCount < roundLimit) {
		if (resultModal.style.display === "flex") {
			resultModal.style.display = "none";
		} else {
			resultModal.style.display = "flex";
		}
	}

	if (roundCount == roundLimit) {
		if (resultModal.style.display === "flex") {
			resultModal.style.display = "none";
			finalresultsmodal.style.display = "none";
		} else if (finalresultsmodal.style.display === "flex") {
			finalresultsmodal.style.display = "none";
			resultModal.style.display = "none";
		} else if (resultModal.style.display === "none" && finalresultsmodal.style.display === "none" && !finalgoruntulendimi) {
			resultModal.style.display = "flex";
		} else {
			finalresultsmodal.style.display = "flex";
		}
	}
}

function returnToStart() {
    document.getElementById("gamemap").innerHTML = "";
    clearImageCache();
	gamemap = new google.maps.Map(document.getElementById("gamemap"), {
		center: randomLocation,
		zoom: 14,
		...panoramaOptions,
	});

	const streetViewService = new google.maps.StreetViewService();
	streetViewService.getPanorama({ location: randomLocation, radius: 25 }, function (data, status) {
		if (status === "OK") {
			const panorama = new google.maps.StreetViewPanorama(document.getElementById("gamemap"), {
				position: randomLocation,
				pov: { heading: 34, pitch: 1 },
				zoom: 1,
				...panoramaOptions,
			});

			gamemap.setStreetView(panorama);
		} else {
			returnToStart();
		}
	});
}

function calculatePoints(distance) {
	let points = -1.35166e-9 * Math.pow(distance, 3) + 0.0000310415 * Math.pow(distance, 2) - 0.278563 * distance + 1033.48;
	if (points < 0) {
		points = 0;
	}
	return Math.round(points);
}

function displayResults(distance, points) {
	pauseTimer();
	document.getElementById("gamemap").style.opacity = "1";

	const resultMap = new google.maps.Map(document.getElementById("result-map"), {
		center: randomLocation,
		zoom: getZoomLevel(distance),
		mapTypeControl: false,
		clickableIcons: false,
		...panoramaOptions,
	});

	if (mobileUser) {
		document.getElementById("gamemap").style.height = "100dvh";
	}

	guessedLocationMarker.setMap(resultMap);
	const guessedLatLng = guessedLocationMarker.getPosition().toJSON();
	guessedCoordinates[roundCount] = { lat: guessedLatLng.lat, lng: guessedLatLng.lng };
	actualCoordinates[roundCount] = { lat: randomLocation.lat, lng: randomLocation.lng };

	const foundDistrict = districtsData.find((district) => district.name === selectedDistrict);
	const guessedPoint = [guessedCoordinates[roundCount].lat, guessedCoordinates[roundCount].lng];
	document.getElementById("resultModalLeft").innerHTML = `<h1>Point Distribution</h1>`;
	document.getElementById("resultModalLeft").innerHTML += `<p>From Distance: ${points}</p>`;

	if (selectedGameMode == "Every District" && isPointInPolygon(guessedPoint, foundDistrict.designcoordinates)) {
		points += 100;
		document.getElementById("resultModalLeft").innerHTML += `<p>Every District Mode - Same District: +100 points</p>`;
	} else if (selectedGameMode == "Every District") {
		for (i = 0; i < foundDistrict.neighbors.length; i++) {
			let foundNeighborDistrict = districtsData.find((district) => district.name === foundDistrict.neighbors[i]);
			if (isPointInPolygon(guessedPoint, foundNeighborDistrict.designcoordinates)) {
				points += 50;
				document.getElementById("resultModalLeft").innerHTML += `<p>Every District Mode - Neighboring District: +50 points</p>`;
			}
		}
	}

	if (hintsAreEnabled) {
		points -= 200;
		document.getElementById("resultModalLeft").innerHTML += `<p>Deduction From Hints Used: -200 points</p>`;
	}

	if (points > 1000) {
		points = 1000;
	}

	roundPoints[roundCount] = parseInt(points);
	totalPoints += roundPoints[roundCount];
	saveData(selectedDistrict, roundPoints[roundCount]);

	document.getElementById("distance-info").innerHTML = `Distance: ${distance.toFixed(0)} meters`;

	document.getElementById("points-info").innerHTML = `Points Earned: ${points}`;
	document.getElementById("totalPoints").innerHTML = `Total Points: ${totalPoints}`;
	document.getElementById("totalPoints2").innerHTML = `Total Points: ${totalPoints}`;

	document.getElementById("resultModalRight").innerHTML = "<h1>Round Points</h1>";

	for (let i = 0; i <= roundCount; i++) {
		document.getElementById("resultModalRight").innerHTML += `<p>Round ${i + 1} Score: ${roundPoints[i]}</p>`;
	}

	document.getElementById("result-modal").style.display = "flex";
	document.getElementById("overlay-container").style.display = "none";
	document.getElementById("modaltoggle-button").style.display = "flex";

	if (roundCount < (roundLimit - 1)) {
		new google.maps.Marker({
			position: randomLocation,
			map: resultMap,
			title: "Correct Answer",
			icon: "static/images/greenpin.png",
		});

		const line = new google.maps.Polyline({
			path: [guessedCoordinates[roundCount], actualCoordinates[roundCount]],
			geodesic: true,
			strokeColor: "#FF0000", // Red
			strokeOpacity: 1.0,
			strokeWeight: 4,
		});

		line.setMap(resultMap);
	} else {
		const colors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF00FF"]; // Red, Yellow, Green, Blue, Magenta
		guessedLocationMarker.setMap(null);

        const hideAllButton = document.createElement("button");
		hideAllButton.innerHTML = "Hide All Markers";
        document.getElementById("resultModalLeft").appendChild(hideAllButton);

        const showAllButton = document.createElement("button");
		showAllButton.innerHTML = "Show All Markers";
		document.getElementById("resultModalLeft").appendChild(showAllButton);

		for (let i = 0; i < roundLimit; i++) {
			const guessedMarker = new google.maps.Marker({
				position: guessedCoordinates[i],
				map: resultMap,
				title: `Guessed Location ${i + 1}`,
				icon: `static/images/redpin${i + 1}.png`,
			});

			const actualMarker = new google.maps.Marker({
				position: actualCoordinates[i],
				map: resultMap,
				title: `Actual Location ${i + 1}`,
				icon: `static/images/greenpin${i + 1}.png`,
			});

			const line = new google.maps.Polyline({
				path: [guessedCoordinates[i], actualCoordinates[i]],
				geodesic: true,
				strokeColor: colors[i],
				strokeOpacity: 1.0,
				strokeWeight: 4,
			});

			guessedMarker.addListener("click", function () {
				resultMap.setCenter(actualMarker.getPosition());
			});

			actualMarker.addListener("click", function () {
				resultMap.setCenter(actualMarker.getPosition());
			});

			line.addListener("click", function () {
				resultMap.setCenter(actualMarker.getPosition());
			});

            const centerMarkerButton = document.createElement("button");
            centerMarkerButton.innerHTML = `Center Button ${i + 1}`
            centerMarkerButton.addEventListener("click", () => {
				resultMap.setCenter(actualMarker.getPosition());
			});

            document.getElementById("resultModalLeft").appendChild(centerMarkerButton);

			line.setMap(resultMap);

			const button = document.createElement("button");
			button.innerHTML = `Toggle Guessed Location ${i + 1}`;
			document.getElementById("resultModalLeft").appendChild(button);

			button.addEventListener("click", () => {
				if (guessedMarker.getMap()) {
					guessedMarker.setMap(null);
                    actualMarker.setMap(null);
                    line.setMap(null);
				} else {
					guessedMarker.setMap(resultMap);
                    actualMarker.setMap(resultMap);
                    line.setMap(resultMap);
				}
			});

            hideAllButton.addEventListener('click', () => {
                guessedMarker.setMap(null);
                actualMarker.setMap(null);
                line.setMap(null);
            });
        
            showAllButton.addEventListener('click', () => {
                guessedMarker.setMap(resultMap);
                actualMarker.setMap(resultMap);
                line.setMap(resultMap);
            });

            const copycoords = document.createElement("button");
			copycoords.innerHTML = `Copy Coordinates Location ${i + 1}`;
			document.getElementById("resultModalLeft").appendChild(copycoords);

            copycoords.addEventListener('click', () => {
                navigator.clipboard.writeText(`${actualCoordinates[i].lat}, ${actualCoordinates[i].lng}`);
            });
		}
	}
	roundCount++;
}

function getZoomLevel(distance) {
	if (distance < 50) {
		return 18;
	} else if (distance < 100) {
		return 17;
	} else if (distance < 250) {
		return 16;
	} else if (distance < 500) {
		return 15;
	} else if (distance < 1000) {
		return 14;
	} else if (distance < 2500) {
		return 13;
	} else if (distance < 5000) {
		return 12;
	} else if (distance < 10000) {
		return 11;
	} else if (distance < 20000) {
		return 10;
	} else if (distance < 40000) {
		return 9;
	} else if (distance < 80000) {
		return 8;
	} else {
		return 7;
	}
}

function playAgain() {
	roundCount = 0;
	startGame();
}

function returnToMainMenu() {
	roundCount = 0;
	gameOngoing = false;

	startPage.style.display = "flex";
	titleSection.style.display = "flex";
	gameplayBackground.style.display = "none";
    document.getElementById("gamemap").innerHTML = "";

    clearImageCache();
	refreshMap();
	pauseTimer();
	calculateDistrictData();
	logTopHighScores();
}

function startGame() {
	if (initiallyGreenDistricts.length == 0) {
		alert("You can't start the game with no districts selected!");
		return;
	}

	if (roundCount == 0) {
		if (initiallyGreenDistricts.length == 30) {
			selectedGameMode = "Every District";
		} else if (initiallyGreenDistricts.length == 1) {
			selectedGameMode = initiallyGreenDistricts[0].name;
		} else {
			selectedGameMode = "Custom";
		}
		
        roundPoints.length = 0;
        guessedCoordinates.length = 0;
        actualCoordinates.length = 0;

		roundPoints.fill(0, 0, roundLimit);
		guessedCoordinates.fill(0, 0, roundLimit);
		actualCoordinates.fill(0, 0, roundLimit);

		finalgoruntulendimi = false;
        totalPoints = 0;
	}
	if (roundCount == roundLimit) {
		document.getElementById("final-results-modal").style.display = "flex";
		document.getElementById("overlay-container").style.display = "none";
		finalgoruntulendimi = true;
	} else {
		document.getElementById("overlay-container").style.display = "block";
		document.getElementById("modaltoggle-button").style.display = "none";
		document.getElementById("result-modal").style.display = "none";
		modaltogglebutton.style.display = "none";
		resumeTimer();
		initMap();
	}
}

function updateTimer() {
	if (!isTimerPaused) {
		if (timerSeconds > 0) {
			timerSeconds--;
			document.getElementById("timer").innerHTML = `Remaining: ${timerSeconds} Seconds`;
		} else {
			clearInterval(roundTimer);
			document.getElementById("gamemap").style.opacity = "0";
			backgroundText.innerHTML = "Your time is up, but you can still put your guess in";
            minimapOpenButton();

            if (mobileUser) {
                document.getElementById("action-button").style.width = "100%";
                document.getElementById("minimapCloseButton").style.width = "0%";
                document.getElementById("minimapCloseButton").innerHTML = "";
            }
		}
	}
}

function pauseTimer() {
	isTimerPaused = true;
	clearInterval(roundTimer);
}

function resumeTimer() {
	isTimerPaused = false;
}

function competitiveCheck() {
	competitiveChecks.innerHTML = `<h1> Competitive Checks </h1>`;
	if (document.getElementById("secondButton").innerHTML == "Log in with Google") {
		competitiveChecks.innerHTML += `<p> You need to be logged in to save your statistics! </p>`;
		return;
	}

	competitiveChecks.innerHTML += `<p> Logged in: &#10004 </p>`;

	if (!(initiallyGreenDistricts.length == 30) && !(initiallyGreenDistricts.length == 1)) {
		competitiveChecks.innerHTML += `<p> You need select only one or all districts to save your statistics! </p>`;
		return;
	}

	competitiveChecks.innerHTML += `<p> Only one or all districts selected: &#10004 </p>`;
	competitiveChecks.innerHTML += `<p> No special game mode: &#10004 </p>`;
	competitiveChecks.innerHTML += `<p> Time limit at 30 Seconds: &#10004 </p>`;
	competitiveChecks.innerHTML += `<p> You are eligible for the leaderboard. </p>`;
}

function openmodal(modalname) {
	document.getElementById(`${modalname}`).style.display = "flex";
}

function minimapCloseButton() {
	document.getElementById("overlay-container").style.zIndex = "-50";
	document.getElementById("minimapOpenButton").style.display = "flex";
	if (mobileUser) {
		document.getElementById("gamemap").style.height = "100dvh";
	}
}

function minimapOpenButton() {
	document.getElementById("overlay-container").style.zIndex = "2";
	document.getElementById("minimapOpenButton").style.display = "none";
	if (mobileUser) {
		document.getElementById("gamemap").style.height = "65dvh";
	}
}

function clearImageCache() {
    const domains = ['streetviewpixels-pa.googleapis.com', 'lh3.ggpht.com', 'maps.googleapis.com'];
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
        const matchedDomain = domains.find(domain => img.src.includes(domain));
        if (matchedDomain) {
            img.src = '';
        }
    });    
}

function alertNotReadyYet() {
    alert("This feature is not ready yet!")
}

// Adding Event Listeners:

overlayContainer.addEventListener("mouseenter", function () {
	overlayContainer.classList.add("hovered");
});

overlayContainer.addEventListener("mouseleave", function () {
	overlayContainer.classList.remove("hovered");
});

expandButton.addEventListener("click", () => {
	if (expandButton.classList.contains("expanded")) {
		expandButton.classList.remove("expanded");
	} else {
		expandButton.classList.add("expanded");
	}
});

Array.from(document.getElementsByClassName("modalCloseButton")).forEach((button) => {
	button.addEventListener("click", () => {
		Array.from(document.getElementsByClassName("menumodal")).forEach((modal) => {
			modal.style.display = "none";
		});
	});
});

let marker = new Image();
marker.src = 'static/images/redpin.png';
marker.onload = function() {
    marker = null;
};
