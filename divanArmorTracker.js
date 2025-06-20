let toggleStates;
let itemsarray = [
	{
		name: "Gemstone Mixture",
		id: "GEMSTONE_MIXTURE",
		price: "0",
		toggle: false,
	},
	{
		name: "Divan Fragment",
		id: "DIVAN_FRAGMENT",
		price: "0",
		toggle: false,
	},
	{
		name: "Flawless Ruby Gemstone",
		id: "FLAWLESS_RUBY_GEM",
		price: "0",
		toggle: false,
	},
	{
		name: "Glossy Gemstone",
		id: "GLOSSY_GEMSTONE",
		price: "0",
		toggle: false,
	},
	{
		name: "Refined Mineral",
		id: "REFINED_MINERAL",
		price: "0",
		toggle: false,
	},
	{
		name: "Enchanted Gold Block",
		id: "ENCHANTED_GOLD_BLOCK",
		price: "0",
		toggle: false,
	},
	{
		name: "Divan's Powder Coating",
		id: "DIVAN_POWDER_COATING",
		price: "0",
		toggle: false,
	},
];

let data;
let derpy = false;
let armorPrices = [0, 0, 0, 0];
let armorCosts = [0, 0, 0, 0];
const mixtures = [5, 8, 7, 4];
const armorPieces = ["Divan_Helmet", "Divan_Chestplate", "Divan_Leggings", "Divan_Boots"];
let taxRate;

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getPricesFromAPI() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	data = await response.json();
	await auctionsAPI();
}

async function auctionsAPI() {
	for (let i = 0; i < armorPieces.length; i++) {
		const piece = armorPieces[i];
		const response = await fetch(`https://sky.coflnet.com/api/auctions/tag/${piece}/active/bin`);
		let data = await response.json();
		data = data.slice(0, -5);

		let values = [];
		data.forEach(element => {
			values.push(element.startingBid);
		});

		armorPrices[i] = filterValues(values)[0];
	}

	fillValues();
}

function fillValues() {
	let derpyTax = derpy ? 4 : 1;
	for (let i = 0; i < itemsarray.length; i++) {
		itemsarray[i].price = Math.round(data.products[itemsarray[i].id]?.quick_status[itemsarray[i].toggle ? "buyPrice" : "sellPrice"]);
		document.getElementById(`prices${itemsarray[i].id}`).innerText = format(itemsarray[i].price.toFixed(0)) + " coins";
	}

	for (let i = 0; i < 4; i++) {
		armorCosts[i] = (10 * Number(itemsarray[0].price) + mixtures[i] * Number(itemsarray[1].price) + Number(itemsarray[2].price)).toFixed(0);
		document.getElementById(`cost${i}`).innerHTML = `<p>Total Cost: ${format(armorCosts[i]) + " coins"}</p>`;
	}

	let powderCoatPrice = Math.round(data.products[itemsarray[6].id]?.quick_status[itemsarray[6].toggle ? "buyPrice" : "sellPrice"]);

	document.getElementById("cost4").innerHTML = `<p>Total Cost: ${format(itemsarray[3].price * 32 + itemsarray[4].price * 32 + itemsarray[5].price * 16 + itemsarray[1].price * 5) + " coins"}</p>`;
	document.getElementById("auction4").innerHTML = `Bazaar Price: ${format(powderCoatPrice)} coins`;

	for (let i = 0; i < armorPieces.length; i++) {
		document.getElementById(`tax${i}`).innerHTML = `Taxes: ${format((armorPrices[i] - substractTaxes(armorPrices[i])).toFixed(0))} coins.`;
		document.getElementById(`auction${i}`).innerHTML = `Auction Price: ${format(armorPrices[i])} coins`;
		document.getElementById(`notax${i}`).innerHTML = `After Taxes: ${format(substractTaxes(armorPrices[i]).toFixed(0))} coins.`;
		document.getElementById(`profit${i}`).innerHTML = `Profit: ${format((substractTaxes(armorPrices[i]) - armorCosts[i]).toFixed(0))} coins.`;
	}

	document.getElementById("tax4").innerHTML = `Taxes: ${format(Math.round((powderCoatPrice * taxRate * derpyTax) / 100))} coins`;
	document.getElementById("notax4").innerHTML = `After Taxes: ${format(Math.round((powderCoatPrice * (100 - taxRate * derpyTax)) / 100))} coins`;
	document.getElementById("profit4").innerHTML = `Profit: ${format(Math.round((powderCoatPrice * (100 - taxRate * derpyTax)) / 100) - (itemsarray[3].price * 32 + itemsarray[4].price * 32 + itemsarray[5].price * 16 + itemsarray[1].price * 5))} coins`;
}

function substractTaxes(input) {
	let taxes = 1200; // 2 Days of auctioning
	if (input < 10000000) {
		taxes += input / 100;
	} else if (input < 100000000) {
		taxes += (input / 100) * 3;
	} else {
		taxes += (input / 100) * 3.5;
	}

	if (derpy) taxes *= 4;
	if (input - taxes < 1000000 && input < 1200000) return 1000000;
	return input - taxes;
}

function filterValues(arr) {
	if (arr.length === 0) {
		return arr;
	}

	const sortedArr = arr.slice().sort((a, b) => a - b);
	const q1 = sortedArr[Math.floor(sortedArr.length / 4)];
	const q3 = sortedArr[Math.floor((sortedArr.length * 3) / 4)];
	const iqr = q3 - q1;

	const lowerBound = q1 - 1.5 * iqr;
	const upperBound = q3 + 1.5 * iqr;

	return arr.filter(value => value >= lowerBound && value <= upperBound);
}

document.addEventListener("DOMContentLoaded", async function () {
	let webptest = new Image(1, 1);
	webptest.src = "/static/imageswebp/webpdot.webp";
	webptest.width > 0 && webptest.height > 0 ? (WebPSupport = true) : (WebPSupport = false);

	taxRate = localStorage.getItem("taxRate") ? parseFloat(localStorage.getItem("taxRate")) : 1;

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

	document.getElementById("settings-bar").addEventListener("click", function () {
		document.getElementById("settings").classList.toggle("expanded");
	});

	const savedToggleStates = localStorage.getItem("toggleStatesDivanTracker");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
		for (let i = 0; i < itemsarray.length && i < toggleStates.length; i++) {
			itemsarray[i].toggle = toggleStates[i];
		}
	} else {
		toggleStates = Array(itemsarray.length).fill(false);
	}

	const savedDerpyState = localStorage.getItem("derpyState");
	if (savedDerpyState !== null) {
		derpy = JSON.parse(savedDerpyState);
	}

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

		if (WebPSupport) {
			img.src = `static/imageswebp/${item.id}.webp`;
		} else {
			img.src = `static/images/${item.id}.png`;
		}

		imagePlaceholder.appendChild(img);

		const instasellLabel = document.createElement("span");
		instasellLabel.className = "toggle-label";
		instasellLabel.textContent = "Instasell";

		const toggleSwitch = document.createElement("div");
		toggleSwitch.className = "toggle-switch";
		toggleSwitch.dataset.id = item.id;
		toggleSwitch.dataset.index = i;

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

		document.getElementById("toggle-container").appendChild(row);
	}

	document.querySelectorAll(".toggle-switch").forEach(function (toggleSwitch) {
		const dataId = toggleSwitch.getAttribute("data-id");
		const itemIndex = parseInt(toggleSwitch.getAttribute("data-index"));

		if (dataId === "Derpy") {
			if (derpy) {
				toggleSwitch.classList.add("active");
				document.getElementById("DerpyText").innerText = "On";
			} else {
				toggleSwitch.classList.remove("active");
				document.getElementById("DerpyText").innerText = "Off";
			}
		} else if (!isNaN(itemIndex) && itemIndex < itemsarray.length) {
			if (itemsarray[itemIndex].toggle) {
				toggleSwitch.classList.add("active");
			} else {
				toggleSwitch.classList.remove("active");
			}
		}

		toggleSwitch.addEventListener("click", async function () {
			toggleSwitch.classList.toggle("active");

			if (dataId === "Derpy") {
				derpy = !derpy;
				localStorage.setItem("derpyState", JSON.stringify(derpy));
				derpy ? (document.getElementById("DerpyText").innerText = "On") : (document.getElementById("DerpyText").innerText = "Off");
				await getPricesFromAPI();
			} else if (!isNaN(itemIndex) && itemIndex < itemsarray.length) {
				itemsarray[itemIndex].toggle = !itemsarray[itemIndex].toggle;
				toggleStates[itemIndex] = itemsarray[itemIndex].toggle;
				localStorage.setItem("toggleStatesDivanTracker", JSON.stringify(toggleStates));
				await getPricesFromAPI();
			}
		});
	});

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
			getPricesFromAPI();
		});
	});

	await getPricesFromAPI();
});
