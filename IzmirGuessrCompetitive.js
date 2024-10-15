// Game Points:

let roundPoints = [0, 0, 0, 0, 0];
let guessedCoordinates = [0, 0, 0, 0, 0];
let actualCoordinates = [0, 0, 0, 0, 0];
let totalPoints = 0;

// Game Settings:

let selectedDistrict;
let roundCount = 0; // The round we are currently at (0 to 4)
let timerSeconds = 30;
let theKey = "AIzaSyBvjbX7ao3UbTO56SwG9IJ_KAXOtM5Guo4"; // It's restricted to the page

// HTML Elements:

const startPage = document.getElementById("startpage");
const returnButton = document.getElementById("returnbutton");
const modaltogglebutton = document.getElementById("modaltoggle-button");
const overlayContainer = document.getElementById("overlay-container");
const finalresultsmodal = document.getElementById("final-results-modal");
const buttonrow = document.getElementById("buttonrow");
const resultModal = document.getElementById("result-modal");
const confirmButton = document.getElementById("action-button");
const faqButton = document.getElementById("izmirfaq");
const faqMenu = document.getElementById("faq-menu");
const startPageLeftHalf = document.querySelector(".startpagelefthalf");
const buttons = document.querySelectorAll(".ilcebutton");
let gamemap = document.getElementById("gamemap"); // Has to be "let"

// Game Elements:

let guessedLocationMarker;
let randomLocation;
let minimap;
let roundTimer;
let isTimerPaused = false;
let finalgoruntulendimi = false;
const initiallyGreenDistricts = [];
const districtLayers = [];

// Leaflet Map:

const initialLat = 38.609979;
const initialLon = 27.398601;
let initialZoom;
let maxZoomValue;
let minZoomValue;

if (parseInt(window.getComputedStyle(document.getElementById("title-section")).width) < 768) {
    maxZoomValue = 9;
    minZoomValue = 7;
    initialZoom = 8;
} else {
    maxZoomValue = 10;
    minZoomValue = 8;
    initialZoom = 9;
}

const map2 = L.map("map2", {
    maxZoom: maxZoomValue,
    minZoom: minZoomValue,
    maxBounds: [
        [39.444306, 28.559917],
        [37.808722, 26.203444],
    ], // (North, East, South, West)
}).setView([initialLat, initialLon], initialZoom);


L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
	attribution: "© OpenStreetMap contributors © CartoDB",
	subdomains: "abcd",
	maxZoom: 19,
}).addTo(map2);

// Functions:

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
    let selectedBounds = formattedBounds[0];    
    selectedDistrict = districtsData.find(district => district.bounds === selectedBounds).name;
    return selectedBounds;
}

function getRandomLocation() {
	let polygon = formatlama();
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
	function initializeMapWithRandomLocation() {
		randomLocation = getRandomLocation();

        document.getElementById("modaltoggle-button").style.display = "none";
		document.getElementById("timer").style.display = "block";
        document.getElementById("final-results-modal").style.display = "none";		
		document.getElementById("gamemap").style.display = "block";
		returnButton.style.display = "block";
		overlayContainer.style.display = "block";
		buttonrow.style.display = "flex";
		startPage.style.display = "none";
		resultModal.style.display = "none";

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

				minimap = new google.maps.Map(document.getElementById("mini-map"), {
					center: { lat: 38.4192, lng: 27.1287 },
					zoom: 10,
					draggable: true,
					mapTypeControl: false,
					clickableIcons: false,
					...panoramaOptions,
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
                document.getElementById("timer").textContent = `Remaining: ${timerSeconds} Seconds`;
                roundTimer = setInterval(updateTimer, 1000);
			} else {
				initializeMapWithRandomLocation();
			}
		});
	}
	initializeMapWithRandomLocation();
}

function toggleModal() {
	if (roundCount < 4) {
		if (resultModal.style.display === "block") {
			resultModal.style.display = "none";
		} else {
			resultModal.style.display = "block";
		}
	}

	if (roundCount == 4) {
		if (resultModal.style.display === "block") {
			resultModal.style.display = "none";
			finalresultsmodal.style.display = "none";
		} else if (finalresultsmodal.style.display === "block") {
			finalresultsmodal.style.display = "none";
			resultModal.style.display = "none";
		} else if (resultModal.style.display === "none" && finalresultsmodal.style.display === "none" && !finalgoruntulendimi) {
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
	pauseTimer();
	document.getElementById("gamemap").style.opacity = "1";
	roundPoints[roundCount] = parseInt(points);
	totalPoints += roundPoints[roundCount];

	document.getElementById("distance-info").textContent = `Distance: ${distance.toFixed(0)} meters`;
	document.getElementById("points-info").textContent = `Points Earned: ${points}`;
	document.getElementById("totalPoints").textContent = `Total Points: ${totalPoints}`;
	document.getElementById("totalPoints2").textContent = `Total Points: ${totalPoints}`;

	document.getElementById("result-modal").style.display = "block";
	document.getElementById("overlay-container").style.display = "none";
	document.getElementById("modaltoggle-button").style.display = "block";

	const resultMap = new google.maps.Map(document.getElementById("result-map"), {
		center: randomLocation,
		zoom: getZoomLevel(distance),
		mapTypeControl: false,
		clickableIcons: false,
		...panoramaOptions,
	});

	guessedLocationMarker.setMap(resultMap);
	const guessedLatLng = guessedLocationMarker.getPosition().toJSON();
	guessedCoordinates[roundCount] = { lat: guessedLatLng.lat, lng: guessedLatLng.lng };
	actualCoordinates[roundCount] = { lat: randomLocation.lat, lng: randomLocation.lng };

	if (roundCount < 4) {
		new google.maps.Marker({
			position: randomLocation,
			map: resultMap,
			title: "Correct Answer",
			icon: "static/images/greenpin.png",
		});

		const lineCoordinates = [guessedCoordinates[roundCount], actualCoordinates[roundCount]];
		const line = new google.maps.Polyline({
			path: lineCoordinates,
			geodesic: true,
			strokeColor: "#FF0000", // Red
			strokeOpacity: 1.0,
			strokeWeight: 4,
		});

		line.setMap(resultMap);
	} else {
		const colors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF00FF"]; // Red, Yellow, Green, Blue, Magenta
		for (let i = 0; i < 5; i++) {
			new google.maps.Marker({
				position: guessedCoordinates[i],
				map: resultMap,
				title: `Guessed Location ${i + 1}`,
				icon: `static/images/redpin${i + 1}.png`,
			});

			new google.maps.Marker({
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

			line.setMap(resultMap);
		}
	}
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
	totalPoints = 0;
	roundPoints = [0, 0, 0, 0, 0];
	guessedCoordinates = [0, 0, 0, 0, 0];
	actualCoordinates = [0, 0, 0, 0, 0];
	finalgoruntulendimi = false;

	initMap();
	resumeTimer();
}

function returnToMainMenu() {
	roundCount = 0;
	totalPoints = 0;
	roundPoints = [0, 0, 0, 0, 0];
	guessedCoordinates = [0, 0, 0, 0, 0];
	actualCoordinates = [0, 0, 0, 0, 0];
	finalgoruntulendimi = false;

	startPage.style.display = "flex";
	returnButton.style.display = "none";
	modaltogglebutton.style.display = "none";
	overlayContainer.style.display = "none";
	finalresultsmodal.style.display = "none";
	buttonrow.style.display = "none";
	document.getElementById("result-modal").style.display = "none";
	document.getElementById("gamemap").style.display = "none";/*

	L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap contributors © CartoDB",
        subdomains: "abcd",
        maxZoom: 19,
    }).addTo(map2);*/
	pauseTimer();
}

function startGame() {
	finalgoruntulendimi = false;
    initMap();
}

function startNextGame() {
	if (roundCount == 4) {        
		document.getElementById("final-results-modal").style.display = "block";		
		document.getElementById("overlay-container").style.display = "none";
        finalgoruntulendimi = true;
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

function updateTimer() {
	if (!isTimerPaused) {
		if (timerSeconds > 0) {
			timerSeconds--;
			document.getElementById("timer").textContent = `Remaining: ${timerSeconds} Seconds`;
		} else {
			clearInterval(roundTimer);
			document.getElementById("gamemap").style.opacity = "0";
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

// Adding Event Listeners:

overlayContainer.addEventListener("mouseenter", function () {
	overlayContainer.classList.add("hovered");
});

overlayContainer.addEventListener("mouseleave", function () {
	overlayContainer.classList.remove("hovered");
});

faqButton.addEventListener("click", function () {
	faqMenu.classList.toggle("show");

	if (startPageLeftHalf.style.display === "none") {
		startPageLeftHalf.style.display = "block";
	} else {
		startPageLeftHalf.style.display = "none";
	}
});

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