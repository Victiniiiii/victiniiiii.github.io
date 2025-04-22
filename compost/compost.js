async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	const compostPrice = data.products[`COMPOST`]?.quick_status.buyPrice.toFixed(0);

	const seedPrice = data.products[`ENCHANTED_SEEDS`]?.quick_status.sellPrice.toFixed(0);
	const organicMatterPrice = seedPrice / 160;

	const oilPrice = data.products[`OIL_BARREL`]?.quick_status.sellPrice.toFixed(0);
	const fuelPrice = oilPrice / 10000;

	const speedLevel = parseInt(document.getElementById("speedLevel").value);
	const multiDropLevel = parseInt(document.getElementById("multiDropLevel").value);
	const fuelCapLevel = parseInt(document.getElementById("fuelCapLevel").value);
	const orgMatterCapLevel = parseInt(document.getElementById("orgMatterCapLevel").value);
	const costReductionLevel = parseInt(document.getElementById("costReductionLevel").value);

	if (!isValidLevel(speedLevel) || !isValidLevel(multiDropLevel) || !isValidLevel(fuelCapLevel) || !isValidLevel(orgMatterCapLevel) || !isValidLevel(costReductionLevel)) {
		document.getElementById("resultHour").innerText = "Please enter values between 0 and 25.";
		return;
	}

	const baseProductionRate = 1;
	const speedMultiplier = 1 + 0.2 * speedLevel;
	const multiDropMultiplier = 1 + 0.03 * multiDropLevel;
	const fuelCapMultiplier = 100000 + 30000 * fuelCapLevel;
	const orgMatterCapMultiplier = 40000 + 20000 * orgMatterCapLevel;
	const costReductionMultiplier = 1 - 0.01 * costReductionLevel;

	const productionRatePerHour = baseProductionRate * speedMultiplier * multiDropMultiplier * 6;

	const orgMatterConsumed = 4000 * baseProductionRate * speedMultiplier * costReductionMultiplier * 6;
	const fuelConsumed = 2000 * baseProductionRate * speedMultiplier * costReductionMultiplier * 6;

	const incomePerHour = productionRatePerHour * compostPrice;
	const costPerHour = fuelConsumed * fuelPrice + orgMatterConsumed * organicMatterPrice;
	const totalProfitPerHour = incomePerHour - costPerHour;
	const totalProfitPerDay = totalProfitPerHour * 24;

	const machineRuntimeCurrentLevel = Math.min(orgMatterCapMultiplier / orgMatterConsumed, fuelCapMultiplier / fuelConsumed);

	document.getElementById("resultHour").innerText = `Currently you make ${Math.floor(totalProfitPerHour).toLocaleString()} coins per hour, ${Math.floor(totalProfitPerDay).toLocaleString()} coins per day, the composter will work for ${machineRuntimeCurrentLevel.toFixed(2)} hours, making you ${Math.floor(totalProfitPerHour * machineRuntimeCurrentLevel).toLocaleString()} coins per refill.`;

	const upgradeNames = ["Composter Speed", "Multi Drop", "Fuel Cap", "Organic Matter Cap", "Cost Reduction"];
	const upgradeLevels = [speedLevel, multiDropLevel, fuelCapLevel, orgMatterCapLevel, costReductionLevel];
	const upgradeResults = [document.getElementById("upgradeResult1"), document.getElementById("upgradeResult2"), document.getElementById("upgradeResult3"), document.getElementById("upgradeResult4"), document.getElementById("upgradeResult5")];

	const maxValues = {
		coinsPerHour: -Infinity,
		coinsPerDay: -Infinity,
		machineRuntime: -Infinity,
		coinsPerRefill: -Infinity,
	};

	const maxIndices = {
		coinsPerHour: -1,
		coinsPerDay: -1,
		machineRuntime: -1,
		coinsPerRefill: -1,
	};

	for (let i = 0; i < upgradeNames.length; i++) {
		if (upgradeLevels[i] === 25) {
			upgradeResults[i].innerText = "This upgrade can not be increased further.";
			continue;
		}

		const newUpgradeLevels = [...upgradeLevels];
		newUpgradeLevels[i]++;

		const newSpeedLevel = newUpgradeLevels[0];
		const newMultiDropLevel = newUpgradeLevels[1];
		const newFuelCapLevel = newUpgradeLevels[2];
		const newOrgMatterCapLevel = newUpgradeLevels[3];
		const newCostReductionLevel = newUpgradeLevels[4];

		const newSpeedMultiplier = 1 + 0.2 * newSpeedLevel;
		const newMultiDropMultiplier = 1 + 0.03 * newMultiDropLevel;
		const newFuelCapMultiplier = 100000 + 30000 * newFuelCapLevel;
		const newOrgMatterCapMultiplier = 40000 + 20000 * newOrgMatterCapLevel;
		const newCostReductionMultiplier = 1 - 0.01 * newCostReductionLevel;

		const newProductionRatePerHour = baseProductionRate * newSpeedMultiplier * newMultiDropMultiplier * 6;

		const newOrgMatterConsumed = 4000 * baseProductionRate * newSpeedMultiplier * newCostReductionMultiplier * 6;
		const newFuelConsumed = 2000 * baseProductionRate * newSpeedMultiplier * newCostReductionMultiplier * 6;

		const newIncomePerHour = newProductionRatePerHour * compostPrice;
		const newCostPerHour = newFuelConsumed * fuelPrice + newOrgMatterConsumed * organicMatterPrice;
		const newTotalProfitPerHour = newIncomePerHour - newCostPerHour;
		const newTotalProfitPerDay = newTotalProfitPerHour * 24;

		const newMachineRuntime = Math.min(newOrgMatterCapMultiplier / newOrgMatterConsumed, newFuelCapMultiplier / newFuelConsumed);
		const newCoinsPerRefill = Math.floor(newTotalProfitPerHour * newMachineRuntime);

		if (newTotalProfitPerHour > maxValues.coinsPerHour) {
			maxValues.coinsPerHour = newTotalProfitPerHour;
			maxIndices.coinsPerHour = i;
		}
		if (newTotalProfitPerDay > maxValues.coinsPerDay) {
			maxValues.coinsPerDay = newTotalProfitPerDay;
			maxIndices.coinsPerDay = i;
		}
		if (newMachineRuntime > maxValues.machineRuntime) {
			maxValues.machineRuntime = newMachineRuntime;
			maxIndices.machineRuntime = i;
		}
		if (newCoinsPerRefill > maxValues.coinsPerRefill) {
			maxValues.coinsPerRefill = newCoinsPerRefill;
			maxIndices.coinsPerRefill = i;
		}

		upgradeResults[i].innerHTML = `If you upgrade ${upgradeNames[i]}, you will make ${Math.floor(newTotalProfitPerHour).toLocaleString()} coins per hour, ${Math.floor(newTotalProfitPerDay).toLocaleString()} coins per day, the composter will work for ${newMachineRuntime.toFixed(2)} hours, making you ${newCoinsPerRefill.toLocaleString()} coins per refill.`;
	}

	if (maxIndices.coinsPerHour !== -1) {
		const upgradeResultCoinsPerHour = upgradeResults[maxIndices.coinsPerHour].innerHTML;
		upgradeResults[maxIndices.coinsPerHour].innerHTML = upgradeResultCoinsPerHour.replace(/(\d{1,3},)*\d{3} coins per hour/g, (match) => `<span style="color:red">${match}</span>`);
	}
	if (maxIndices.coinsPerDay !== -1) {
		const upgradeResultCoinsPerDay = upgradeResults[maxIndices.coinsPerDay].innerHTML;
		upgradeResults[maxIndices.coinsPerDay].innerHTML = upgradeResultCoinsPerDay.replace(/(\d{1,3},)*\d{3} coins per day/g, (match) => `<span style="color:red">${match}</span>`);
	}
	if (maxIndices.machineRuntime !== -1) {
		upgradeResults[maxIndices.machineRuntime].innerHTML = upgradeResults[maxIndices.machineRuntime].innerHTML.replace(`${maxValues.machineRuntime.toFixed(2)} hours`, `<span style="color:red">${maxValues.machineRuntime.toFixed(2)} hours</span>`);
	}
	if (maxIndices.coinsPerRefill !== -1) {
		upgradeResults[maxIndices.coinsPerRefill].innerHTML = upgradeResults[maxIndices.coinsPerRefill].innerHTML.replace(`${maxValues.coinsPerRefill.toLocaleString()} coins per refill`, `<span style="color:red">${maxValues.coinsPerRefill.toLocaleString()} coins per refill</span>`);
	}

	for (let i = 1; i <= 131; i++) {
		const osuruk = document.getElementById(`spreadsheet${i}`);
		osuruk.style.backgroundColor = "rgb(0,0,0,0.3)";
	}

	if (speedLevel !== null && speedLevel !== undefined && speedLevel !== "" && speedLevel != 25) {
		var deneme = document.getElementById(`spreadsheet${1 + speedLevel * 5}`);
		deneme.style.backgroundColor = "lightblue";
	}

	if (multiDropLevel !== null && multiDropLevel !== undefined && multiDropLevel !== "" && multiDropLevel != 25) {
		var deneme = document.getElementById(`spreadsheet${2 + multiDropLevel * 5}`);
		deneme.style.backgroundColor = "lightblue";
	}

	if (fuelCapLevel !== null && fuelCapLevel !== undefined && fuelCapLevel !== "" && fuelCapLevel != 25) {
		var deneme = document.getElementById(`spreadsheet${3 + fuelCapLevel * 5}`);
		deneme.style.backgroundColor = "lightblue";
	}

	if (orgMatterCapLevel !== null && orgMatterCapLevel !== undefined && orgMatterCapLevel !== "" && orgMatterCapLevel != 25) {
		var deneme = document.getElementById(`spreadsheet${4 + orgMatterCapLevel * 5}`);
		deneme.style.backgroundColor = "lightblue";
	}

	if (costReductionLevel !== null && costReductionLevel !== undefined && costReductionLevel !== "" && costReductionLevel != 25) {
		var deneme = document.getElementById(`spreadsheet${5 + costReductionLevel * 5}`);
		deneme.style.backgroundColor = "lightblue";
	}
}

function isValidLevel(level) {
	return level >= 0 && level <= 25;
}

async function getbestmatterandfuel() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	// organic matters (47)

	const boxofseeds = data.products[`BOX_OF_SEEDS`]?.quick_status.sellPrice.toFixed(0);
	const matterboxofseeds = boxofseeds / 25600;

	const cropie = data.products[`CROPIE`]?.quick_status.sellPrice.toFixed(0);
	const organiccropie = cropie / 2500;

	const enchantedbakedpotato = data.products[`ENCHANTED_BAKED_POTATO`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedbakedpotato = enchantedbakedpotato / 8448;

	const enchantedbread = data.products[`ENCHANTED_BREAD`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedbread = enchantedbread / 60;

	const enchantedbrownmushroomblock = data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedbrownmushroomblock = enchantedbrownmushroomblock / 5184;

	const enchantedbrownmushroom = data.products[`ENCHANTED_BROWN_MUSHROOM`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedbrownmushroom = enchantedbrownmushroom / 160;

	const enchantedcactus = data.products[`ENCHANTED_CACTUS`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedcactus = enchantedcactus / 12800;

	const enchantedcactusgreen = data.products[`ENCHANTED_CACTUS_GREEN`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedcactusgreen = enchantedcactusgreen / 80;

	const enchantedcarrot = data.products[`ENCHANTED_CARROT`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedcarrot = enchantedcarrot / 46.4;

	const enchantedcocoabeans = data.products[`ENCHANTED_COCOA`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedcocoabeans = enchantedcocoabeans / 64;

	const enchantedhaybale = data.products[`ENCHANTED_HAY_BALE`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedhaybale = enchantedhaybale / 25600;

	const enchantedmelonblock = data.products[`ENCHANTED_MELON_BLOCK`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedmelonblock = enchantedmelonblock / 5120;

	const enchantedmelon = data.products[`ENCHANTED_MELON`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedmelon = enchantedmelon / 32;

	const enchantednetherwart = data.products[`ENCHANTED_NETHER_STALK`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantednetherwart = enchantednetherwart / 52.8;

	const enchantedpaper = data.products[`ENCHANTED_PAPER`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedpaper = enchantedpaper / 96;

	const enchantedpoisonouspotato = data.products[`ENCHANTED_POISONOUS_POTATO`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedpoisonouspotato = enchantedpoisonouspotato / 52.8;

	const enchantedpotato = data.products[`ENCHANTED_POTATO`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedpotato = enchantedpotato / 52.8;

	const enchantedpumpkin = data.products[`ENCHANTED_PUMPKIN`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedpumpkin = enchantedpumpkin / 160;

	const enchantedredmushroomblock = data.products[`ENCHANTED_HUGE_MUSHROOM_2`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedredmushroomblock = enchantedredmushroomblock / 5184;

	const enchantedredmushroom = data.products[`ENCHANTED_RED_MUSHROOM`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedredmushroom = enchantedredmushroom / 160;

	const enchantedseeds = data.products[`ENCHANTED_SEEDS`]?.quick_status.sellPrice.toFixed(0);
	const organicechantedseeds = enchantedseeds / 160;

	const enchantedsugarcane = data.products[`ENCHANTED_SUGAR_CANE`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedsugarcane = enchantedsugarcane / 12800;

	const enchantedsugar = data.products[`ENCHANTED_SUGAR`]?.quick_status.sellPrice.toFixed(0);
	const organicenchantedsugar = enchantedsugar / 80;

	const fermento = data.products[`FERMENTO`]?.quick_status.sellPrice.toFixed(0);
	const organicfermento = fermento / 20000;

	const floweringbouquet = data.products[`FLOWERING_BOUQUET`]?.quick_status.sellPrice.toFixed(0);
	const organicfloweringbouquet = floweringbouquet / 6000;

	const mutantnetherwart = data.products[`MUTANT_NETHER_STALK`]?.quick_status.sellPrice.toFixed(0);
	const organicmutantnetherwart = mutantnetherwart / 8448;

	const polishedpumpkin = data.products[`POLISHED_PUMPKIN`]?.quick_status.sellPrice.toFixed(0);
	const organicpolishedpumpkin = polishedpumpkin / 25600;

	const squash = data.products[`SQUASH`]?.quick_status.sellPrice.toFixed(0);
	const organicsquash = squash / 10000;

    const enchantedwheat = data.products["ENCHANTED_WHEAT"]?.quick_status.sellPrice.toFixed(0);
    const organicwheat = enchantedwheat / 160;

	const organicMatters = [
		{ name: "Box of Seeds", price: matterboxofseeds },
		{ name: "Cropie", price: organiccropie },
		{ name: "Enchanted Baked Potato", price: organicenchantedbakedpotato },
		{ name: "Enchanted Bread", price: organicenchantedbread },
		{ name: "Enchanted Brown Mushroom Block", price: organicenchantedbrownmushroomblock },
		{ name: "Enchanted Brown Mushroom", price: organicenchantedbrownmushroom },
		{ name: "Enchanted Cactus", price: organicenchantedcactus },
		{ name: "Enchanted Cactus Green", price: organicenchantedcactusgreen },
		{ name: "Enchanted Carrot", price: organicenchantedcarrot },
		{ name: "Enchanted Cocoa Beans", price: organicenchantedcocoabeans },
		{ name: "Enchanted Hay Bale", price: organicenchantedhaybale },
		{ name: "Enchanted Melon Block", price: organicenchantedmelonblock },
		{ name: "Enchanted Melon", price: organicenchantedmelon },
		{ name: "Enchanted Nether Wart", price: organicenchantednetherwart },
		{ name: "Enchanted Paper", price: organicenchantedpaper },
		{ name: "Enchanted Poisonous Potato", price: organicenchantedpoisonouspotato },
		{ name: "Enchanted Potato", price: organicenchantedpotato },
		{ name: "Enchanted Pumpkin", price: organicenchantedpumpkin },
		{ name: "Enchanted Red Mushroom Block", price: organicenchantedredmushroomblock },
		{ name: "Enchanted Red Mushroom", price: organicenchantedredmushroom },
		{ name: "Enchanted Seeds", price: organicechantedseeds },
		{ name: "Enchanted Sugar Cane", price: organicenchantedsugarcane },
		{ name: "Enchanted Sugar", price: organicenchantedsugar },
        { name: "Enchanted Wheat", price: organicwheat },
		{ name: "Fermento", price: organicfermento },
		{ name: "Flowering Bouquet", price: organicfloweringbouquet },
		{ name: "Mutant Nether Wart", price: organicmutantnetherwart },
		{ name: "Polished Pumpkin", price: organicpolishedpumpkin },
		{ name: "Squash", price: organicsquash },
	];

	organicMatters.sort((a, b) => a.price - b.price);

	const organicRows = document.querySelectorAll(".organicrow");
	for (let i = 0; i < 5; i++) {
		organicRows[i].innerHTML = `${i + 1}. ${organicMatters[i].name}: ${organicMatters[i].price.toFixed(2)} coins per unit`;
	}

	// fuels (3)

	const fuels = [
		{ name: "Oil Barrel", price: data.products[`OIL_BARREL`]?.quick_status.sellPrice.toFixed(0) / 10000 },
		{ name: "Volta", price: data.products[`VOLTA`]?.quick_status.sellPrice.toFixed(0) / 10000 },
		{ name: "Biofuel", price: 20000 / 10000 },
	];

	fuels.sort((a, b) => a.price - b.price);

	const fuelRows = document.querySelectorAll(".fuelrow");
	for (let i = 0; i < 3; i++) {
		fuelRows[i].innerHTML = `${i + 1}. ${fuels[i].name}: ${fuels[i].price.toFixed(2)} coins per unit`;
	}
}

async function compostspreadsheet() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	const enchantedhaybale = data.products[`ENCHANTED_HAY_BALE`]?.quick_status.sellPrice.toFixed(0);
	const enchantedwheat = data.products["ENCHANTED_WHEAT"]?.quick_status.sellPrice.toFixed(0);
	const enchantedgoldencarrot = data.products["ENCHANTED_GOLDEN_CARROT"]?.quick_status.sellPrice.toFixed(0);

	const enchantedbakedpotato = data.products[`ENCHANTED_BAKED_POTATO`]?.quick_status.sellPrice.toFixed(0);
	const enchantedpumpkin = data.products[`ENCHANTED_PUMPKIN`]?.quick_status.sellPrice.toFixed(0);
	const polishedpumpkin = data.products[`POLISHED_PUMPKIN`]?.quick_status.sellPrice.toFixed(0);

	const enchantedsugarcane = data.products[`ENCHANTED_SUGAR_CANE`]?.quick_status.sellPrice.toFixed(0);
	const enchantedmelonblock = data.products[`ENCHANTED_MELON_BLOCK`]?.quick_status.sellPrice.toFixed(0);

	const enchantedcactus = data.products[`ENCHANTED_CACTUS`]?.quick_status.sellPrice.toFixed(0);
	const enchantedcookie = data.products["ENCHANTED_COOKIE"]?.quick_status.sellPrice.toFixed(0);

	const enchantedbrownmushroom = data.products[`ENCHANTED_BROWN_MUSHROOM`]?.quick_status.sellPrice.toFixed(0);
	const enchantedredmushroomblock = data.products[`ENCHANTED_HUGE_MUSHROOM_2`]?.quick_status.sellPrice.toFixed(0);
	const enchantedbrownmushroomblock = data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status.sellPrice.toFixed(0);
	const mutantnetherwart = data.products[`MUTANT_NETHER_STALK`]?.quick_status.sellPrice.toFixed(0);

	const cropie = data.products[`CROPIE`]?.quick_status.sellPrice.toFixed(0);
	const squash = data.products[`SQUASH`]?.quick_status.sellPrice.toFixed(0);
	const fermento = data.products[`FERMENTO`]?.quick_status.sellPrice.toFixed(0);
	const condensedfermento = data.products[`CONDENSED_FERMENTO`]?.quick_status.sellPrice.toFixed(0);

	const spreadsheetElements = [];

	for (let i = 1; i <= 131; i++) {
		const spreadsheetId = `spreadsheet${i}`;
		const spreadsheet = document.getElementById(spreadsheetId);
		spreadsheetElements.push(spreadsheet);
	}

	for (let i = 1; i <= 131; i++) {
		const spreadsheetHtmlId = `spreadsheet${i}`;
		let value;

		switch (i) {
			case 1:
				value = enchantedwheat * 128;
				break;
			case 2:
				value = enchantedbakedpotato * 1;
				break;
			case 3:
				value = enchantedsugarcane * 1;
				break;
			case 4:
				value = enchantedcactus * 1;
				break;
			case 5:
				value = enchantedbrownmushroom * 32;
				break;
			case 6:
				value = enchantedgoldencarrot * 2;
				break;
			case 7:
				value = enchantedpumpkin * 64;
				break;
			case 8:
				value = enchantedmelonblock * 4;
				break;
			case 9:
				value = enchantedcookie * 3;
				break;
			case 10:
				value = mutantnetherwart * 1;
				break;
			case 11:
				value = enchantedwheat * 256;
				break;
			case 12:
				value = enchantedbakedpotato * 2;
				break;
			case 13:
				value = enchantedsugarcane * 2;
				break;
			case 14:
				value = enchantedcactus * 2;
				break;
			case 15:
				value = enchantedredmushroomblock * 2;
				break;
			case 16:
				value = enchantedgoldencarrot * 4;
				break;
			case 17:
				value = polishedpumpkin * 1;
				break;
			case 18:
				value = enchantedmelonblock * 8;
				break;
			case 19:
				value = enchantedcookie * 6;
				break;
			case 20:
				value = mutantnetherwart * 2;
				break;
			case 21:
				value = enchantedwheat * 512;
				break;
			case 22:
				value = enchantedbakedpotato * 4;
				break;
			case 23:
				value = enchantedsugarcane * 4;
				break;
			case 24:
				value = enchantedcactus * 4;
				break;
			case 25:
				value = enchantedbrownmushroomblock * 4;
				break;
			case 26:
				value = enchantedgoldencarrot * 8;
				break;
			case 27:
				value = polishedpumpkin * 2;
				break;
			case 28:
				value = enchantedmelonblock * 16;
				break;
			case 29:
				value = enchantedcookie * 12;
				break;
			case 30:
				value = mutantnetherwart * 4;
				break;
			case 31:
				value = enchantedhaybale * 8;
				break;
			case 32:
				value = enchantedbakedpotato * 8;
				break;
			case 33:
				value = enchantedsugarcane * 8;
				break;
			case 34:
				value = enchantedcactus * 7;
				break;
			case 35:
				value = enchantedredmushroomblock * 16;
				break;
			case 36:
				value = cropie * 3 + enchantedgoldencarrot * 16;
				break;
			case 37:
				value = cropie * 3 + polishedpumpkin * 4;
				break;
			case 38:
				value = cropie * 3 + enchantedmelonblock * 32;
				break;
			case 39:
				value = cropie * 3 + enchantedcookie * 24;
				break;
			case 40:
				value = cropie * 3 + mutantnetherwart * 8;
				break;
			case 41:
				value = cropie * 6 + enchantedhaybale * 16;
				break;
			case 42:
				value = cropie * 6 + enchantedbakedpotato * 16;
				break;
			case 43:
				value = cropie * 6 + enchantedsugarcane * 16;
				break;
			case 44:
				value = cropie * 6 + enchantedcactus * 10;
				break;
			case 45:
				value = cropie * 6 + enchantedbrownmushroomblock * 32;
				break;
			case 46:
				value = cropie * 12 + enchantedgoldencarrot * 32;
				break;
			case 47:
				value = cropie * 12 + polishedpumpkin * 8;
				break;
			case 48:
				value = cropie * 12 + enchantedmelonblock * 48;
				break;
			case 49:
				value = cropie * 12 + enchantedcookie * 48;
				break;
			case 50:
				value = cropie * 12 + mutantnetherwart * 16;
				break;
			case 51:
				value = cropie * 32 + enchantedhaybale * 24;
				break;
			case 52:
				value = cropie * 32 + enchantedbakedpotato * 32;
				break;
			case 53:
				value = cropie * 32 + enchantedsugarcane * 32;
				break;
			case 54:
				value = cropie * 32 + enchantedcactus * 16;
				break;
			case 55:
				value = cropie * 32 + enchantedredmushroomblock * 64;
				break;
			case 56:
				value = cropie * 64 + enchantedgoldencarrot * 48;
				break;
			case 57:
				value = cropie * 64 + polishedpumpkin * 16;
				break;
			case 58:
				value = cropie * 64 + enchantedmelonblock * 64;
				break;
			case 59:
				value = cropie * 64 + enchantedcookie * 72;
				break;
			case 60:
				value = cropie * 64 + mutantnetherwart * 32;
				break;
			case 61:
				value = cropie * 128 + enchantedhaybale * 32;
				break;
			case 62:
				value = cropie * 128 + enchantedbakedpotato * 48;
				break;
			case 63:
				value = cropie * 128 + enchantedsugarcane * 48;
				break;
			case 64:
				value = cropie * 128 + enchantedcactus * 24;
				break;
			case 65:
				value = cropie * 128 + enchantedbrownmushroomblock * 128;
				break;
			case 66:
				value = squash * 3 + enchantedgoldencarrot * 64;
				break;
			case 67:
				value = squash * 3 + polishedpumpkin * 32;
				break;
			case 68:
				value = squash * 3 + enchantedmelonblock * 96;
				break;
			case 69:
				value = squash * 3 + enchantedcookie * 96;
				break;
			case 70:
				value = squash * 3 + mutantnetherwart * 48;
				break;
			case 71:
				value = squash * 6 + enchantedhaybale * 48;
				break;
			case 72:
				value = squash * 6 + enchantedbakedpotato * 64;
				break;
			case 73:
				value = squash * 6 + enchantedsugarcane * 64;
				break;
			case 74:
				value = squash * 6 + enchantedcactus * 32;
				break;
			case 75:
				value = squash * 6 + enchantedredmushroomblock * 256;
				break;
			case 76:
				value = squash * 12 + enchantedgoldencarrot * 96;
				break;
			case 77:
				value = squash * 12 + polishedpumpkin * 48;
				break;
			case 78:
				value = squash * 12 + enchantedmelonblock * 128;
				break;
			case 79:
				value = squash * 12 + enchantedcookie * 144;
				break;
			case 80:
				value = squash * 12 + mutantnetherwart * 64;
				break;
			case 81:
				value = squash * 32 + enchantedhaybale * 64;
				break;
			case 82:
				value = squash * 32 + enchantedbakedpotato * 96;
				break;
			case 83:
				value = squash * 32 + enchantedsugarcane * 96;
				break;
			case 84:
				value = squash * 32 + enchantedcactus * 48;
				break;
			case 85:
				value = squash * 32 + enchantedbrownmushroomblock * 448;
				break;
			case 86:
				value = squash * 64 + enchantedgoldencarrot * 128;
				break;
			case 87:
				value = squash * 64 + polishedpumpkin * 64;
				break;
			case 88:
				value = squash * 64 + enchantedmelonblock * 192;
				break;
			case 89:
				value = squash * 64 + enchantedcookie * 192;
				break;
			case 90:
				value = squash * 64 + mutantnetherwart * 96;
				break;
			case 91:
				value = squash * 128 + enchantedhaybale * 80;
				break;
			case 92:
				value = squash * 128 + enchantedbakedpotato * 128;
				break;
			case 93:
				value = squash * 128 + enchantedsugarcane * 128;
				break;
			case 94:
				value = squash * 128 + enchantedcactus * 64;
				break;
			case 95:
				value = squash * 128 + enchantedredmushroomblock * 640;
				break;
			case 96:
				value = fermento * 3 + enchantedgoldencarrot * 192;
				break;
			case 97:
				value = fermento * 3 + polishedpumpkin * 96;
				break;
			case 98:
				value = fermento * 3 + enchantedmelonblock * 256;
				break;
			case 99:
				value = fermento * 3 + enchantedcookie * 256;
				break;
			case 100:
				value = fermento * 3 + mutantnetherwart * 160;
				break;
			case 101:
				value = fermento * 6 + enchantedhaybale * 104;
				break;
			case 102:
				value = fermento * 6 + enchantedbakedpotato * 192;
				break;
			case 103:
				value = fermento * 6 + enchantedsugarcane * 192;
				break;
			case 104:
				value = fermento * 6 + enchantedcactus * 96;
				break;
			case 105:
				value = fermento * 6 + enchantedbrownmushroomblock * 832;
				break;
			case 106:
				value = fermento * 12 + enchantedgoldencarrot * 256;
				break;
			case 107:
				value = fermento * 12 + polishedpumpkin * 128;
				break;
			case 108:
				value = fermento * 12 + enchantedmelonblock * 384;
				break;
			case 109:
				value = fermento * 12 + enchantedcookie * 352;
				break;
			case 110:
				value = fermento * 12 + mutantnetherwart * 224;
				break;
			case 111:
				value = condensedfermento * 4 + enchantedhaybale * 128;
				break;
			case 112:
				value = condensedfermento * 4 + enchantedbakedpotato * 256;
				break;
			case 113:
				value = condensedfermento * 4 + enchantedsugarcane * 256;
				break;
			case 114:
				value = condensedfermento * 4 + enchantedcactus * 128;
				break;
			case 115:
				value = condensedfermento * 4 + enchantedredmushroomblock * 1024;
				break;
			case 116:
				value = condensedfermento * 7 + enchantedgoldencarrot * 320;
				break;
			case 117:
				value = condensedfermento * 7 + polishedpumpkin * 192;
				break;
			case 118:
				value = condensedfermento * 7 + enchantedmelonblock * 512;
				break;
			case 119:
				value = condensedfermento * 7 + enchantedcookie * 448;
				break;
			case 120:
				value = condensedfermento * 7 + mutantnetherwart * 288;
				break;
			case 121:
				value = condensedfermento * 14 + enchantedhaybale * 160;
				break;
			case 122:
				value = condensedfermento * 14 + enchantedbakedpotato * 320;
				break;
			case 123:
				value = condensedfermento * 14 + enchantedsugarcane * 320;
				break;
			case 124:
				value = condensedfermento * 14 + enchantedcactus * 160;
				break;
			case 125:
				value = condensedfermento * 14 + enchantedbrownmushroomblock * 1216;
				break;
			case 126:
				value = cropie * 245 + squash * 245 + fermento * 21 + condensedfermento * 25 + enchantedhaybale * 664 + enchantedwheat * 896 + enchantedgoldencarrot * 1166;
				break;
			case 127:
				value = cropie * 245 + squash * 245 + fermento * 21 + condensedfermento * 25 + enchantedbakedpotato * 1167 + enchantedpumpkin * 64 + polishedpumpkin * 591;
				break;
			case 128:
				value = cropie * 245 + squash * 245 + fermento * 21 + condensedfermento * 25 + enchantedsugarcane * 1167 + enchantedmelonblock * 1740;
				break;
			case 129:
				value = cropie * 245 + squash * 245 + fermento * 21 + condensedfermento * 25 + enchantedcactus * 592 + enchantedcookie * 1653;
				break;
			case 130:
				value = cropie * 245 + squash * 245 + fermento * 21 + condensedfermento * 25 + enchantedbrownmushroom * 32 + enchantedbrownmushroomblock * 2660 + enchantedredmushroomblock * 2002 + mutantnetherwart * 943;
				break;
			case 131:
				value = cropie * 1225 + squash * 1225 + fermento * 95 + condensedfermento * 125 + enchantedhaybale * 664 + enchantedwheat * 896 + enchantedgoldencarrot * 1166 + enchantedbakedpotato * 1167 + enchantedpumpkin * 64 + polishedpumpkin * 591 + enchantedsugarcane * 1167 + enchantedmelonblock * 1740 + enchantedcactus * 592 + enchantedcookie * 1653 + enchantedbrownmushroom * 32 + enchantedbrownmushroomblock * 2660 + enchantedredmushroomblock * 2002 + mutantnetherwart * 943;
				break;
			default:
				value = 0; // If 0 its broken
		}

		let compostpretext = i === 131 ? "The cost of getting every single upgrade in the composter currently costs " : "";
		const htmlSpreadsheet = `${compostpretext}${value.toLocaleString()} coins`;
		document.getElementById(spreadsheetHtmlId).innerHTML = htmlSpreadsheet;
	}
}

getbestmatterandfuel();
compostspreadsheet();
