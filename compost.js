function calculateProfit() {
	const speedLevel = parseInt(document.getElementById('speedLevel').value);
	const multiDropLevel = parseInt(document.getElementById('multiDropLevel').value);
	const fuelCapLevel = parseInt(document.getElementById('fuelCapLevel').value);
	const orgMatterCapLevel = parseInt(document.getElementById('orgMatterCapLevel').value);
	const costReductionLevel = parseInt(document.getElementById('costReductionLevel').value);

	if (!isValidLevel(speedLevel) || !isValidLevel(multiDropLevel) || !isValidLevel(fuelCapLevel) || !isValidLevel(orgMatterCapLevel) || !isValidLevel(costReductionLevel)) {
		document.getElementById('resultHour').innerText = "Please enter values between 0 and 25.";
		document.getElementById('resultDay').innerText = "";
		return;
	}

	const compostPrice = 21034;
	const organicMatterPrice = 455 / 160;
	const fuelPrice = 4754 / 10000;

	const baseProductionRate = 1;

	const speedMultiplier = 1 + (0.2 * speedLevel);
	const multiDropMultiplier = 1 + (0.03 * multiDropLevel);
	const fuelCapMultiplier = 30000 * fuelCapLevel;
	const orgMatterCapMultiplier = 20000 * orgMatterCapLevel;
	const costReductionMultiplier = 1 - (0.01 * costReductionLevel);

	const productionRatePerHour = baseProductionRate * speedMultiplier * multiDropMultiplier * 6;

	const orgMatterConsumed = 4000 * baseProductionRate * speedMultiplier * costReductionMultiplier * 6;
	const fuelConsumed = 2000 * baseProductionRate * speedMultiplier * costReductionMultiplier * 6;

	const incomePerHour = productionRatePerHour * compostPrice;
	const costPerHour = (fuelConsumed * fuelPrice) + (orgMatterConsumed * organicMatterPrice);
	const totalProfitPerHour = incomePerHour - costPerHour;
	const totalProfitPerDay = totalProfitPerHour * 24;

	document.getElementById('resultHour').innerText = `Profit per hour: ${totalProfitPerHour.toFixed(2)} coins`;
	document.getElementById('resultDay').innerText = `Profit per day: ${totalProfitPerDay.toFixed(2)} coins`;
}

function isValidLevel(level) {
	return !isNaN(level) && level >= 0 && level <= 25;
}
