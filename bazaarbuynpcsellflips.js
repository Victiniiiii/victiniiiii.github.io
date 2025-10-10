let toggleStates;
let itemsarray;

document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./datas/bazaarbuynpcsellflips.json");
	const data = await response.json();
	itemsarray = data.items;

	var webptest = new Image(1, 1);
	webptest.src = "/static/imageswebp/webpdot.webp";
	if (webptest.width > 0 && webptest.height > 0) {
		WebPSupport = 1;
	} else {
		WebPSupport = 0;
	}

	const savedToggleStates = localStorage.getItem("toggleStatesBazaarBuy");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
	} else {
		toggleStates = Array(itemsarray.length).fill(false);
	}

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
			img.src = `static/imageswebp/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.webp`;
		} else {
			img.src = `static/images/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.png`;
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

	document.querySelectorAll(".toggle-switch").forEach(function (toggleSwitch, index) {
		if (toggleStates[index]) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}

		toggleSwitch.addEventListener("click", function () {
			toggleSwitch.classList.toggle("active");
			toggleStates[index] = !toggleStates[index];
			localStorage.setItem("toggleStatesBazaarBuy", JSON.stringify(toggleStates));
			bazaarconnect();
		});
	});

	document.getElementById("settings-bar").addEventListener("click", function () {
		document.getElementById("settings").classList.toggle("expanded");
	});

	for (let i = 0; i < itemsarray.length; i++) {
		const theBox = document.createElement("div");
		theBox.className = "bzbuynpcsellboxes";

		const bbnsImage = document.createElement("img");
		if (WebPSupport == 1) {
			bbnsImage.src = `static/imageswebp/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.webp`;
		} else {
			bbnsImage.src = `static/images/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.png`;
		}

		const bbnsText = document.createElement("div");
		bbnsText.id = `BbNs${i + 1}Text`;
		bbnsText.className = "BbNsText";

		theBox.appendChild(bbnsImage);
		theBox.appendChild(bbnsText);
		document.getElementById("itemsContainer").appendChild(theBox);
	}

	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	let boxesWithProfit = [];

	for (let i = 0; i < itemsarray.length; i++) {
		let ableToSellCount = (200000000 / itemsarray[i].npc).toFixed(0);
		let buyPrice = data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] || 0;
		let profit = ableToSellCount * (itemsarray[i].npc - buyPrice);

		const box = document.getElementById(`BbNs${i + 1}Text`);

		document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(buyPrice.toFixed(0)) + " coins";
		document.getElementById(`BbNs${i + 1}Text`).innerHTML = `If you buy ${ableToSellCount} ${itemsarray[i].name} from the bazaar, and sell it to NPC, you will make ${format(profit.toFixed(0))} coins.`;

		boxesWithProfit.push({ box: box.parentElement, profit: parseFloat(profit) });
	}

	boxesWithProfit.sort((a, b) => b.profit - a.profit);

	const itemsContainer = document.getElementById("itemsContainer");
	boxesWithProfit.forEach(item => itemsContainer.appendChild(item.box));
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
