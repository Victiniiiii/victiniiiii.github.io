let toggleStates;
let WebPSupport = 2;
let itemsarray = [
	{
		name: "Enchanted Coal",
		id: "ENCHANTED_COAL",
		price: "0",
	},
	{
		name: "Enchanted Sulphur",
		id: "ENCHANTED_SULPHUR",
		price: "0",
	},
	{
		name: "Chili Pepper",
		id: "CHILI_PEPPER",
		price: "0",
	},
	{
		name: "Capsaicin Eyedrops",
		id: "CAPSAICIN_EYEDROPS_NO_CHARGES",
		price: "0",
	},
	{
		name: "Crude Gabagool",
		id: "CRUDE_GABAGOOL",
		price: "0",
	},
	{
		name: "Derelict Ashe",
		id: "DERELICT_ASHE",
		price: "0",
	},
	{
		name: "Hypergolic Gabagool",
		id: "HYPERGOLIC_GABAGOOL",
		price: "0",
	},
	{
		name: "Hypergolic Ionized Ceramics",
		id: "HYPERGOLIC_IONIZED_CERAMICS",
		price: "0",
	},
	{
		name: "Gabagool Distillate",
		id: "CRUDE_GABAGOOL_DISTILLATE",
		price: "0",
	},
	{
		name: "Blaze Rod Distillate",
		id: "BLAZE_ROD_DISTILLATE",
		price: "0",
	},
	{
		name: "Glowstone Distillate",
		id: "GLOWSTONE_DUST_DISTILLATE",
		price: "0",
	},
	{
		name: "Magma Cream Distillate",
		id: "MAGMA_CREAM_DISTILLATE",
		image: "MAGMA_CREAM_NETHER_WART_DISTILLATE",
		price: "0",
	},
	{
		name: "Nether Wart Distillate",
		id: "NETHER_STALK_DISTILLATE",
		image: "MAGMA_CREAM_NETHER_WART_DISTILLATE",
		price: "0",
	},
	{
		name: "Inferno Fuel Block",
		id: "INFERNO_FUEL_BLOCK",
		price: "0",
	},
	{
		name: "Entropy Suppressor",
		id: "ENTROPY_SUPPRESSOR",
		price: "0",
	},
	{
		name: "Jalapeno Book",
		id: "JALAPENO_BOOK",
		price: "0",
	},
	{
		name: "Sulphuric Coal",
		id: "SULPHURIC_COAL",
		price: "0",
	},
	{
		name: "Habanero Tactics IV",
		id: "ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_4",
		image: "ENCHANTED_BOOK",
		price: "0",
	},
	{
		name: "Stuffed Chili Pepper",
		id: "STUFFED_CHILI_PEPPER",
		price: "0",
	},
	{
		name: "Cayenne IV",
		id: "ENCHANTMENT_CAYENNE_4",
		image: "ENCHANTED_BOOK",
		price: "0",
	},
	{
		name: "Inferno Vertex",
		id: "INFERNO_VERTEX",
		price: "0",
	},
	{
		name: "Inferno Apex",
		id: "INFERNO_APEX",
		price: "0",
	},
	{
		name: "Reaper Pepper",
		id: "REAPER_PEPPER",
		price: "0",
	},
	{
		name: "Re-heated Gummy Polar Bear",
		id: "REHEATED_GUMMY_POLAR_BEAR",
		price: "0",
	},
	{
		name: "Enchanted Snow Block",
		id: "ENCHANTED_SNOW_BLOCK",
		price: "0",
	},
	{
		name: "Enchanted Slimeball",
		id: "ENCHANTED_SLIME_BALL",
		price: "0",
	},
	{
		name: "Kelvin Interter",
		id: "KELVIN_INVERTER",
		price: "0",
	},
	{
		name: "Enchanted Paper",
		id: "ENCHANTED_PAPER",
		price: "0",
	},
	{
		name: "Wood Singularity",
		id: "WOOD_SINGULARITY",
		price: "0",
	},
	{
		name: "Enchanted Iron Block",
		id: "ENCHANTED_IRON_BLOCK",
		price: "0",
	},
	{
		name: "Enchanted Brown Mushroom Block",
		id: "ENCHANTED_HUGE_MUSHROOM_1",
		price: "0",
		image: "ENCHANTED_BROWN_MUSHROOM_BLOCK",
	},
	{
		name: "Enchanted Rabbit Hide",
		id: "ENCHANTED_RABBIT_HIDE",
		price: "0",
	},
	{
		name: "Volta",
		id: "VOLTA",
		price: "0",
	},
	{
		name: "Blaze Rod",
		id: "BLAZE_ROD",
		price: "0",
	},
	{
		name: "Glowstone Dust",
		id: "GLOWSTONE_DUST",
		price: "0",
	},
	{
		name: "Magma Cream",
		id: "MAGMA_CREAM",
		price: "0",
	},
	{
		name: "Nether Wart",
		id: "NETHER_STALK",
		image: "NETHER_WART",
		price: "0",
	},
	{
		name: "Power Crystal",
		id: "POWER_CRYSTAL",
		image: "ENCHANTED_NETHER_STAR",
		price: "0",
	},
	{
		name: "Scorched Power Crystal",
		id: "SCORCHED_POWER_CRYSTAL",
		price: "0",
	},
	{
		name: "Molten Powder",
		id: "MOLTEN_POWDER",
		price: "0",
	},
];

let derpy = 1;
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
	let webptest = new Image(1, 1);
	webptest.src = "/static/imageswebp/webpdot.webp";
	if (webptest.width > 0 && webptest.height > 0) {
		WebPSupport = 1;
	} else {
		WebPSupport = 0;
	}

	const savedToggleStates = localStorage.getItem("toggleStatesInferno");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
	} else {
		toggleStates = Array(39).fill(false);
		toggleStates[6] = true;
		toggleStates.fill(true, 14, 24);
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
				derpy == 1 ? (derpy = 4) : (derpy = 1);
				derpy == 4 ? (document.getElementById("DerpyText").innerText = "On") : (document.getElementById("DerpyText").innerText = "Off");
                bazaarconnect();
			});
			bazaarconnect();
			return;
		}
		if (toggleStates[index - 1]) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}

		toggleSwitch.addEventListener("click", function () {
			toggleSwitch.classList.toggle("active");
			toggleStates[index - 1] = !toggleStates[index - 1];
			localStorage.setItem("toggleStatesInferno", JSON.stringify(toggleStates));
			bazaarconnect();
		});
	});

	document.getElementById("settings-bar").addEventListener("click", function () {
		document.getElementById("settings").classList.toggle("expanded");
	});

	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	for (let i = 0; i < itemsarray.length; i++) {
		itemsarray[i].price = data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"].toFixed(0);
		document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(itemsarray[i].price) + " coins";
	}

	recipecalculate();
	minioncraftingcosts();
	if (document.getElementById("empty").innerText != "Press the calculate button at the top right to start.") {
		minionprofits();
	}
}

const infernooneminionprofit = document.getElementById("infernooneminionprofit");
const infernoallminionprofit = document.getElementById("infernoallminionprofit");
const infernoallcosts = document.getElementById("infernoallcosts");
const infernoafterexpenses = document.getElementById("infernoafterexpenses");
const infernobasegain = document.getElementById("infernobasegain");
const infernofuelgain = document.getElementById("infernofuelgain");
const infernochiligain = document.getElementById("infernochiligain");
const infernovertexgain = document.getElementById("infernovertexgain");
const infernoapexgain = document.getElementById("infernoapexgain");
const infernoreapergain = document.getElementById("infernoreapergain");
const htmlinfernoresulttext = document.getElementById("infernoprofitresults");
const htmlinfernogain = document.getElementById("infernogain");
const htmlempty = document.getElementById("empty");
const infernorow1 = document.getElementById("infernorow1");
const infernorow2 = document.getElementById("infernorow2");
const infernorow3 = document.getElementById("infernorow3");
const infernorow4 = document.getElementById("infernorow4");
const infernorow5 = document.getElementById("infernorow5");
const infernorow6 = document.getElementById("infernorow6");

async function recipecalculate() {
	const enchantedcoalprice = itemsarray[0].price;
	const enchantedsulphurprice = itemsarray[1].price;
	const chilipepperprice = itemsarray[2].price;
	const crudegabagoolprice = itemsarray[4].price;
	let entropysurpressorprice = itemsarray[14].price;
	let jalapenobookprice = itemsarray[15].price;
	let sulphuriccoalprice = itemsarray[16].price;
	let habanerotactics4price = itemsarray[17].price;
	let stuffedchilipepperprice = itemsarray[18].price;
	let cayenne4price = itemsarray[19].price;
	let gummyprice = itemsarray[23].price;
	const enchantedsnowprice = itemsarray[24].price;
	const enchantedslimeballprice = itemsarray[25].price;
	const kelvininverterprice = itemsarray[26].price;
	const enchantedpaperprice = itemsarray[27].price;
	const woodsingularityprice = itemsarray[28].price;
	const enchantedironblockprice = itemsarray[29].price;
	const enchantedbrownmushroomblockprice = itemsarray[30].price;
	const enchantedrabbithideprice = itemsarray[31].price;
	const voltaprice = itemsarray[32].price;

	let hypergoliccraftprice = Math.round(75.25 * parseFloat(enchantedsulphurprice) + 6912 * parseFloat(crudegabagoolprice) + 1204 * parseFloat(enchantedcoalprice)).toLocaleString();
	hypergolicgabagoolcraft.innerHTML = `Crafting Hypergolic Gabagool costs ${hypergoliccraftprice} coins and buying it will cost ${document.getElementById(`prices${itemsarray[6].id}`).innerHTML}.`;

	let sulphuriccoalnopeppers = (parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice)) / 4;
	let sulphuriccoalwithpeppers = (parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice) + parseFloat(chilipepperprice) * 4) / 12;
	sulphuriccoalprice = Math.round(sulphuriccoalprice).toLocaleString();
	sulphuriccoalnopeppers = Math.round(sulphuriccoalnopeppers).toLocaleString();
	sulphuriccoalwithpeppers = Math.round(sulphuriccoalwithpeppers).toLocaleString();
	sulphuriccoalcraft.innerHTML = `Crafting Sulphuric Coal with no peppers costs ${sulphuriccoalnopeppers} coins, with peppers it costs ${sulphuriccoalwithpeppers} coins, and buying it will cost ${sulphuriccoalprice} coins.`;

	let gummycraft = parseFloat(enchantedsnowprice) * 4 + parseFloat(enchantedslimeballprice) * 4 + parseFloat(chilipepperprice) * 4;
	gummycraft = Math.round(gummycraft).toLocaleString();
	gummyprice = Math.round(gummyprice).toLocaleString();
	gummybearcraft.innerHTML = `Crafting Re-heated Gummy Polar Bear costs ${gummycraft} coins and buying it costs ${gummyprice} coins.`;

	let entropycraft2 = Math.round(crudegabagoolprice * 9216 + enchantedsulphurprice * 132 + enchantedcoalprice * 2112 + chilipepperprice * 32 + kelvininverterprice * 4).toLocaleString();
	entropysurpressorprice = Math.round(entropysurpressorprice).toLocaleString();
	entropycraft.innerHTML = `Crafting Entropy Suppressor costs ${entropycraft2} coins and buying it costs ${entropysurpressorprice} coins.`;

	jalapenorecipe = parseFloat(chilipepperprice) * 160 + parseFloat(enchantedpaperprice) * 3;
	jalapenorecipe = Math.round(jalapenorecipe).toLocaleString();
	jalapenobookprice = Math.round(jalapenobookprice).toLocaleString();
	jalapenocraft.innerHTML = `Crafting Jalapeno Book costs ${jalapenorecipe} coins and buying it costs ${jalapenobookprice} coins.`;

	cayennerecipe = parseFloat(chilipepperprice) * 32 + parseFloat(enchantedironblockprice) * 4 + parseFloat(woodsingularityprice);
	cayenne4price = Math.round(cayenne4price).toLocaleString();
	cayennerecipe = Math.round(cayennerecipe).toLocaleString();
	cayennecraft.innerHTML = `Crafting Cayenne IV Book costs ${cayennerecipe} coins and buying it costs ${cayenne4price} coins.`;

	habanerorecipe = parseFloat(stuffedchilipepperprice) * 4 + parseFloat(enchantedbrownmushroomblockprice) * 128 + parseFloat(enchantedrabbithideprice) * 16 + parseFloat(voltaprice) * 4;
	habanerorecipe = Math.round(habanerorecipe).toLocaleString();
	habanerotactics4price = Math.round(habanerotactics4price).toLocaleString();
	habanerocraft.innerHTML = `Crafting Habanero Tactics IV Book costs ${habanerorecipe} coins and buying it costs ${habanerotactics4price} coins.`;

	stuffedrecipe = parseFloat(chilipepperprice) * 160;
	stuffedrecipe = Math.round(stuffedrecipe).toLocaleString();
	stuffedchilipepperprice = Math.round(stuffedchilipepperprice).toLocaleString();
	stuffedchilicraft.innerHTML = `Crafting Stuffed Chili Pepper costs ${stuffedrecipe} coins and buying it costs ${stuffedchilipepperprice} coins.`;
}

async function minionprofits() {
	const enchantedcoalprice = itemsarray[0].price;
	const enchantedsulphurprice = itemsarray[1].price;
	const chilipepperprice = itemsarray[2].price;
	const eyedropbuy = itemsarray[3].price;
	const crudegabagoolprice = itemsarray[4].price;
	const hypergolicgabagoolprice = itemsarray[6].price;
	const gabagooldistillateprice = itemsarray[8].price;
	const blazeroddistillateprice = itemsarray[9].price;
	const glowstonedistillateprice = itemsarray[1].price;
	const magmacreamdistillateprice = itemsarray[11].price;
	const netherwartdistillateprice = itemsarray[12].price;
	const infernofuelblockprice = itemsarray[13].price;
	const vertexprice = itemsarray[20].price;
	const apexprice = itemsarray[21].price;
	const reaperprice = itemsarray[22].price;
	const blazerodprice = itemsarray[33].price;
	const glowstonedustprice = itemsarray[34].price;
	const magmacreamprice = itemsarray[35].price;
	const netherwartprice = itemsarray[36].price;
	const powercrystalprice = itemsarray[37].price;
	const scorchedprice = itemsarray[38].price;

	infernooneminionprofit.innerHTML = ``;
	infernoallminionprofit.innerHTML = ``;
	infernoallcosts.innerHTML = ``;
	infernoafterexpenses.innerHTML = ``;
	htmlempty.innerHTML = ``;
	infernobasegain.innerHTML = ``;
	infernofuelgain.innerHTML = ``;
	infernochiligain.innerHTML = ``;
	infernovertexgain.innerHTML = ``;
	infernoapexgain.innerHTML = ``;
	infernoreapergain.innerHTML = ``;
	htmlinfernogain.innerHTML = ``;
	infernorow1.style.backgroundImage = "";
	infernorow2.style.backgroundImage = "";
	infernorow3.style.backgroundImage = "";
	infernorow4.style.backgroundImage = "";
	infernorow5.style.backgroundImage = "";
	infernorow6.style.backgroundImage = "";

	const sulphuriccoalnopeppers = ((parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice)) / 4).toFixed(0);
	const sulphuriccoalwithpeppers = ((parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice) + parseFloat(chilipepperprice) * 4) / 12).toFixed(0);
	let bestsulphuriccoal = [sulphuriccoalnopeppers > sulphuriccoalwithpeppers ? sulphuriccoalwithpeppers : sulphuriccoalnopeppers];
	let bestfuelgabagool = (parseFloat(crudegabagoolprice) * 24 + parseFloat(bestsulphuriccoal)).toFixed(0);

	let extraspeeds = 0;

	var htmlminioncount = document.getElementById("minioncount").value;
	if (htmlminioncount < 1 || htmlminioncount > 31) {
		htmlempty.innerHTML = "Please enter the minion count value between 1 and 31.";
	} else if (htmlminioncount > 0 && htmlminioncount < 11) {
		extraspeeds += htmlminioncount * 18;
	} else if (htmlminioncount > 10 && htmlminioncount < 33) {
		extraspeeds += 180;
	} else {
		console.log("Minion count error.");
	}

	var htmlminiontier = document.getElementById("miniontier").value;
	var apexCount = 0;
	var minionwaitingtime = 0;
	if (htmlminiontier == "t1") {
		minionwaitingtime = 1013;
		apexCount = 1;
	} else if (htmlminiontier == "t2") {
		minionwaitingtime = 982;
		apexCount = 1;
	} else if (htmlminiontier == "t3") {
		minionwaitingtime = 950;
		apexCount = 1;
	} else if (htmlminiontier == "t4") {
		minionwaitingtime = 919;
		apexCount = 1;
	} else if (htmlminiontier == "t5") {
		minionwaitingtime = 886;
		apexCount = 1;
	} else if (htmlminiontier == "t6") {
		minionwaitingtime = 855;
		apexCount = 1;
	} else if (htmlminiontier == "t7") {
		minionwaitingtime = 823;
		apexCount = 1;
	} else if (htmlminiontier == "t8") {
		minionwaitingtime = 792;
		apexCount = 1;
	} else if (htmlminiontier == "t9") {
		minionwaitingtime = 760;
		apexCount = 1;
	} else if (htmlminiontier == "t10") {
		minionwaitingtime = 728;
		apexCount = 2;
	} else if (htmlminiontier == "t11") {
		minionwaitingtime = 697;
		apexCount = 2;
	}

	var htmlfueltype = document.getElementById("fueltype").value;
	var fuelmultiplier = 1;
	var specialproduction = 0;
	var specialfueloutput = 0;
	var checkifitst3 = 0;
	var expenses = 0;
	let chosenfuel;
	let specialfuelitem;
	if (htmlfueltype == "nothing") {
		fuelmultiplier = 1;
		checkifitst3 = 0;
	} else if (htmlfueltype == "t1-gabagool") {
		fuelmultiplier = 11;
		checkifitst3 = 0;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(crudegabagoolprice);
		specialproduction += 0.8;
		chosenfuel = "Crude Gabagool";
		expenses += htmlminioncount * (6 * parseFloat(gabagooldistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t1-blazerod") {
		fuelmultiplier = 11;
		checkifitst3 = 0;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(blazerodprice);
		specialproduction += 0.8;
		chosenfuel = "Blaze Rod";
		expenses += htmlminioncount * (6 * parseFloat(blazeroddistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t1-glowstone") {
		fuelmultiplier = 11;
		checkifitst3 = 0;
		specialfuelitem = 2.5;
		specialfueloutput += parseFloat(glowstonedustprice * 2.5);
		specialproduction += 0.8;
		chosenfuel = "Glowstone Dust";
		expenses += htmlminioncount * (6 * parseFloat(glowstonedistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t1-magmacream") {
		fuelmultiplier = 11;
		checkifitst3 = 0;
		specialfuelitem = 2;
		specialfueloutput += parseFloat(magmacreamprice * 2);
		specialproduction += 0.8;
		chosenfuel = "Magma Cream";
		expenses += htmlminioncount * (6 * parseFloat(magmacreamdistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t1-netherwart") {
		fuelmultiplier = 11;
		checkifitst3 = 0;
		specialfuelitem = 5;
		specialfueloutput += parseFloat(netherwartprice * 5);
		specialproduction += 0.8;
		chosenfuel = "Nether Wart";
		expenses += htmlminioncount * (6 * parseFloat(netherwartdistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t2-gabagool") {
		fuelmultiplier = 16;
		checkifitst3 = 0;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(crudegabagoolprice);
		specialproduction += 0.8;
		chosenfuel = "Crude Gabagool";
		expenses += htmlminioncount * (6 * parseFloat(gabagooldistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t2-blazerod") {
		fuelmultiplier = 16;
		checkifitst3 = 0;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(blazerodprice);
		specialproduction += 0.8;
		chosenfuel = "Blaze Rod";
		expenses += htmlminioncount * (6 * parseFloat(blazeroddistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t2-glowstone") {
		fuelmultiplier = 16;
		checkifitst3 = 0;
		specialfuelitem = 2.5;
		specialfueloutput += parseFloat(glowstonedustprice * 2.5);
		specialproduction += 0.8;
		chosenfuel = "Glowstone Dust";
		expenses += htmlminioncount * (6 * parseFloat(glowstonedistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t2-magmacream") {
		fuelmultiplier = 16;
		checkifitst3 = 0;
		specialfuelitem = 2;
		specialfueloutput += parseFloat(magmacreamprice * 2);
		specialproduction += 0.8;
		chosenfuel = "Magma Cream";
		expenses += htmlminioncount * (6 * parseFloat(magmacreamdistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t2-netherwart") {
		fuelmultiplier = 16;
		checkifitst3 = 0;
		specialfuelitem = 5;
		specialfueloutput += parseFloat(netherwartprice * 5);
		specialproduction += 0.8;
		chosenfuel = "Nether Wart";
		expenses += htmlminioncount * (6 * parseFloat(netherwartdistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t3-gabagool") {
		fuelmultiplier = 21;
		checkifitst3 = 1;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(crudegabagoolprice);
		specialproduction += 0.8;
		chosenfuel = "Crude Gabagool";
		expenses += htmlminioncount * (6 * parseFloat(gabagooldistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t3-blazerod") {
		fuelmultiplier = 21;
		checkifitst3 = 1;
		specialfuelitem = 1;
		specialfueloutput += parseFloat(blazerodprice);
		specialproduction += 0.8;
		chosenfuel = "Blaze Rod";
		expenses += htmlminioncount * (6 * parseFloat(blazeroddistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t3-glowstone") {
		fuelmultiplier = 21;
		checkifitst3 = 1;
		specialfuelitem = 2.5;
		specialfueloutput += parseFloat(glowstonedustprice * 2.5);
		specialproduction += 0.8;
		chosenfuel = "Glowstone Dust";
		expenses += htmlminioncount * (6 * parseFloat(glowstonedistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t3-magmacream") {
		fuelmultiplier = 21;
		checkifitst3 = 1;
		specialfuelitem = 2;
		specialfueloutput += parseFloat(magmacreamprice * 2);
		specialproduction += 0.8;
		chosenfuel = "Magma Cream";
		expenses += htmlminioncount * (6 * parseFloat(magmacreamdistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	} else if (htmlfueltype == "t3-netherwart") {
		fuelmultiplier = 21;
		checkifitst3 = 1;
		specialfuelitem = 5;
		specialfueloutput += parseFloat(netherwartprice * 5);
		specialproduction += 0.8;
		chosenfuel = "Nether Wart";
		expenses += htmlminioncount * (6 * parseFloat(netherwartdistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));
	}

	var htmleyedrop = document.getElementById("eyedrops").value;
	if (htmleyedrop == "yes") {
		expenses += parseFloat(eyedropbuy);
		if (checkifitst3 == 1) {
			checkifitst3 += 0.3;
		}
	}

	var htmlbeacontier = document.getElementById("beaconlevel").value;
	if (htmlbeacontier == "1") {
		extraspeeds += 2;
		expenses += parseFloat(powercrystalprice) / 2;
	} else if (htmlbeacontier == "1s") {
		extraspeeds += 3;
		expenses += parseFloat(scorchedprice) / 2;
	} else if (htmlbeacontier == "2") {
		extraspeeds += 4;
		expenses += parseFloat(powercrystalprice) / 2;
	} else if (htmlbeacontier == "2s") {
		extraspeeds += 5;
		expenses += parseFloat(scorchedprice) / 2;
	} else if (htmlbeacontier == "3") {
		extraspeeds += 6;
		expenses += parseFloat(powercrystalprice) / 2;
	} else if (htmlbeacontier == "3s") {
		extraspeeds += 7;
		expenses += parseFloat(scorchedprice) / 2;
	} else if (htmlbeacontier == "4") {
		extraspeeds += 8;
		expenses += parseFloat(powercrystalprice) / 2;
	} else if (htmlbeacontier == "4s") {
		extraspeeds += 9;
		expenses += parseFloat(scorchedprice) / 2;
	} else if (htmlbeacontier == "5") {
		extraspeeds += 10;
		expenses += parseFloat(powercrystalprice) / 2;
	} else if (htmlbeacontier == "5s") {
		extraspeeds += 11;
		expenses += parseFloat(scorchedprice) / 2;
	}

	var htmlinfusion = document.getElementById("infusion").value;
	if (htmlinfusion == "yes") {
		extraspeeds += 10;
	} else {
		extraspeeds += 0;
	}

    let freewillValue = document.getElementById("freewill").value;
    let postcardValue = document.getElementById("postcard").value;

    freewillValue == "yes" ? extraspeeds += 10 : extraspeeds += 0;
    postcardValue == "yes" ? extraspeeds += 5 : extraspeeds += 0;

	var htmlupgrades1 = document.getElementById("upgrades1").value;
	var htmlupgrades2 = document.getElementById("upgrades2").value;
	if (htmlupgrades1 == "minion-expander") {
		extraspeeds += 5;
	}
	if (htmlupgrades2 == "minion-expander") {
		extraspeeds += 5;
	}
	if (htmlupgrades1 == "flycatcher") {
		extraspeeds += 20;
	}
	if (htmlupgrades2 == "flycatcher") {
		extraspeeds += 20;
	}

	let miniondailyprofit;
	let dailytotalminionactions = 86400 / 2 / (minionwaitingtime / fuelmultiplier / ((100 + extraspeeds) / 100)); // this many actions per day
    if (derpy == 4) {dailytotalminionactions *= 2}
	miniondailyprofit =
		htmlminioncount * dailytotalminionactions * ((1 - specialproduction) * parseFloat(crudegabagoolprice) + specialproduction * specialfueloutput) +
		(checkifitst3 / 136) * htmlminioncount * dailytotalminionactions * parseFloat(chilipepperprice) +
		(checkifitst3 / 5950) * htmlminioncount * dailytotalminionactions * parseFloat(vertexprice) +
		(checkifitst3 / 1309091) * apexCount * htmlminioncount * dailytotalminionactions * parseFloat(apexprice) +
		(checkifitst3 / 458182) * htmlminioncount * dailytotalminionactions * parseFloat(reaperprice);

	miniondailyprofit = (1 - (taxRate / 100) * derpy) * miniondailyprofit;

	possiblehypergoliccraftingamount = (dailytotalminionactions * htmlminioncount) / 6912;
	profitfromcraftinghypergolicper = parseFloat(hypergolicgabagoolprice) - 75.25 * parseFloat(enchantedsulphurprice) - 6912 * parseFloat(crudegabagoolprice) - 1204 * parseFloat(enchantedcoalprice);
	profitfromcraftinghypergolic = possiblehypergoliccraftingamount * profitfromcraftinghypergolicper;
	var coinsleft = miniondailyprofit - expenses;
	totalaftereverything = profitfromcraftinghypergolic + coinsleft;

	minionhourlyprofit = miniondailyprofit / 24;
	oneminionhourlyprofit = Math.round(minionhourlyprofit / htmlminioncount).toLocaleString();
	minionhourlyprofit = Math.round(miniondailyprofit / 24).toLocaleString();

	oneminiondailyprofit = Math.round(miniondailyprofit / htmlminioncount).toLocaleString();
	miniondailyprofit = Math.round(miniondailyprofit).toLocaleString();
	expenses = Math.round(expenses).toLocaleString();
	coinsleft = Math.round(coinsleft).toLocaleString();
	profitfromcraftinghypergolic = Math.round(profitfromcraftinghypergolic).toLocaleString();
	totalaftereverything = Math.round(totalaftereverything).toLocaleString();

	if (htmlminioncount < 1 || htmlminioncount > 31) {
		htmlempty.innerHTML = "Please enter the minion count value between 1 and 31.";
	} else {
		infernorow1.style.backgroundImage = "url('static/imageswebp/CRUDE_GABAGOOL.webp'), url('static/images/CRUDE_GABAGOOL.png')";
		infernooneminionprofit.innerHTML = `One minion makes ${oneminionhourlyprofit} coins per hour and ${oneminiondailyprofit} per day.`;
		infernoallminionprofit.innerHTML = `All the minions combined make ${minionhourlyprofit} coins per hour and ${miniondailyprofit} per day.`;
		infernoallcosts.innerHTML = `Using this fuel and beacon will cost you ${expenses} coins per day.`;
		infernoafterexpenses.innerHTML = `That will leave you with <span style="color: turquoise; font-weight: bold; text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);">${coinsleft} coins</span> after your expenses.`;
		htmlempty.innerHTML = `&nbsp`;
		htmlinfernogain.innerHTML = `The items you will get will be:`;
		infernobasegain.innerHTML = `${format((htmlminioncount * dailytotalminionactions * (1 - specialproduction)).toFixed(0))} base Crude Gabagool worth ${format((htmlminioncount * (1 - (taxRate / 100) * derpy) * dailytotalminionactions * (1 - specialproduction) * parseFloat(crudegabagoolprice)).toFixed(0))} coins,`;
		if (htmlfueltype != "nothing") {
			infernofuelgain.innerHTML = `${format((htmlminioncount * dailytotalminionactions * specialfuelitem).toFixed(0))} distillate ${chosenfuel} worth ${format((htmlminioncount * dailytotalminionactions * (1 - (taxRate / 100) * derpy) * specialproduction * specialfueloutput).toFixed(0))} coins,`;
			if (chosenfuel == "Crude Gabagool") {
				infernorow2.style.backgroundImage = "url('static/imageswebp/CRUDE_GABAGOOL.webp'), url('static/images/CRUDE_GABAGOOL.png')";
			} else if (chosenfuel == "Blaze Rod") {
				infernorow2.style.backgroundImage = "url('static/imageswebp/BLAZE_ROD.webp'), url('static/images/BLAZE_ROD.png')";
			} else if (chosenfuel == "Magma Cream") {
				infernorow2.style.backgroundImage = "url('static/imageswebp/MAGMA_CREAM.webp'), url('static/images/MAGMA_CREAM.png')";
			} else if (chosenfuel == "Nether Wart") {
				infernorow2.style.backgroundImage = "url('static/imageswebp/NETHER_WART.webp'), url('static/images/NETHER_WART.png')";
			} else if (chosenfuel == "Glowstone Dust") {
				infernorow2.style.backgroundImage = "url('static/imageswebp/GLOWSTONE_DUST.webp'), url('static/images/GLOWSTONE_DUST.png')";
			}
		}
		if (checkifitst3 == 1 || checkifitst3 == 1.3) {
			infernorow3.style.backgroundImage = "url('static/imageswebp/CHILI_PEPPER.webp'), url('static/images/CHILI_PEPPER.png')";
			infernorow4.style.backgroundImage = "url('static/imageswebp/INFERNO_VERTEX.webp'), url('static/images/INFERNO_VERTEX.png')";
			infernorow5.style.backgroundImage = "url('static/imageswebp/INFERNO_APEX.webp'), url('static/images/INFERNO_APEX.png')";
			infernorow6.style.backgroundImage = "url('static/imageswebp/REAPER_PEPPER.webp'), url('static/images/REAPER_PEPPER.png')";
			infernochiligain.innerHTML = `${format(((checkifitst3 / 136) * htmlminioncount * dailytotalminionactions).toFixed(2))} Chili Peppers worth ${format(((checkifitst3 / 136) * htmlminioncount * (1 - (taxRate / 100) * derpy) * dailytotalminionactions * parseFloat(chilipepperprice)).toFixed(0))} coins.`;
			infernovertexgain.innerHTML = `${format(((checkifitst3 / 5950) * htmlminioncount * dailytotalminionactions).toFixed(2))} Inferno Vertex worth ${format(((checkifitst3 / 5950) * htmlminioncount * (1 - (taxRate / 100) * derpy) * dailytotalminionactions * parseFloat(vertexprice)).toFixed(0))} coins,`;
			infernoapexgain.innerHTML = `${format(((checkifitst3 / 1309091) * apexCount * htmlminioncount * dailytotalminionactions).toFixed(2))} Inferno Apex worth ${format(((checkifitst3 / 1309091) * apexCount * htmlminioncount * (1 - (taxRate / 100) * derpy) * dailytotalminionactions * parseFloat(apexprice)).toFixed(0))} coins,`;
			infernoreapergain.innerHTML = `${format(((checkifitst3 / 458182) * htmlminioncount * dailytotalminionactions).toFixed(2))} Reaper Peppers worth ${format(((checkifitst3 / 458182) * htmlminioncount * (1 - (taxRate / 100) * derpy) * dailytotalminionactions * parseFloat(reaperprice)).toFixed(0))} coins,`;
		}
	}
}

async function minioncraftingcosts() {
	const derelictasheprice = parseFloat(itemsarray[5].price);
	const moltenpowderprice = parseFloat(itemsarray[39].price);
	const vertexprice = parseFloat(itemsarray[20].price);
	const apexprice = parseFloat(itemsarray[21].price);
	const blazecrafting1 = parseFloat(itemsarray[33].price) * 80;

	tiercraftingitems = [
		derelictasheprice * 80 + blazecrafting1,
		derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 8 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 24 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 56 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 120 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 248 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 504 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 760 + vertexprice * 16 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 1016 + vertexprice * 64 + derelictasheprice * 400 + blazecrafting1,
		moltenpowderprice * 1272 + vertexprice * 112 + apexprice + derelictasheprice * 400 + blazecrafting1,
	];

	tiercraftingitemsderelictashes = [80, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
	tiercraftingitemsmoltenpowders = [0, 0, 8, 24, 56, 120, 248, 504, 760, 1016, 1272];
	tiercraftingitemsvertex = [0, 0, 0, 0, 0, 0, 0, 0, 16, 64, 112];
	tiercraftingitemsapex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	for (let i = 1; i <= 11; i++) {
		// blade rod
		let divId = "infernominioncraftingtiertext" + i + "blazerod";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `Blaze Rod costs: ${format(blazecrafting1)} coins.`;
		}
	}

	for (let i = 1; i <= 11; i++) {
		// derelict ashe
		let divId = "infernominioncraftingtiertext" + i + "derelictashe";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `Derelict Ashe costs: ${format(derelictasheprice * tiercraftingitemsderelictashes[i - 1])} coins.`;
		}
	}

	for (let i = 3; i <= 11; i++) {
		// molten powder
		let divId = "infernominioncraftingtiertext" + i + "moltenpowder";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `Molten Powder costs: ${format(moltenpowderprice * tiercraftingitemsmoltenpowders[i - 1])} coins.`;
		}
	}

	for (let i = 9; i <= 11; i++) {
		// vertex
		let divId = "infernominioncraftingtiertext" + i + "infernovertex";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `Inferno Vertex costs: ${format(vertexprice * tiercraftingitemsvertex[i - 1])} coins.`;
		}
	}

	for (let i = 11; i <= 11; i++) {
		// apex
		let divId = "infernominioncraftingtiertext" + i + "infernoapex";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `Inferno Apex costs: ${format(apexprice * tiercraftingitemsapex[i - 1])} coins.`;
		}
	}

	for (let i = 1; i <= 11; i++) {
		// TOTAL
		let divId = "infernominioncraftingtiertext" + i + "total";
		let divElement = document.getElementById(divId);
		if (divElement) {
			divElement.innerHTML = `The total cost is: ${format(tiercraftingitems[i - 1])} coins.`;
		}
	}

    for (let i = 2; i <= 11; i++) {
        document.getElementById(`infernoMinionUpgradeCosts${i}`).innerHTML = `The cost for upgrading is: ${format(tiercraftingitems[i - 1] - tiercraftingitems[i - 2])} coins.`;
    }
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.querySelectorAll(".infernoprofitbox select, .infernoprofitbox input").forEach((select) => {
	select.addEventListener("change", function () {
		if (document.getElementById("empty").innerText.trim() !== "Press the calculate button at the top right to start.") {
			minionprofits();
		}
	});
});
