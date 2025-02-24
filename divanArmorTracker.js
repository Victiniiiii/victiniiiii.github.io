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
];

let derpy = false;
let armorPrices = [0, 0, 0, 0];
let armorCosts = [0, 0, 0, 0];
const mixtures = [5, 8, 7, 4];

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getPricesFromAPI() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	itemsarray.forEach((item) => {
		item.price = data.products[item.id]?.quick_status[item.toggle ? "buyPrice" : "sellPrice"];
		document.getElementById(`prices${item.id}`).innerText = format(item.price.toFixed(0)) + " coins";
	});

	for (let i = 0; i < 4; i++) {
		armorCosts[i] = (10 * itemsarray[0].price + mixtures[i] * itemsarray[1].price + itemsarray[2].price).toFixed(0);
		document.getElementById(`cost${i}`).innerHTML = `<p>Total Cost: ${format(armorCosts[i]) + " coins"}</p>`;
	}
}

async function auctionsAPI() {
	const armorPieces = ["Divan_Helmet", "Divan_Chestplate", "Divan_Leggings", "Divan_Boots"];

	for (let i = 0; i < armorPieces.length; i++) {
		const piece = armorPieces[i];
		const response = await fetch(`https://sky.coflnet.com/api/auctions/tag/${piece}/active/bin`);
		let data = await response.json();
		data = data.slice(0, -5);

		let values = [];
		data.forEach((element) => {
			values.push(element.startingBid);
		});

		armorPrices[i] = filterValues(values)[0];
	}

	for (let i = 0; i < armorPieces.length; i++) {
		document.getElementById(`tax${i}`).innerHTML = `Taxes: ${format((armorPrices[i] - substractTaxes(armorPrices[i])).toFixed(0))} coins.`;
		document.getElementById(`auction${i}`).innerHTML = `Auction price: ${format(armorPrices[i])} coins`;
		document.getElementById(`notax${i}`).innerHTML = `After taxes: ${format(substractTaxes(armorPrices[i]).toFixed(0))} coins.`;
		document.getElementById(`profit${i}`).innerHTML = `Profit: ${format((substractTaxes(armorPrices[i]) - armorCosts[i]).toFixed(0))} coins.`;
	}
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

	return arr.filter((value) => value >= lowerBound && value <= upperBound);
}

document.addEventListener("DOMContentLoaded", function () {
	let webptest = new Image(1, 1);
	webptest.src = "/static/imageswebp/webpdot.webp";
	webptest.width > 0 && webptest.height > 0 ? (WebPSupport = true) : (WebPSupport = false);

	document.getElementById("settings-bar").addEventListener("click", function () {
		document.getElementById("settings").classList.toggle("expanded");
	});

	getPricesFromAPI();
	auctionsAPI();

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

	const toggleSwitches = document.querySelectorAll(".toggle-switch");

	toggleSwitches.forEach((toggleSwitch) => {
		const dataId = toggleSwitch.getAttribute("data-id");

		if (dataId == "Derpy") {
			toggleSwitch.addEventListener("click", async function () {
				toggleSwitch.classList.toggle("active");
				derpy = !derpy;
				derpy ? (document.getElementById("DerpyText").innerText = "On") : (document.getElementById("DerpyText").innerText = "Off");
				await getPricesFromAPI();
				await auctionsAPI();
			});
		}

		let item = itemsarray.find((item) => item.id == dataId);

		if (!item) return;

		if (item.toggle) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}

		toggleSwitch.addEventListener("click", async function () {
			item.toggle = !item.toggle;
			toggleSwitch.classList.toggle("active");
			await getPricesFromAPI();
			await auctionsAPI();
		});
	});
});
