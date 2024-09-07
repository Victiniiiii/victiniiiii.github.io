// Items:
// Enchanted Melon Block, Fine Ruby Gemstone, Enchanted Sulphur

let toggleStates;

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

    document.getElementById("prices1").innerHTML = format(data.products[`ENCHANTED_MELON_BLOCK`]?.quick_status[toggleStates[0] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
    document.getElementById("prices2").innerHTML = format(data.products[`FINE_RUBY_GEM`]?.quick_status[toggleStates[1] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
    document.getElementById("prices3").innerHTML = format(data.products[`ENCHANTED_SULPHUR`]?.quick_status[toggleStates[2] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins"; 
}

document.getElementById("settings-bar").addEventListener("click", function () {
	document.getElementById("settings").classList.toggle("expanded");
});

document.addEventListener("DOMContentLoaded", function () {
	const savedToggleStates = localStorage.getItem("toggleStates");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
	} else {
        toggleStates = Array(3).fill(false);
    }

	document.querySelectorAll(".toggle-switch").forEach(function (toggleSwitch, index) {
		if (toggleStates[index]) {
			toggleSwitch.classList.add("active");
		} else {
			toggleSwitch.classList.remove("active");
		}
	});
    bazaarconnect();
});

document.querySelectorAll(".toggle-switch").forEach(function (toggleSwitch, index) {
	toggleSwitch.addEventListener("click", function () {
		toggleSwitch.classList.toggle("active");
		toggleStates[index] = !toggleStates[index];
		localStorage.setItem("toggleStates", JSON.stringify(toggleStates));
		bazaarconnect();
	});
});

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}