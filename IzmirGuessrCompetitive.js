import { districtsData } from './IzmirGuessrCoordinates.js';

// Game Points:
const roundPoints = [0,0,0,0,0];
const guessedCoordinates = [0,0,0,0,0];
const actualCoordinates = [0,0,0,0,0];
let totalPoints = 0;

// Loading Highscore:

let highscore = localStorage.getItem("highscore") ? parseInt(localStorage.getItem("highscore")) : 0;
document.getElementById("highscore").textContent = `Best Score: ${highscore}`;

// Game Settings:

const initialLat = 38.609979;
const initialLon = 27.398601;
const initialZoom = 9;
const roundsPerGame = 5;
let roundCount = 1; // The round we are currently at
let timerSeconds = 60; // Pre-selected timer

let guessedLocationMarker;
let randomLocation;
let minimap;
let roundTimer;
let selectedTimeLimit = "No Time Limit";
let isTimerPaused = false;
let finalgoruntulendimi = "false";
const initiallyGreenDistricts = [];
const districtLayers = [];

const startPage = document.getElementById("startpage");
const gamemap = document.getElementById("gamemap");
const returnButton = document.getElementById("returnbutton");
const modaltogglebutton = document.getElementById("modaltoggle-button");
const overlayContainer = document.getElementById("overlay-container");
const finalresultsmodal = document.getElementById("final-results-modal");
const buttonrow = document.getElementById("buttonrow");
const mapContainer = document.getElementById("gamemap");
const resultModal = document.getElementById("result-modal");


const map2 = L.map("map2", {
	maxZoom: 11,
	minZoom: 9,
	maxBounds: [
		[39.444306, 28.559917], [37.808722, 26.203444] // (north, east, south, west)		
	],
}).setView([initialLat, initialLon], initialZoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "� OpenStreetMap contributors" }).addTo(map2);

function isPointInPolygon(point, polygon) {
	var x = point[0],
		y = point[1];
	var inside = false;
	for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		var xi = polygon[i][0],
			yi = polygon[i][1];
		var xj = polygon[j][0],
			yj = polygon[j][1];
		var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

districtsData.forEach((district) => {
	const polygon = L.polygon(district.coordinates, { fill: true, color: "green" }).addTo(map2);
	districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

	if (district.state === 1) {
		initiallyGreenDistricts.push({ bounds: district.bounds });
	}
});

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
			updateDistrictAndButtonState(district);
			formatlama();
		}
	});
});

function updateDistrictAndButtonState(district) {
	const button = document.querySelector(`.ilcebutton[data-district="${district.name}"]`);

	if (district.layer.options.fill) {
		district.layer.setStyle({ fill: false, color: "red" });
		district.state = 0;
		button.style.backgroundColor = "red";

		const index = initiallyGreenDistricts.findIndex((greenDistrict) => greenDistrict.bounds === district.bounds);
		if (index !== -1) {
			initiallyGreenDistricts.splice(index, 1);
		}
	} else {
		district.layer.setStyle({ fill: true, color: "green" });
		district.state = 1;
		button.style.backgroundColor = "green";

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}
	}

	let lengthh = [initiallyGreenDistricts.length];
	ilcesayisi.innerText = `Current District Count: ${lengthh}`;
}

function formatlama() {
	let formattedBounds = initiallyGreenDistricts.map((district) => district.bounds);
	shuffleArray(formattedBounds);
	return formattedBounds[0];
}

function getRandomLocation() {
	var polygon = formatlama();

	var minX = polygon[0][0];
	var maxX = polygon[0][0];
	var minY = polygon[0][1];
	var maxY = polygon[0][1];
	for (var i = 1; i < polygon.length; i++) {
		minX = Math.min(minX, polygon[i][0]);
		maxX = Math.max(maxX, polygon[i][0]);
		minY = Math.min(minY, polygon[i][1]);
		maxY = Math.max(maxY, polygon[i][1]);
	}

	var lat;
	var lng;
	do {
		lat = Math.random() * (maxX - minX) + minX;
		lng = Math.random() * (maxY - minY) + minY;
	} while (!isPointInPolygon([lat, lng], polygon));

	return { lat, lng };
}

function loadGoogleMapsAPI(callback) {
	const script = document.createElement("script");
	script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvjbX7ao3UbTO56SwG9IJ_KAXOtM5Guo4&libraries=places&v=weekly&callback=${callback}`;
	document.body.appendChild(script);
}

function initMap() {
	function initializeMapWithRandomLocation() {
		randomLocation = getRandomLocation();

		startPage.style.display = "none";
		mapContainer.style.display = "block";
		returnButton.style.display = "block";
		overlayContainer.style.display = "block";
		buttonrow.style.display = "flex";
		document.getElementById("final-results-modal").style.display = "none";
		resultModal.style.display = "none";
		document.getElementById("modaltoggle-button").style.display = "none";
		document.getElementById("timer").style.display = "block";

		resumeTimer();

		if (roundTimer) {
			clearInterval(roundTimer);
		}
		timerSeconds = getSecondsFromTimeLimit(selectedTimeLimit);
		roundTimer = setInterval(updateTimer, 1000);
		updateTimerDisplay();

		gamemap = new google.maps.Map(document.getElementById("gamemap"), {
			center: randomLocation,
			zoom: 14,
			streetViewControl: false,
			addressControl: false,
		});

		const streetViewService = new google.maps.StreetViewService();

		streetViewService.getPanorama({ location: randomLocation, radius: 50 }, function (data, status) {
			if (status === "OK") {
				const panorama = new google.maps.StreetViewPanorama(document.getElementById("gamemap"), {
					position: randomLocation,
					pov: { heading: 34, pitch: 1 },
					zoom: 1,
					addressControl: false,
					streetViewControl: false,
				});

				gamemap.setStreetView(panorama);

				minimap = new google.maps.Map(document.getElementById("mini-map"), {
					center: { lat: 38.4192, lng: 27.1287 },
					zoom: 10,
					draggable: true,
					streetViewControl: false,
					mapTypeControl: false,
					clickableIcons: false,
				});

				google.maps.event.addListener(minimap, "click", function (event) {
					if (guessedLocationMarker) {
						guessedLocationMarker.setMap(null);
					}

					guessedLocationMarker = new google.maps.Marker({
						position: event.latLng,
						map: minimap,
						title: "Guessed Location",
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
					});
				});

				const confirmButton = document.getElementById("action-button");

				confirmButton.addEventListener("click", function () {
					const distance = google.maps.geometry.spherical.computeDistanceBetween(guessedLocationMarker.getPosition(), randomLocation);

					const points = calculatePoints(distance);

					displayResults(distance, points);
				});
			} else {
				initializeMapWithRandomLocation();
			}
		});
	}
	initializeMapWithRandomLocation();
}

function toggleModal() {
	if (roundCount >= 1 && roundCount <= 4) {
		if (resultModal.style.display === "block") {
			resultModal.style.display = "none";
		} else {
			resultModal.style.display = "block";
		}
	}

	if (roundCount === 5) {
		if (resultModal.style.display === "block") {
			resultModal.style.display = "none";
			finalresultsmodal.style.display = "none";
		} else if (finalresultsmodal.style.display === "block") {
			finalresultsmodal.style.display = "none";
			resultModal.style.display = "none";
		} else if (resultModal.style.display === "none" && finalresultsmodal.style.display === "none" && finalgoruntulendimi === "false") {
			resultModal.style.display = "block";
		} else {
			finalresultsmodal.style.display = "block";
		}
	}
}

function returnToStart() {
	gamemap = new google.maps.Map(document.getElementById("gamemap"), {
		center: randomLocation,
		zoom: 14,
		streetViewControl: false,
		addressControl: false,
	});

	const streetViewService = new google.maps.StreetViewService();

	streetViewService.getPanorama({ location: randomLocation, radius: 50 }, function (data, status) {
		if (status === "OK") {
			const panorama = new google.maps.StreetViewPanorama(document.getElementById("gamemap"), {
				position: randomLocation,
				pov: { heading: 34, pitch: 1 },
				zoom: 1,
				streetViewControl: false,
				addressControl: false,
			});

			gamemap.setStreetView(panorama);
		} else {
			returnToStart();
		}
	});
}

function calculatePoints(distance) {
	const maxPoints = 1000;
	const minPoints = 0;

	const distanceFactor = 0.1;
	let points = Math.max(minPoints, maxPoints - distance * distanceFactor);

	if (points >= 990) {
		points = 1000;
	}

	return points.toFixed(0);
}

function displayResults(distance, points) {
	if (roundCount >= 1 && roundCount <= 5) {
        roundPoints[roundCount] = parseInt(points);        
    }    

	if (totalPoints > highscore) {
		highscore = totalPoints;
		localStorage.setItem("highscore", highscore);
	}
	document.getElementById("highscore").textContent = `Best Score: ${highscore}`;

	const resultMap = new google.maps.Map(document.getElementById("result-map"), {
		center: randomLocation,
		zoom: getZoomLevel(distance),
		streetViewControl: false,
		mapTypeControl: false,
		clickableIcons: false,
	});

	new google.maps.Marker({
		position: randomLocation,
		map: resultMap,
		title: "Correct Answer",
		icon: "static/images/greenpin.png",
	});

	guessedLocationMarker.setMap(resultMap);

	document.getElementById("distance-info").textContent = `Distance: ${distance.toFixed(0)} meters`;
	document.getElementById("points-info").textContent = `Points Earned: ${points}`;

    for (i = 0; i < 5; i++) {
        totalPoints += roundPoints[i]
    }

	document.getElementById("totalPoints").textContent = `Total Points: ${totalPoints}`;
	document.getElementById("totalPoints2").textContent = `Total Points: ${totalPoints}`;

	document.getElementById("result-modal").style.display = "block";
	document.getElementById("overlay-container").style.display = "none";
	document.getElementById("modaltoggle-button").style.display = "block";
	pauseTimer();

	const guessedLatLng = guessedLocationMarker.getPosition().toJSON();

	const lineCoordinates = [
		{ lat: guessedLatLng.lat, lng: guessedLatLng.lng },
		{ lat: randomLocation.lat, lng: randomLocation.lng },
	];

	const line = new google.maps.Polyline({
		path: lineCoordinates,
		geodesic: true,
		strokeColor: "#FF0000", // red
		strokeOpacity: 1.0,
		strokeWeight: 2,
	});

	line.setMap(resultMap);
	document.getElementById("gamemap").style.opacity = "1";
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
	roundCount = 1;
	totalPoints = 0;

    for (i = 0; i < 5; i++) {
        roundPoints[i] = 0
    }

	finalgoruntulendimi = "false";

	initMap();
	resumeTimer();
}

function returnToMainMenu() {
	roundCount = 1;
	totalPoints = 0;

	for (i = 0; i < 5; i++) {
        roundPoints[i] = 0
    }

	finalgoruntulendimi = "false";

	startPage.style.display = "flex";
	mapContainer.style.display = "none";
	returnButton.style.display = "none";
	modaltogglebutton.style.display = "none";
	overlayContainer.style.display = "none";
	finalresultsmodal.style.display = "none";
	buttonrow.style.display = "none";
	document.getElementById("result-modal").style.display = "none";
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "� OpenStreetMap contributors" }).addTo(map2);
	pauseTimer();
}

function startGame() {
	finalgoruntulendimi = "false";
	getSecondsFromTimeLimit();
	loadGoogleMapsAPI("initMap");
	initMap();
}

function startNextGame() {
	if (roundCount % roundsPerGame === 0) {
		document.getElementById("final-results-modal").style.display = "block";
		finalgoruntulendimi = "true";
		document.getElementById("overlay-container").style.display = "none";
	} else {
		document.getElementById("overlay-container").style.display = "block";
		document.getElementById("modaltoggle-button").style.display = "none";
		document.getElementById("result-modal").style.display = "none";
		modaltogglebutton.style.display = "none";
		resumeTimer();
		initMap();
		++roundCount;
	}
}

function addAllDistricts() {
	const buttons = document.querySelectorAll(".ilcebutton");
	buttons.forEach((button) => {
		button.style.backgroundColor = "green";
	});
	districtLayers.forEach((district) => {
		district.layer.setStyle({ fill: true, color: "green" });
		district.state = 1;

		if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
			initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
		}

		let lengthh = [initiallyGreenDistricts.length];
		ilcesayisi.innerText = `Current District Count: ${lengthh}`;
	});
}

function removeAllDistricts() {
	const buttons = document.querySelectorAll(".ilcebutton");
	buttons.forEach((button) => {
		button.style.backgroundColor = "red";
	});
	districtLayers.forEach((district) => {
		district.layer.setStyle({ fill: false, color: "red" });
		district.state = 0;

		const index = initiallyGreenDistricts.findIndex((greenDistrict) => greenDistrict.bounds === district.bounds);
		if (index !== -1) {
			initiallyGreenDistricts.splice(index, 1);
		}

		let lengthh = [initiallyGreenDistricts.length];
		ilcesayisi.innerText = `Current District Count: ${lengthh}`;
	});
}

function toggleDistrict(districtName) {
	const button = document.querySelector(`.ilcebutton[data-district="${districtName}"]`);
	const district = districtLayers.find((district) => district.name === districtName);
	if (district) {
		if (district.layer.options.fill) {
			district.layer.setStyle({ fill: false, color: "red" });
			district.state = 0;

			const index = initiallyGreenDistricts.findIndex((greenDistrict) => greenDistrict.bounds === district.bounds);
			button.style.backgroundColor = "red";
			if (index !== -1) {
				initiallyGreenDistricts.splice(index, 1);
			}
		} else {
			district.layer.setStyle({ fill: true, color: "green" });
			district.state = 1;
			button.style.backgroundColor = "green";

			if (!initiallyGreenDistricts.some((greenDistrict) => greenDistrict.bounds === district.bounds)) {
				initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
			}
		}
		let lengthh = [initiallyGreenDistricts.length];
		ilcesayisi.innerText = `Current District Count: ${lengthh}`;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll(".ilcebutton");
	buttons.forEach((button) => {
		button.style.backgroundColor = "green";
	});
});

function updateTimerDisplay() {
	let displayText;
	if (timerSeconds === Infinity) {
		displayText = "Remaining: No Time Limit";
	} else {
		displayText = `Remaining: ${timerSeconds} Seconds`;
	}
	document.getElementById("timer").textContent = displayText;
}

function updateTimer() {
	getSecondsFromTimeLimit();
	if (!isTimerPaused) {
		if (selectedTimeLimit !== "No Time Limit" && timerSeconds > 0) {
			timerSeconds--;
			updateTimerDisplay();
		} else if (selectedTimeLimit !== "No Time Limit" && timerSeconds === 0) {
			clearInterval(roundTimer);
			document.getElementById("gamemap").style.opacity = "0";
		}
	}
}

function getSecondsFromTimeLimit(timeLimit) {
	return parseInt(timeLimit) || Infinity;
}

function changeTimeLimit(timeLimit) {
	selectedTimeLimit = timeLimit;

	if (timeLimit === Infinity) {
		document.getElementById("timer").textContent = "Remaining: No Time Limit";
		clearInterval(roundTimer);
	} else {
		const seconds = getSecondsFromTimeLimit(timeLimit);
		document.getElementById("timer").textContent = `Remaining: ${seconds} Seconds`;
	}
}

function endRound() {
	clearInterval(roundTimer);
}

function pauseTimer() {
	isTimerPaused = true;
	clearInterval(roundTimer);
}

function resumeTimer() {
	isTimerPaused = false;
}

overlayContainer.addEventListener("mouseenter", function () {
	overlayContainer.classList.add("hovered");
});

overlayContainer.addEventListener("mouseleave", function () {
	overlayContainer.classList.remove("hovered");
});

const faqButton = document.getElementById("izmirfaq");
const faqMenu = document.getElementById("faq-menu");
const startPageLeftHalf = document.querySelector(".startpagelefthalf");

faqButton.addEventListener("click", function () {
	faqMenu.classList.toggle("show");

	if (startPageLeftHalf.style.display === "none") {
		startPageLeftHalf.style.display = "block";
	} else {
		startPageLeftHalf.style.display = "none";
	}
});

function saveSelectedTimeLimit() {
	const selectedTimeLimit = document.getElementById("izmirtime").value;
	localStorage.setItem("selectedTimeLimit", selectedTimeLimit);
}

function loadSelectedTimeLimit() {
	const savedTimeLimit = localStorage.getItem("selectedTimeLimit");
	if (savedTimeLimit) {
		document.getElementById("izmirtime").value = savedTimeLimit;
		selectedTimeLimit = savedTimeLimit;
		updateTimerDisplay();
	}
}

document.getElementById("izmirtime").addEventListener("change", saveSelectedTimeLimit);
window.addEventListener("load", loadSelectedTimeLimit);

buttonrow.style.display = "none";
gamemap.style.display = "none";