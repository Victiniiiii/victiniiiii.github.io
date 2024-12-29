// Game Settings:

let selectedDistrict;
let selectedGameMode;
let roundCount = 0;
let timerSeconds = 30;
let hintCircle;
let hintsAreEnabled = false;
let menuModeToggle = localStorage.getItem("gamemode") ? localStorage.getItem("gamemode") : "DistrictCenters";
let roundLimit = localStorage.getItem("roundLimit") ? localStorage.getItem("roundLimit") : 3;
document.getElementById("gameModeSelector").value = menuModeToggle;
document.getElementById("roundLimitSelector").value = roundLimit;

// Game Points:

let roundPoints = new Array(roundLimit).fill(0);
let guessedCoordinates = new Array(roundLimit).fill(0);
let actualCoordinates = new Array(roundLimit).fill(0);
let roundTimes = new Array(roundLimit).fill(0);
let totalPoints = 0;

// Firebase Settings:

let nickname;
const nicknamecooldown = 60000; // 1 minute ( 60,000 milliseconds )

// HTML Elements:

const startPage = document.getElementById("startpage");
const overlayContainer = document.getElementById("overlay-container");
const resultModal = document.getElementById("result-modal");
const buttons = document.querySelectorAll("#izmirilcebox button");
const expandButton = document.getElementById("expandButton");
const gameplayBackground = document.getElementById("gameplayBackground");
const backgroundText = document.getElementById("backgroundText");
const titleSection = document.getElementById("title-section");
const loadingScreen = document.getElementById("loadingScreen");
let gamemap = document.getElementById("gamemap"); // Has to be "let"

// Game Elements:

let theKey = "AIzaSyBvjbX7ao3UbTO56SwG9IJ_KAXOtM5Guo4"; // It's restricted to the page
let initiallyGreenDistricts = [];
let districtLayers = [];
let previousMode = "DistrictBorders";
let gameOngoing = false;
let isTimerPaused = false;
let currentlyPlayingSharedGame = false;
let guessedLocationMarker;
let randomLocation;
let minimap;
let minimapcenter;
let minimapzoom;
let roundTimer;
let mobileUser;
let matchSharingCode;

// Leaflet Map:

const initialLat = 38.545325;
const initialLon = 27.402211;
let initialZoom;
let maxZoomValue;
let minZoomValue;

if (parseInt(window.getComputedStyle(titleSection).width) < 768) {
	maxZoomValue = 10;
	minZoomValue = 7;
	initialZoom = 8;
	mobileUser = true;
	document.getElementById("menuTip").style.display = "none";
} else {
	maxZoomValue = 11;
	minZoomValue = 8;
	initialZoom = 9;
	mobileUser = false;
	document.getElementById("menuTip").innerHTML = "Tip: Right click to toggle all districts...";
}

let map2 = L.map("map2", {
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

// Functions:

function generateColor(username) {
	let hash = 0;
	for (let i = 0; i < username.length; i++) {
		hash = username.charCodeAt(i) + ((hash << 5) - hash);
	}
	const color = "#" + (hash & 0x00ffffff).toString(16).padStart(6, "0");
	return color;
}

function switchMainMenuMapType() {
	const mode = document.getElementById("mapModeSelector").value;
	let modeType;

	districtLayers.forEach((layer) => {
		map2.removeLayer(layer.layer);
	});

	districtLayers = [];

	if (mode === "DistrictBorders" || mode === "YourPerformance" || mode === "Leaderboard") {
		modeType = "design";
	} else if (mode === "GameBorders") {
		modeType = "bounds";
	} else if (mode === "CityCenterBorders") {
		modeType = "center";
	}

	if (mode === "DistrictBorders" || mode === "GameBorders" || mode === "CityCenterBorders") {
		districtsData.forEach((district) => {
			const coordinates = mode === "CityCenterBorders" ? district.center : modeType === "design" ? district.designcoordinates : district.bounds;
			const isGreen = initiallyGreenDistricts.some((greenDistrict) => JSON.stringify(greenDistrict.bounds) === JSON.stringify(district.bounds));
			const state = isGreen ? 1 : 0;
			const color = isGreen ? "green" : "red";
			const fill = isGreen ? true : false;

			const polygon = L.polygon(coordinates, { fill: fill, color: color }).addTo(map2);
			districtLayers.push({ name: district.name, layer: polygon, state: state, bounds: district.bounds });
		});
	} else if (mode === "YourPerformance") {
		statisticsMap().then((statistics) => {
			statistics
				.filter((stat) => stat.district !== "Custom" && stat.district !== "Every District")
				.forEach((stat) => {
					const district = districtsData.find((d) => d.name === stat.district);

					if (district) {
						const normalizedScore = Math.min(stat.highScore / 10000, 1);
						const color = `rgb(${255 - 255 * normalizedScore}, ${255 * normalizedScore}, 0)`;

						const coordinates = modeType === "design" ? district.designcoordinates : district.bounds;
						const polygon = L.polygon(coordinates, {
							fill: true,
							color: color,
						}).addTo(map2);

						districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

						polygon.bindPopup(`
                            <strong>${stat.district}</strong><br>
                            High Score: ${stat.highScore}
                        `);
					}
				});
		});
	} else {
		getDistrictWinners().then((winners) => {
			winners.forEach((winner) => {
				const district = districtsData.find((d) => d.name === winner.district);

				if (district) {
					const winnerColor = generateColor(winner.username);
					const coordinates = mode === "CityCenterBorders" ? district.center : modeType === "design" ? district.designcoordinates : district.bounds;
					const polygon = L.polygon(coordinates, {
						fill: true,
						color: winnerColor,
					}).addTo(map2);

					districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

					polygon.bindPopup(`
                        <strong>${winner.username}</strong><br>
                        High Score: ${winner.highScore}
                    `);
				}
			});
		});
	}
	previousMode = mode;
}

setTimeout(() => {
	districtsData.forEach((district) => {
		initiallyGreenDistricts.push({ bounds: district.bounds });
	});
	switchMainMenuMapType();
}, 1000);

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

function findDistrict(coordinate) {
	for (let district of districtsData) {
		if (isPointInPolygon(coordinate, district.bounds)) {
			return district;
		}
	}
	return null;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

map2.on("mousedown", function (event) {
	if (previousMode === "DistrictBorders" || previousMode === "GameBorders" || previousMode === "CityCenterBorders") {
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
	}
});

function toggleDistrict(input) {
	let district;

	if (typeof input === "string") {
		district = districtLayers.find((d) => d.name === input);
	} else {
		district = input;
	}

	const button = Array.from(buttons).find((b) => b.innerText.trim() === district.name);
	const isGreen = initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds);

	if (isGreen) {
		if (previousMode === "DistrictBorders" || previousMode === "GameBorders" || previousMode === "CityCenterBorders") {
			district.layer.setStyle({ fill: false, color: "red" });
		}

		district.state = 0;
		button.style.backgroundColor = "red";

		const index = initiallyGreenDistricts.findIndex((greenDistrict) => greenDistrict.bounds === district.bounds);
		if (index !== -1) {
			initiallyGreenDistricts.splice(index, 1);
		}
	} else {
		if (previousMode === "DistrictBorders" || previousMode === "GameBorders" || previousMode === "CityCenterBorders") {
			district.layer.setStyle({ fill: true, color: "green" });
		}

		district.state = 1;
		button.style.backgroundColor = "green";

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}
	}

	ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
}

function addAllDistricts() {
	buttons.forEach((button) => {
		button.style.backgroundColor = "green";
	});
	districtLayers.forEach((district) => {
		if (previousMode === "DistrictBorders" || previousMode === "GameBorders" || previousMode === "CityCenterBorders") {
			district.layer.setStyle({ fill: true, color: "green" });
		}

		district.state = 1;

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}

		ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
	});
}

function removeAllDistricts() {
	buttons.forEach((button) => {
		button.style.backgroundColor = "red";
	});
	districtLayers.forEach((district) => {
		if (previousMode === "DistrictBorders" || previousMode === "GameBorders" || previousMode === "CityCenterBorders") {
			district.layer.setStyle({ fill: false, color: "red" });
		}

		district.state = 0;
		initiallyGreenDistricts.length = 0;
		ilcesayisi.innerText = `Current District Count: ${initiallyGreenDistricts.length}`;
	});
}

function getRandomLocation() {
	let polygon;
	if (menuModeToggle == "Classic") {
		polygon = districtsData.find((district) => district.name === selectedDistrict).bounds;
	} else {
		polygon = districtsData.find((district) => district.name === selectedDistrict).center;
	}

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
	closeAllModals();
	toggleButton();
	gameOngoing = true;
	loadingScreen.style.display = "flex";
	guessedLocationMarker = null;

	if (currentlyPlayingSharedGame) {
		randomLocation = actualCoordinates[roundCount];
		selectedDistrict = findDistrict(randomLocation);
	} else {
		let formattedNames = initiallyGreenDistricts.map((district) => district.bounds);
		shuffleArray(formattedNames);
		selectedDistrict = districtsData.find((district) => district.bounds === formattedNames[0]).name;
		randomLocation = getRandomLocation();
	}

	startPage.style.display = "none";
	titleSection.style.display = "none";
	gameplayBackground.style.display = "block";
	document.getElementById("buttonrow").style.display = "flex";
	document.getElementById("gamemap").style.display = "block";
	document.getElementById("gamemap").innerHTML = "";
	resultModal.style.display = "none";
	backgroundText.innerHTML = "";
	clearImageCache();

	if (mobileUser) {
		minimapCloseButton();
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
			randomLocation = {
				lat: data.location.latLng.lat(),
				lng: data.location.latLng.lng(),
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
			document.getElementById("roundCount").innerText = `Round ${roundCount + 1} of ${roundLimit}`;
			loadingScreen.style.display = "none";
		} else {
			initMap();
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
	toggleButton();
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
	roundTimes[roundCount] = 30 - timerSeconds;

	const foundDistrict = districtsData.find((district) => district.name === selectedDistrict);
	const guessedPoint = [guessedCoordinates[roundCount].lat, guessedCoordinates[roundCount].lng];

	document.getElementById("resultModalLeft").innerHTML = `<h1>Point Distribution</h1>`;
	document.getElementById("resultModalLeft").innerHTML += `<p>From Distance: ${points}</p><br>`;

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

	if (points > 1000) {
		points = 1000;
	}

	if (hintsAreEnabled) {
		points -= 200;
		document.getElementById("resultModalLeft").innerHTML += `<p>Deduction From Hints Used: -200 points</p>`;
	}

	roundPoints[roundCount] = parseInt(points);
	totalPoints += roundPoints[roundCount];

	if (!currentlyPlayingSharedGame) {
		saveData(selectedDistrict, roundPoints[roundCount]);
	}

	document.getElementById("distance-info").innerHTML = `Guess Distance: ${distance.toFixed(0)}m`;
	document.getElementById("points-info").innerHTML = `Points Earned: ${points}`;
	document.getElementById("totalPoints").innerHTML = `Total Points: ${totalPoints}`;
	document.getElementById("resultModalRight").innerHTML = "<h1>Round Points</h1>";

	for (let i = 0; i <= roundCount; i++) {
		document.getElementById("resultModalRight").innerHTML += `<p>Round ${i + 1} Score: ${roundPoints[i]}</p>`;
	}

	document.getElementById("result-modal").style.display = "flex";
	document.getElementById("overlay-container").style.display = "none";
	document.getElementById("shareMatch").style.display = "none";

	document.getElementById("startGameButton").disabled = true;
	document.getElementById("startGameButton").style.backgroundColor = "gray";
	setTimeout(() => {
		document.getElementById("startGameButton").disabled = false;
		document.getElementById("startGameButton").style.backgroundColor = "rgb(0, 0, 0, 0.8)";
	}, 3000);

	if (roundCount != roundLimit - 1) {
		document.getElementById("startGameButton").innerHTML = "Next Game";

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
		const colors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#A52A2A", "#808080"]; // Red, Yellow, Green, Blue, Magenta, Cyan, Orange, Purple, Brown, Gray
		document.getElementById("startGameButton").innerHTML = "Play Again?";
		document.getElementById("shareMatch").style.display = "flex";
		currentlyPlayingSharedGame = false;

		if (!currentlyPlayingSharedGame) {
			saveMatchHistory();
			createMatchSharingCode();
		}

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
			centerMarkerButton.innerHTML = `Center Button ${i + 1}`;
			centerMarkerButton.addEventListener("click", () => {
				resultMap.setCenter(actualMarker.getPosition());
			});

			document.getElementById("resultModalLeft").appendChild(centerMarkerButton);

			line.setMap(resultMap);

			const toggleButton = document.createElement("button");
			toggleButton.innerHTML = `Toggle Guessed Location ${i + 1}`;
			document.getElementById("resultModalLeft").appendChild(toggleButton);

			toggleButton.addEventListener("click", () => {
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

			hideAllButton.addEventListener("click", () => {
				guessedMarker.setMap(null);
				actualMarker.setMap(null);
				line.setMap(null);
			});

			showAllButton.addEventListener("click", () => {
				guessedMarker.setMap(resultMap);
				actualMarker.setMap(resultMap);
				line.setMap(resultMap);
			});

			const copycoords = document.createElement("button");
			copycoords.innerHTML = `Copy Coordinates Location ${i + 1}`;
			document.getElementById("resultModalLeft").appendChild(copycoords);

			copycoords.addEventListener("click", () => {
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

function returnToMainMenu() {
	roundCount = 0;
	gameOngoing = false;
	currentlyPlayingSharedGame = false;

	startPage.style.display = "flex";
	titleSection.style.display = "flex";
	gameplayBackground.style.display = "none";
	document.getElementById("gamemap").innerHTML = "";

	map2.setView([initialLat, initialLon], initialZoom);
	map2.invalidateSize();

	clearImageCache();
	pauseTimer();
	calculateDistrictData();
	logTopHighScores();
}

function startGame() {
	if (roundCount == 0 || roundCount == roundLimit) {
		if (!currentlyPlayingSharedGame) {
			if (initiallyGreenDistricts.length == 0) {
				alert("You can't start the game with no districts selected!");
				return;
			}
			if (initiallyGreenDistricts.length == 30) {
				selectedGameMode = "Every District";
			} else if (initiallyGreenDistricts.length == 1) {
				selectedGameMode = initiallyGreenDistricts[0].name;
			} else {
				selectedGameMode = "Custom";
			}
		}

		roundPoints.length = 0;
		guessedCoordinates.length = 0;
		roundTimes.length = 0;

		roundPoints.fill(0, 0, roundLimit);
		guessedCoordinates.fill(0, 0, roundLimit);
		roundTimes.fill(0, 0, roundLimit);

		totalPoints = 0;
		roundCount = 0;
	}

	if (hintCircle) {
		hintCircle.setMap(null);
		hintCircle = null;
		hintsAreEnabled = false;
	}

	document.getElementById("overlay-container").style.display = "block";
	document.getElementById("result-modal").style.display = "none";

	resumeTimer();
	initMap();
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

function openmodal(modalname) {
	document.getElementById(`${modalname}`).style.display = "flex";
}

function toggleModal() {
	if (resultModal.style.display === "flex") {
		resultModal.style.display = "none";
	} else {
		resultModal.style.display = "flex";
	}
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

function closeAllModals() {
	Array.from(document.getElementsByClassName("modalCloseButton")).forEach((button) => {
		button.click();
	});
}

function clearImageCache() {
	const domains = ["streetviewpixels-pa.googleapis.com", "lh3.ggpht.com", "maps.googleapis.com"];
	const images = document.querySelectorAll("img");

	images.forEach((img) => {
		const matchedDomain = domains.find((domain) => img.src.includes(domain));
		if (matchedDomain) {
			img.src = "";
		}
	});
}

function saveRoundLimit() {
	roundLimit = document.getElementById("roundLimitSelector").value;
	localStorage.setItem("roundLimit", roundLimit);
}

function saveGameMode() {
	menuModeToggle = document.getElementById("gameModeSelector").value;
	localStorage.setItem("gamemode", menuModeToggle);
}

function createMatchSharingCode() {
	matchSharingCode = selectedGameMode;
	for (let i = 0; i < roundLimit; i++) {
		matchSharingCode += "/";
		matchSharingCode += actualCoordinates[i].lat;
		matchSharingCode += "/";
		matchSharingCode += actualCoordinates[i].lng;
	}
	matchSharingCode = encodeUTF8toBase64(matchSharingCode);
}

function copyMatchSharingCode() {
	navigator.clipboard.writeText(matchSharingCode).then(() => {
		alert("Match sharing code copied! Share it with your friends to play the same locations!");
	});
}

function encodeUTF8toBase64(str) {
	return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64toUTF8(str) {
	return decodeURIComponent(escape(atob(str)));
}

function enterMatchSharingCode() {
	let theCode = document.getElementById("matchSharingCodeInput").value;
	theCode = decodeBase64toUTF8(theCode);

	const parts = theCode.split("/");
	const districtName = parts[0];
	const coordinates = parts.slice(1).map(Number);
	const roundsCount = coordinates.length / 2;

	const rounds = [];
	for (let i = 0; i < coordinates.length; i += 2) {
		rounds.push({ lat: coordinates[i], lng: coordinates[i + 1] });
	}

	actualCoordinates.fill(0, 0, roundLimit);
	actualCoordinates.length = 0;
	actualCoordinates = rounds;
	selectedGameMode = districtName;
	roundLimit = roundsCount;

	currentlyPlayingSharedGame = true;
	startGame();
}

function sortStatistics(criteria) {
	const statisticsMenuText = document.getElementById("statisticsMenuText");
	const statisticsElements = Array.from(statisticsMenuText.querySelectorAll("p"));

	if (statisticsElements.length === 0 || document.getElementById("statisticsMenuText").innerText == "You need to be logged in to do this!") {
		alert("No statistics to sort! Please fetch your statistics first.");
		return;
	}

	statisticsElements.sort((a, b) => {
		const parseData = (text, pattern) => {
			const match = text.match(pattern);
			return match ? parseFloat(match[1]) : 0;
		};

		const patterns = {
			highscores: /High Score: (\d+)/,
			gamesplayed: /Games Played: (\d+)/,
			roundsplayed: /Rounds Played: (\d+)/,
			successpercentage: /Success Percentage: ([\d.]+)%/,
		};

		const valueA = parseData(a.textContent, patterns[criteria]);
		const valueB = parseData(b.textContent, patterns[criteria]);

		return valueB - valueA;
	});

	statisticsMenuText.innerHTML = "";
	statisticsElements.forEach((element) => statisticsMenuText.appendChild(element));
}

function getNewRandomLocation(radius) {
	const r = radius / 6378137,
		θ = Math.random() * 2 * Math.PI;
	return {
		lat: randomLocation.lat + (r * Math.cos(θ) * 180) / Math.PI,
		lng: randomLocation.lng + (r * Math.sin(θ) * 180) / Math.PI / Math.cos((randomLocation.lat * Math.PI) / 180),
	};
}

function toggleButton() {
	const button = document.getElementById("modaltoggle-button");
	if (button.innerHTML.includes("M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7")) {
		button.setAttribute("title", "Toggle the Results");
		button.setAttribute("onclick", "toggleModal()");
		button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="40" height="40" stroke-width="2">
                <path d="M12 13v-8l-3 3m6 0l-3 -3"></path>
                <path d="M9 17l1 0"></path>
                <path d="M14 17l1 0"></path>
                <path d="M19 17l1 0"></path>
                <path d="M4 17l1 0"></path>
            </svg>
        `;
	} else {
		button.setAttribute("title", "Take a Hint");
		button.setAttribute("onclick", "useHint()");
		button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="40" height="40" stroke-width="2">
                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"></path>
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"></path>
                <path d="M9.7 17l4.6 0"></path>
            </svg>
        `;
	}
}

function useHint() {
	if (!hintsAreEnabled) {
		if (confirm("Are you sure you want to use a hint? 200 Points will be deducted.")) {
			hintsAreEnabled = true;
			let distance;

			if (selectedGameMode == "Every District") {
				distance = 5000;
			} else {
				distance = 500;
			}

			let randomNumber = Math.floor(Math.random() * distance);
			const newCircleCenter = getNewRandomLocation(randomNumber);

			hintCircle = new google.maps.Circle({
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#FF0000",
				fillOpacity: 0.35,
				map: minimap,
				center: newCircleCenter,
				radius: distance,
				clickable: false,
			});

			minimap.setCenter(new google.maps.LatLng(newCircleCenter.lat, newCircleCenter.lng));
		}
	}
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

document.querySelectorAll("button").forEach((button) => {
	const buttonStyle = window.getComputedStyle(button);
	if (buttonStyle.backgroundColor === "rgba(0, 0, 0, 0.8)") {
		button.addEventListener("mouseenter", () => {
			button.style.backgroundColor = "gray";
		});
		button.addEventListener("mouseleave", () => {
			if (!button.disabled) {
				button.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
			}
		});
	}
});

document.querySelectorAll(".faq-question").forEach((question) => {
	question.addEventListener("click", () => {
		document.querySelectorAll(".faq").forEach((faq) => {
			if (faq !== question.parentElement) {
				faq.classList.remove("open");
			}
		});

		const faq = question.parentElement;
		faq.classList.toggle("open");
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	if (!gameOngoing && !initiallyGreenDistricts.length == 0) {
		removeAllDistricts();
	} else if (!gameOngoing && initiallyGreenDistricts.length == 0) {
		addAllDistricts();
	}
});

let marker = new Image();
marker.src = "static/images/redpin.png";
marker.onload = function () {
	marker = null;
};
