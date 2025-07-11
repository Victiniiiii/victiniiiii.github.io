let toggleStates;
let WebPSupport = 2;
let itemsarray = [
	{
		name: "Flawless Jasper Gemstone",
		id: "FLAWLESS_JASPER_GEMSTONE",
		price: "0",
		dropchance: "61442.4",
		auctionorbazaar: "BZ",
		image: "FLAWLESS_JASPER_GEM",
	},
];

let derpy = false;
let diaz = false;
let molePet = false;
let diamondPerk = false;
let taxRate = localStorage.getItem("taxRate") ? parseFloat(localStorage.getItem("taxRate")) : 1;

document.getElementById("TaxRateText").innerText = "%" + taxRate;
document.querySelectorAll(".three-way-toggle").forEach(toggle => {
	if (taxRate == 1) {
		toggle.classList.remove("middle");
		toggle.classList.remove("active");
	} else if (taxRate == 1.125) {
		toggle.classList.remove("active");
		toggle.classList.add("middle");
	} else if (taxRate == 1.25) {
		toggle.classList.remove("middle");
		toggle.classList.add("active");
	}
});

document.addEventListener("DOMContentLoaded", function () {
	var webptest = new Image(1, 1);
	webptest.src = "/static/imageswebp/webpdot.webp";
	webptest.width > 0 && webptest.height > 0 ? (WebPSupport = 1) : (WebPSupport = 0);

	const savedToggleStates = localStorage.getItem("nucleusRunItems");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
	} else {
		toggleStates = Array(itemsarray.length).fill(true);
	}

	document.getElementById("settings-bar").addEventListener("click", function () {
		document.getElementById("settings").classList.toggle("expanded");
	});

	const container = document.getElementById("toggle-container");

	for (let i = 0; i < itemsarray.length; i++) {
		const item = itemsarray[i];

		const row = document.createElement("div");
		row.className = "toggleitemnamerow";

		const nameDiv = document.createElement("div");
		nameDiv.className = "toggleitemname";
		nameDiv.textContent = item.name;

		const groupDiv = document.createElement("div");
		groupDiv.className = "toggle-group";

		const imagePlaceholder = document.createElement("div");
		imagePlaceholder.className = "NbBsImage";

		const img = document.createElement("img");

		if (WebPSupport == 1) {
			img.src = `static/imageswebp/${itemsarray[i].image ? itemsarray[i].image : itemsarray[i].id}.webp`;
		} else {
			img.src = `static/images/${itemsarray[i].image ? itemsarray[i].image : itemsarray[i].id}.png`;
		}

		imagePlaceholder.appendChild(img);

		const instasellLabel = document.createElement("span");
		instasellLabel.className = "toggle-label";
		instasellLabel.textContent = "Instasell";

		const toggleSwitch = document.createElement("div");
		toggleSwitch.className = "toggle-switch";
		toggleSwitch.dataset.id = item.id;

		const sellOrderLabel = document.createElement("span");
		sellOrderLabel.className = "toggle-label";
		sellOrderLabel.textContent = "Sell Order";

		const newDivThatIMadeUp = document.createElement("div");
		newDivThatIMadeUp.className = "inferno-savior";

		groupDiv.appendChild(imagePlaceholder);
		groupDiv.appendChild(newDivThatIMadeUp);
		newDivThatIMadeUp.appendChild(instasellLabel);
		newDivThatIMadeUp.appendChild(toggleSwitch);
		newDivThatIMadeUp.appendChild(sellOrderLabel);

		const pricesDiv = document.createElement("div");
		pricesDiv.className = "toggle-groupnames";
		pricesDiv.id = `prices${item.id}`;

		row.appendChild(nameDiv);
		row.appendChild(groupDiv);
		row.appendChild(pricesDiv);

		container.appendChild(row);
	}

	document.querySelectorAll(".three-way-toggle").forEach(toggle => {
		toggle.addEventListener("click", function () {
			if (this.classList.contains("active")) {
				this.classList.remove("active");
				this.classList.add("middle");
				taxRate = 1.125;
			} else if (this.classList.contains("middle")) {
				this.classList.remove("middle");
				taxRate = 1;
			} else {
				this.classList.add("active");
				taxRate = 1.25;
			}
			localStorage.setItem("taxRate", taxRate);
			document.getElementById("TaxRateText").innerText = "%" + taxRate;
			bazaarconnect();
		});
	});

	document.querySelectorAll(".toggle-switch").forEach(function (toggleSwitch, index) {
		const dataId = toggleSwitch.getAttribute("data-id");

		["Derpy", "Diaz", "Mole", "HighRoller"].forEach(name => {
			if (dataId === name) {
				toggleSwitch.addEventListener("click", async function () {
					toggleSwitch.classList.toggle("active");
					window[name.toLowerCase()] = !window[name.toLowerCase()];
					document.getElementById(name + "Text").innerText = window[name.toLowerCase()] ? "On" : "Off";
					bazaarconnect();
				});
			}
		});

		if (toggleStates[index - 2]) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}

		toggleSwitch.addEventListener("click", function () {
			toggleSwitch.classList.toggle("active");
			toggleStates[index - 2] = !toggleStates[index - 2];
			localStorage.setItem("nucleusRunItems", JSON.stringify(toggleStates));
			bazaarconnect();
		});
	});

	const nucleusSpace = document.getElementById("nucleusSpace");

	for (let i = 0; i < itemsarray.length; i++) {
		const nbbsText = document.createElement("div");
		nbbsText.className = "NbBsBox";
		nbbsText.id = `NbBsBox${i}`;

		const nbbsImage = document.createElement("img");
		if (WebPSupport == 1) {
			nbbsImage.src = `static/imageswebp/${itemsarray[i].image ? itemsarray[i].image : itemsarray[i].id}.webp`;
		} else {
			nbbsImage.src = `static/images/${itemsarray[i].image ? itemsarray[i].image : itemsarray[i].id}.png`;
		}

		const theBox = document.createElement("div");

		nucleusSpace.appendChild(theBox);
		theBox.appendChild(nbbsImage);
		theBox.appendChild(nbbsText);
	}
	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	let boxesWithProfit = [];

	for (let i = 0; i < itemsarray.length; i++) {
		let price = data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] || 0;
		document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(price.toFixed(0)) + (parseInt(price.toFixed(0)) === 1 ? " coin" : " coins");
		derpy ? (price *= 1 - taxRate / 25) : (price *= 1 - taxRate / 100);
		let profit = diaz ? (itemsarray[i].amount * 10 * (price - itemsarray[i].npc)).toFixed(0) : (itemsarray[i].amount * (price - itemsarray[i].npc)).toFixed(0);

		const box = document.getElementById(`NbBsBox${i}`);
		box.innerHTML = `${itemsarray[i].name}<br>`;
		box.innerHTML += `Profit: ${format(profit)}${parseInt(profit) === 1 ? " coin" : " coins"}<br>`;
		box.innerHTML += `Source: ${itemsarray[i].source}<br>`;

		if (profit > 100000) {
			box.style.backgroundColor = "#0f6319";
		} else if (profit > 10000) {
			box.style.backgroundColor = "#81cc8a";
		} else if (profit > 0) {
			box.style.backgroundColor = "#d5db23";
		} else {
			box.style.backgroundColor = "#db2323";
		}

		if (document.getElementById(`settings${i}`)) {
			box.innerHTML += document.getElementById(`settings${i}`).outerHTML;
		}

		boxesWithProfit.push({ box: box.parentElement, profit: parseFloat(profit) });
	}

	boxesWithProfit.sort((a, b) => b.profit - a.profit);

	const NbBsSpace = document.getElementById("NbBsSpace");
	boxesWithProfit.forEach(item => NbBsSpace.appendChild(item.box));
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function printStuff() {
	let averageDrops = 16.5;
	if (molePet) averageDrops++;
	if (diamondPerk) averageDrops++;
}
