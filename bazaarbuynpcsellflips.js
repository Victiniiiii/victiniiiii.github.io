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
    },
    {
        "name": "Enchanted Diamond Block",
        "id" : "ENCHANTED_DIAMOND_BLOCK",
        "npc" : "204800"
    },
    {
        "name": "Enchanted Melon",
        "id" : "ENCHANTED_MELON",
        "npc" : "320"
    },
    {
        "name": "Enchanted Wheat",
        "id" : "ENCHANTED_WHEAT",
        "npc" : "960"
    },
    {
        "name": "Enchanted Slime Block",
        "id" : "ENCHANTED_SLIME_BLOCK",
        "npc" : "128000"
    },
    {
        "name": "Enchanted Clay Block",
        "id" : "ENCHANTED_CLAY_BLOCK",
        "npc" : "76800"
    },
    {
        "name": "Squash",
        "id" : "SQUASH",
        "npc" : "75000"
    },
    {
        "name": "Mutant Nether Wart",
        "id" : "MUTANT_NETHER_STALK",
        "npc" : "102400",
        "img": "MUTANT_NETHER_WART"
    },
    {
        "name": "Polished Pumpkin",
        "id" : "POLISHED_PUMPKIN",
        "npc" : "256000"
    },
    {
        "name": "Enchanted Nether Wart",
        "id" : "ENCHANTED_NETHER_STALK",
        "npc" : "640",
        "img": "ENCHANTED_NETHER_WART"
    },
    {
        "name": "Enchanted Red Mushroom",
        "id" : "ENCHANTED_RED_MUSHROOM",
        "npc" : "1600"
    },
    {
        "name": "Enchanted Pumpkin",
        "id" : "ENCHANTED_PUMPKIN",
        "npc" : "1600"
    },
    {
        "name": "Enchanted Hay Bale",
        "id" : "ENCHANTED_HAY_BALE",
        "npc" : "153600"
    },
    {
        "name": "Enchanted Seeds",
        "id" : "ENCHANTED_SEEDS",
        "npc" : "480"
    },
    {
        "name": "Enchanted Sulphur Cube",
        "id" : "ENCHANTED_SULPHUR_CUBE",
        "npc" : "256000"
    },
    {
        "name": "Box of Seeds",
        "id" : "BOX_OF_SEEDS",
        "npc" : "76800"
    },
    {
        "name": "Enchanted Snow Block",
        "id" : "ENCHANTED_SNOW_BLOCK",
        "npc" : "600"
    },
    {
        "name": "Enchanted Red Mushroom Block",
        "id" : "ENCHANTED_HUGE_MUSHROOM_2",
        "npc" : "51200",
        "img": "ENCHANTED_RED_MUSHROOM_BLOCK"
    },
    {
        "name": "Enchanted Baked Potato",
        "id" : "ENCHANTED_BAKED_POTATO",
        "npc" : "76800"
    },
    {
        "name": "Enchanted Sugar",
        "id" : "ENCHANTED_SUGAR",
        "npc" : "640"
    },
    {
        "name": "Fermento",
        "id" : "FERMENTO",
        "npc" : "250000"
    },
    {
        "name": "Cropie",
        "id" : "CROPIE",
        "npc" : "25000"
    },
]

document.addEventListener("DOMContentLoaded", function () {
    var webptest = new Image(1,1);
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
            bbnsImage.src =  `static/imageswebp/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.webp`;
        } else {
            bbnsImage.src =  `static/images/${itemsarray[i].img ? itemsarray[i].img : itemsarray[i].id}.png`;
        }

        const bbnsText = document.createElement("div");
        bbnsText.id = `BbNs${i+1}Text`;
        bbnsText.className = "BbNsText";
        
        theBox.appendChild(bbnsImage)
        theBox.appendChild(bbnsText);
        document.getElementById("itemsContainer").appendChild(theBox);    
    }

    bazaarconnect();
});

async function bazaarconnect() {
    const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
    const data = await response.json();
    
    let itemProfits = [];

    for (let i = 0; i < itemsarray.length; i++) {
        let ableToSellCount = (200000000 / itemsarray[i].npc).toFixed(0);
        let buyPrice = data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] || 0;
        let profit = ableToSellCount * (itemsarray[i].npc - buyPrice);
        
        let element = document.querySelector(`#itemsContainer .bzbuynpcsellboxes:nth-child(${i + 1})`);
        itemProfits.push({ element, profit });

        document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(buyPrice.toFixed(0)) + " coins";
        document.getElementById(`BbNs${i + 1}Text`).innerHTML = `If you buy ${ableToSellCount} ${itemsarray[i].name} from the bazaar, and sell it to NPC, you will make ${format(profit.toFixed(0))} coins.`;
    }

    itemProfits.sort((a, b) => b.profit - a.profit);

    let container = document.getElementById("itemsContainer");
    itemProfits.forEach(item => container.appendChild(item.element));
}


function format(x) {
	return Number.parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}