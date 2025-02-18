let toggleStates;
let WebPSupport = 2;
let itemsarray = [
	{
		name: "Acacia Wood",
		id: "LOG_2",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "ACACIA_WOOD",
	},
	{
		name: "Carrot",
		id: "CARROT_ITEM",
		amount: "640",
		source: "Farm Merchant",
		npc: "10",
		image: "CARROT",
	},
	{
		name: "Cocoa Beans",
		id: "INK_SACK:3",
		amount: "640",
		source: "Farm Merchant",
		npc: "5",
		image: "COCOA_BEANS",
	},
	{
		name: "Coal",
		id: "COAL",
		amount: "640",
		source: "Mine Merchant",
		npc: "4",
	},
	{
		name: "Cobblestone",
		id: "COBBLESTONE",
		amount: "1280",
		source: "Mine Merchant, Builder",
		npc: "2.5", // average of all sellers
	},
	{
		name: "End Stone",
		id: "ENDER_STONE",
		amount: "640",
		source: "Pearl Dealer",
		npc: "10",
	},
	{
		name: "Experience Bottle",
		id: "EXP_BOTTLE",
		amount: "640",
		source: "Librarian",
		npc: "30",
		image: "EXPERIENCE_BOTTLE",
	},
	{
		name: "Flint",
		id: "FLINT",
		amount: "640",
		source: "Pat",
		npc: "6",
	},
	{
		name: "Grand Experience Bottle",
		id: "GRAND_EXP_BOTTLE",
		amount: "640",
		source: "Mage Emissary",
		npc: "5000",
		image: "EXPERIENCE_BOTTLE",
	},
	{
		name: "Gunpowder",
		id: "SULPHUR",
		amount: "640",
		source: "Adventurer",
		npc: "10",
		image: "GUNPOWDER",
	},
	{
		name: "Ice",
		id: "ICE",
		amount: "640",
		source: "Merchant",
		npc: "1",
	},
	{
		name: "Iron Ingot",
		id: "IRON_INGOT",
		amount: "1280",
		source: "Mine Merchant, Iron Forger",
		npc: "5.25", // average of all sellers
	},
	{
		name: "Jungle Wood",
		id: "LOG:3",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "JUNGLE_WOOD",
	},
	{
		name: "Magma Cream",
		id: "MAGMA_CREAM",
		amount: "640",
		source: "Alchemist",
		npc: "20",
	},
	{
		name: "Melon",
		id: "MELON",
		amount: "640",
		source: "Farm Merchant",
		npc: "4",
	},
	{
		name: "Oak Wood",
		id: "LOG",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "OAK_WOOD",
	},
	{
		name: "Packed Ice",
		id: "PACKED_ICE",
		amount: "640",
		source: "Builder",
		npc: "9",
	},
	{
		name: "Pufferfish",
		id: "RAW_FISH:3",
		amount: "640",
		source: "Fish Merchant",
		npc: "40",
		image: "PUFFERFISH",
	},
	{
		name: "Potato",
		id: "POTATO_ITEM",
		amount: "640",
		source: "Farm Merchant",
		npc: "10",
		image: "POTATO",
	},
	{
		name: "Pumpkin",
		id: "PUMPKIN",
		amount: "640",
		source: "Farm Merchant",
		npc: "25",
	},
	{
		name: "Raw Fish",
		id: "RAW_FISH",
		amount: "640",
		source: "Fish Merchant",
		npc: "20",
	},
	{
		name: "Sand",
		id: "SAND",
		amount: "1280",
		source: "Farm Merchant, Builder",
		npc: "3", // average of all sellers
	},
	{
		name: "Slimeball",
		id: "SLIME_BALL",
		amount: "640",
		source: "Adventurer",
		npc: "14",
		image: "SLIMEBALL",
	},
	{
		name: "Spruce Wood",
		id: "LOG:1",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "SPRUCE_WOOD",
	},
	{
		name: "String",
		id: "STRING",
		amount: "640",
		source: "Adventurer",
		npc: "10",
	},
	{
		name: "Sugar Cane",
		id: "SUGAR_CANE",
		amount: "640",
		source: "Farm Merchant",
		npc: "10",
	},
	{
		name: "Wheat",
		id: "WHEAT",
		amount: "640",
		source: "Farm Merchant",
		npc: "10",
	},
	{
		name: "Rotten Flesh",
		id: "ROTTEN_FLESH",
		amount: "640",
		source: "Adventurer",
		npc: "8",
	},
	{
		name: "Bone",
		id: "BONE",
		amount: "640",
		source: "Adventurer",
		npc: "8",
	},
	{
		name: "Birch Wood",
		id: "LOG:2",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "BIRCH_WOOD",
	},
	{
		name: "Dark Oak Wood",
		id: "LOG_2:1",
		amount: "640",
		source: "Lumber Merchant",
		npc: "5",
		image: "DARK_OAK_WOOD",
	},
	{
		name: "Raw Salmon",
		id: "RAW_FISH:1",
		amount: "640",
		source: "Fish Merchant",
		npc: "30",
		image: "RAW_SALMON",
	},
	{
		name: "Clownfish",
		id: "RAW_FISH:2",
		amount: "640",
		source: "Fish Merchant",
		npc: "100",
		image: "CLOWNFISH",
	},
	{
		name: "Gold Ingot",
		id: "GOLD_INGOT",
		amount: "1280",
		source: "Mine Merchant, Gold Forger",
		npc: "5.75",
	},
	{
		name: "Gravel",
		id: "GRAVEL",
		amount: "1920",
		source: "Mine Merchant, Builder, Pat",
		npc: "4.33",
	},
	{
		name: "Red Mushroom",
		id: "RED_MUSHROOM",
		amount: "640",
		source: "Farm Merchant",
		npc: "12",
	},
	{
		name: "Brown Mushroom",
		id: "BROWN_MUSHROOM",
		amount: "640",
		source: "Farm Merchant",
		npc: "12",
	},
	{
		name: "Cactus",
		id: "CACTUS",
		amount: "640",
		source: "Farm Merchant",
		npc: "3",
	},
	{
		name: "White Wool",
		id: "WOOL",
		amount: "640",
		source: "Wool Weaver",
		npc: "32",
		image: "WHITE_WOOL",
	},
	{
		name: "Netherrack",
		id: "NETHERRACK",
		amount: "640",
		source: "Builder",
		npc: "2",
	},
	{
		name: "Obsidian",
		id: "OBSIDIAN",
		amount: "640",
		source: "Pearl Dealer",
		npc: "50",
	},
	{
		name: "Nether Wart",
		id: "NETHER_STALK",
		amount: "640",
		source: "Alchemist",
		npc: "10",
		image: "NETHER_WART",
	},
	{
		name: "Ghast Tear",
		id: "GHAST_TEAR",
		amount: "640",
		source: "Alchemist",
		npc: "200",
	},
	{
		name: "Rabbit's Foot",
		id: "RABBIT_FOOT",
		amount: "640",
		source: "Alchemist",
		npc: "10",
	},
	{
		name: "Spider Eye",
		id: "SPIDER_EYE",
		amount: "640",
		source: "Alchemist",
		npc: "12",
	},
	{
		name: "Redstone",
		id: "REDSTONE",
		amount: "640",
		source: "Mad Redstone Engineer",
		npc: "4",
	},
];

let derpy = false;
let diaz = false;
let taxRate = localStorage.getItem("taxRate") ? parseFloat(localStorage.getItem("taxRate")) : 1;
document.getElementById("TaxRateText").innerText = "%" + taxRate;
document.querySelectorAll(".three-way-toggle").forEach((toggle) => {
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

	const savedToggleStates = localStorage.getItem("toggleStates");
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

	document.querySelectorAll(".three-way-toggle").forEach((toggle) => {
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
		if (dataId == "Derpy") {
			toggleSwitch.addEventListener("click", async function () {
				toggleSwitch.classList.toggle("active");
				derpy = !derpy;
				derpy ? (document.getElementById("DerpyText").innerText = "On") : (document.getElementById("DerpyText").innerText = "Off");
				bazaarconnect();
			});
			return;
		} else if (dataId == "Diaz") {
			toggleSwitch.addEventListener("click", async function () {
				toggleSwitch.classList.toggle("active");
				diaz = !diaz;
				diaz ? (document.getElementById("DiazText").innerText = "On") : (document.getElementById("DiazText").innerText = "Off");
				bazaarconnect();
			});
			return;
		}

		if (toggleStates[index - 2]) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}

		toggleSwitch.addEventListener("click", function () {
			toggleSwitch.classList.toggle("active");
			toggleStates[index - 2] = !toggleStates[index - 2];
			localStorage.setItem("toggleStates", JSON.stringify(toggleStates));
			bazaarconnect();
		});
	});

	const NbBsSpace = document.getElementById("NbBsSpace");

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

		NbBsSpace.appendChild(theBox);
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
	boxesWithProfit.forEach((item) => NbBsSpace.appendChild(item.box));
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
