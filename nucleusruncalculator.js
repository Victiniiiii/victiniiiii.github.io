let toggleStates;
let WebPSupport = 2;
let itemsarray = [
	{
		name: "Flawless Jasper Gemstone",
		id: "FLAWLESS_JASPER_GEM",
		price: 0,
		dropchance: 61442.4,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_JASPER_GEM",
		count: 1,
	},
	{
		name: "Flawless Ruby Gemstone",
		id: "FLAWLESS_RUBY_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_RUBY_GEM",
		count: 1,
	},
	{
		name: "Flawless Amethyst Gemstone",
		id: "FLAWLESS_AMETHYST_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_AMETHYST_GEM",
		count: 1,
	},
	{
		name: "Flawless Jade Gemstone",
		id: "FLAWLESS_JADE_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_JADE_GEM",
		count: 1,
	},
	{
		name: "Flawless Amber Gemstone",
		id: "FLAWLESS_AMBER_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_AMBER_GEM",
		count: 1,
	},
	{
		name: "Flawless Sapphire Gemstone",
		id: "FLAWLESS_SAPPHIRE_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_SAPPHIRE_GEM",
		count: 1,
	},
	{
		name: "Flawless Topaz Gemstone",
		id: "FLAWLESS_TOPAZ_GEM",
		price: 0,
		dropchance: 20480.8,
		auctionorbazaar: "BZ",
		image: "FLAWLESS_TOPAZ_GEM",
		count: 1,
	},
	{
		name: "Divan's Alloy",
		id: "DIVANS_ALLOY",
		price: 0,
		dropchance: 18071.29,
		auctionorbazaar: "AH",
		image: "DIVANS_ALLOY",
		count: 1,
	},
	{
		name: "Quick Claw",
		id: "QUICK_CLAW",
		price: 0,
		dropchance: 6144.24,
		auctionorbazaar: "AH",
		image: "QUICK_CLAW",
		count: 1,
	},
	{
		name: "Fine Jasper Gemstone",
		id: "FINE_JASPER_GEM",
		price: 0,
		dropchance: 1536.06,
		auctionorbazaar: "BZ",
		image: "FINE_JASPER_GEM",
		count: 1,
	},
	{
		name: "Treasurite",
		id: "TREASURITE",
		price: 0,
		dropchance: 1536.06,
		auctionorbazaar: "BZ",
		image: "TREASURITE",
		count: 10,
	},
	{
		name: "Recall Potion",
		id: "RECALL_POTION",
		price: 0,
		dropchance: 1228.84,
		auctionorbazaar: "AH",
		image: "RECALL_POTION",
		count: 1,
	},
	{
		name: "Wishing Compass",
		id: "WISHING_COMPASS",
		price: 0,
		dropchance: 614.42,
		auctionorbazaar: "AH",
		image: "WISHING_COMPASS",
		count: 3,
	},
	{
		name: "Precious Pearl",
		id: "PRECIOUS_PEARL",
		price: 0,
		dropchance: 614.42,
		auctionorbazaar: "AH",
		image: "PRECIOUS_PEARL",
		count: 1,
	},
	{
		name: "Claw Fossil",
		id: "CLAW_FOSSIL",
		price: 0,
		dropchance: 614.42,
		auctionorbazaar: "AH",
		image: "CLAW_FOSSIL",
		count: 1,
	},
	{
		name: "Flawed Jasper Gemstone",
		id: "FLAWED_JASPER_GEM",
		price: 0,
		dropchance: 438.87,
		auctionorbazaar: "BZ",
		image: "FLAWED_JASPER_GEM",
		count: 32,
	},
	{
		name: "Gemstone Mixture",
		id: "GEMSTONE_MIXTURE",
		price: 0,
		dropchance: 438.87,
		auctionorbazaar: "BZ",
		image: "GEMSTONE_MIXTURE",
		count: 1,
	},
	{
		name: "Fortune IV",
		id: "ENCHANTMENT_FORTUNE_4",
		price: 0,
		dropchance: 438.87,
		auctionorbazaar: "BZ",
		image: "ENCHANTED_BOOK",
		count: 1,
	},
	{
		name: "Gold Essence",
		id: "ESSENCE_GOLD",
		price: 0,
		dropchance: 409.61,
		auctionorbazaar: "BZ",
		image: "ESSENCE_GOLD",
		count: 10,
	},
	{
		name: "Diamond Essence",
		id: "ESSENCE_DIAMOND",
		price: 0,
		dropchance: 409.61,
		auctionorbazaar: "BZ",
		image: "ESSENCE_DIAMOND",
		count: 10,
	},
	{
		name: "Fine Ruby Gemstone",
		id: "FINE_RUBY_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_RUBY_GEM",
		count: 1,
	},
	{
		name: "Fine Amethyst Gemstone",
		id: "FINE_AMETHYST_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_AMETHYST_GEM",
		count: 1,
	},
	{
		name: "Fine Jade Gemstone",
		id: "FINE_JADE_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_JADE_GEM",
		count: 1,
	},
	{
		name: "Fine Amber Gemstone",
		id: "FINE_AMBER_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_AMBER_GEM",
		count: 1,
	},
	{
		name: "Fine Sapphire Gemstone",
		id: "FINE_SAPPHIRE_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_SAPPHIRE_GEM",
		count: 1,
	},
	{
		name: "Fine Topaz Gemstone",
		id: "FINE_TOPAZ_GEM",
		price: 0,
		dropchance: 341.34,
		auctionorbazaar: "BZ",
		image: "FINE_TOPAZ_GEM",
		count: 1,
	},
	{
		name: "Jaderald",
		id: "JADERALD",
		price: 0,
		dropchance: 211.87,
		auctionorbazaar: "BZ",
		image: "JADERALD",
		count: 1,
	},
	{
		name: "Dwarven O's Gemstone Grahams",
		id: "DWARVEN_OS_GEMSTONE_GRAHAMS",
		price: 0,
		dropchance: 211.87,
		auctionorbazaar: "BZ",
		image: "DWARVEN_OS_GEMSTONE_GRAHAMS",
		count: 1,
	},
	{
		name: "Flawed Ruby Gemstone",
		id: "FLAWED_RUBY_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_RUBY_GEM",
		count: 40,
	},
	{
		name: "Flawed Amethyst Gemstone",
		id: "FLAWED_AMETHYST_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMETHYST_GEM",
		count: 40,
	},
	{
		name: "Flawed Jade Gemstone",
		id: "FLAWED_JADE_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_JADE_GEM",
		count: 40,
	},
	{
		name: "Flawed Amber Gemstone",
		id: "FLAWED_AMBER_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMBER_GEM",
		count: 40,
	},
	{
		name: "Flawed Sapphire Gemstone",
		id: "FLAWED_SAPPHIRE_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_SAPPHIRE_GEM",
		count: 40,
	},
	{
		name: "Flawed Topaz Gemstone",
		id: "FLAWED_TOPAZ_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_TOPAZ_GEM",
		count: 40,
	},
	{
		name: "Flawed Jasper Gemstone",
		id: "FLAWED_JASPER_GEM",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "FLAWED_JASPER_GEM",
		count: 24,
	},
	{
		name: "Treasurite",
		id: "TREASURITE",
		price: 0,
		dropchance: 153.6,
		auctionorbazaar: "BZ",
		image: "TREASURITE",
		count: 5,
	},
	{
		name: "Ruby Crystal",
		id: "RUBY_CRYSTAL",
		price: 0,
		dropchance: 122.88,
		auctionorbazaar: null,
		image: "RUBY_CRYSTAL",
		count: 1,
	},
	{
		name: "Jasper Crystal",
		id: "JASPER_CRYSTAL",
		price: 0,
		dropchance: 122.88,
		auctionorbazaar: null,
		image: "JASPER_CRYSTAL",
		count: 1,
	},
	{
		name: "Helix Fossil",
		id: "HELIX_FOSSIL",
		price: 0,
		dropchance: 76.8,
		auctionorbazaar: "AH",
		image: "HELIX_FOSSIL",
		count: 1,
	},
	{
		name: "Lapidary I",
		id: "LAPIDARY_I",
		price: 0,
		dropchance: 76.8,
		auctionorbazaar: "AH",
		image: "LAPIDARY_I",
		count: 1,
	},
	{
		name: "Flawed Ruby Gemstone",
		id: "FLAWED_RUBY_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_RUBY_GEM",
		count: 24,
	},
	{
		name: "Flawed Amethyst Gemstone",
		id: "FLAWED_AMETHYST_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMETHYST_GEM",
		count: 24,
	},
	{
		name: "Flawed Jade Gemstone",
		id: "FLAWED_JADE_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_JADE_GEM",
		count: 24,
	},
	{
		name: "Flawed Amber Gemstone",
		id: "FLAWED_AMBER_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMBER_GEM",
		count: 24,
	},
	{
		name: "Flawed Sapphire Gemstone",
		id: "FLAWED_SAPPHIRE_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_SAPPHIRE_GEM",
		count: 24,
	},
	{
		name: "Flawed Topaz Gemstone",
		id: "FLAWED_TOPAZ_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_TOPAZ_GEM",
		count: 24,
	},
	{
		name: "Flawed Jasper Gemstone",
		id: "FLAWED_JASPER_GEM",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "BZ",
		image: "FLAWED_JASPER_GEM",
		count: 12,
	},
	{
		name: "Prehistoric Egg",
		id: "PREHISTORIC_EGG",
		price: 0,
		dropchance: 61.44,
		auctionorbazaar: "AH",
		image: "PREHISTORIC_EGG",
		count: 1,
	},
	{
		name: "Divan Fragment",
		id: "DIVAN_FRAGMENT",
		price: 0,
		dropchance: 51.2,
		auctionorbazaar: "AH",
		image: "DIVAN_FRAGMENT",
		count: 1,
	},
	{
		name: "Oil Barrel",
		id: "OIL_BARREL",
		price: 0,
		dropchance: 38.4,
		auctionorbazaar: "AH",
		image: "OIL_BARREL",
		count: 1,
	},
	{
		name: "Flawed Ruby Gemstone",
		id: "FLAWED_RUBY_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_RUBY_GEM",
		count: 12,
	},
	{
		name: "Flawed Amethyst Gemstone",
		id: "FLAWED_AMETHYST_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMETHYST_GEM",
		count: 12,
	},
	{
		name: "Flawed Jade Gemstone",
		id: "FLAWED_JADE_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_JADE_GEM",
		count: 12,
	},
	{
		name: "Flawed Amber Gemstone",
		id: "FLAWED_AMBER_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMBER_GEM",
		count: 12,
	},
	{
		name: "Flawed Sapphire Gemstone",
		id: "FLAWED_SAPPHIRE_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_SAPPHIRE_GEM",
		count: 12,
	},
	{
		name: "Flawed Topaz Gemstone",
		id: "FLAWED_TOPAZ_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_TOPAZ_GEM",
		count: 12,
	},
	{
		name: "Flawed Jasper Gemstone",
		id: "FLAWED_JASPER_GEM",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "BZ",
		image: "FLAWED_JASPER_GEM",
		count: 6,
	},
	{
		name: "Pickonimbus 2000",
		id: "PICKONIMBUS_2000",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "AH",
		image: "PICKONIMBUS_2000",
		count: 1,
	},
	{
		name: "Bob-omb",
		id: "BOB_OMB",
		price: 0,
		dropchance: 30.72,
		auctionorbazaar: "AH",
		image: "BOB_OMB",
		count: 20,
	},
	{
		name: "Flawed Ruby Gemstone",
		id: "FLAWED_RUBY_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_RUBY_GEM",
		count: 6,
	},
	{
		name: "Flawed Amethyst Gemstone",
		id: "FLAWED_AMETHYST_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMETHYST_GEM",
		count: 6,
	},
	{
		name: "Flawed Jade Gemstone",
		id: "FLAWED_JADE_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_JADE_GEM",
		count: 6,
	},
	{
		name: "Flawed Amber Gemstone",
		id: "FLAWED_AMBER_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_AMBER_GEM",
		count: 6,
	},
	{
		name: "Flawed Sapphire Gemstone",
		id: "FLAWED_SAPPHIRE_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_SAPPHIRE_GEM",
		count: 6,
	},
	{
		name: "Flawed Topaz Gemstone",
		id: "FLAWED_TOPAZ_GEM",
		price: 0,
		dropchance: 15.36,
		auctionorbazaar: "BZ",
		image: "FLAWED_TOPAZ_GEM",
		count: 6,
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
		if (item.auctionorbazaar !== "BZ") continue;

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

	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	let averageDrops = 16.5;
	if (molePet) averageDrops++;
	if (diamondPerk) averageDrops++;

	let totalProfitPerDrop = 0;
	let totalProfitPerRun = 0;

	for (let i = 0, toggleIndex = 0; i < itemsarray.length; i++) {
		const item = itemsarray[i];
		let profitPerDrop;
		let profitPerRun;
		if (item.auctionorbazaar == "BZ") {
			item.price = (data.products[item.id]?.quick_status[toggleStates[toggleIndex] ? "buyPrice" : "sellPrice"]).toFixed(0) || 0;
			document.getElementById(`prices${item.id}`).innerHTML = format(item.price) + (parseInt(item.price) === 1 ? " coin" : " coins");

			profitPerDrop = (item.price / item.dropchance).toFixed(0);
			profitPerRun = ((item.price / item.dropchance) * averageDrops).toFixed(0);

			toggleIndex++;
		} else if (item.auctionorbazaar == "AH") {
			item.price = 0;
		} else {
			item.price = 0;
		}

		totalProfitPerDrop += Number(profitPerDrop);
		totalProfitPerRun += Number(profitPerRun);

		document.getElementById("nucleusSpace").innerHTML += `${item.name}, drop chance: 1/${item.dropchance}, price is ${format(item.price)} coins. It will make ${format(profitPerDrop)} coins per drop, ${format(profitPerRun)} coins per run. <br>`;
	}

	console.log(totalProfitPerDrop, totalProfitPerRun);
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
