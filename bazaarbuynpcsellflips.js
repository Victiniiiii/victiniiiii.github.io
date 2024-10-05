let toggleStates;
let itemsarray = [
    {
        "name": "Enchanted Melon Block",
        "id" : "ENCHANTED_MELON_BLOCK",
        "npc" : "51200"
    },
    {
        "name": "Fine Ruby Gemstone",
        "id" : "FINE_RUBY_GEM",
        "npc" : "19200"
    },
    {
        "name": "Enchanted Sulphur",
        "id" : "ENCHANTED_SULPHUR",
        "npc" : "1600"
    },
    {
        "name": "Enchanted Gold",
        "id" : "ENCHANTED_GOLD",
        "npc" : "480"
    }
]

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

        toggleSwitch.addEventListener("click", function () {
            toggleSwitch.classList.toggle("active");
            toggleStates[index] = !toggleStates[index];
            localStorage.setItem("toggleStates", JSON.stringify(toggleStates));
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

    for (i = 0; i < itemsarray.length; i++) {
        let ableToSellCount = (200000000 / itemsarray[i].npc).toFixed(0);
        document.getElementById(`prices${i+1}`).innerHTML = format(data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
        document.getElementById(`BbNs${i+1}Text`).innerHTML = `If you buy ${ableToSellCount} ${itemsarray[i].name} from the bazaar, and sell it to NPC, you will make ${format(ableToSellCount * (itemsarray[i].npc - data.products[`${itemsarray[i].id}`]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"]).toFixed(0))} coins.`
    }
}

function format(x) {
	return Number.parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}