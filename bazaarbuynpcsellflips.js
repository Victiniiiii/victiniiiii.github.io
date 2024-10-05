let toggleStates;
let itemsarray = [
    {
        "name": "Enchanted Melon Block",
        "id" : "ENCHANTED_MELON_BLOCK",
        "img" : "Enchanted_Melon_Block",
        "npc" : "51200"
    },
    {
        "name": "Fine Ruby Gemstone",
        "id" : "FINE_RUBY_GEM",
        "img" : "Fine_Ruby_Gemstone",
        "npc" : "19200"
    },
    {
        "name": "Enchanted Sulphur",
        "id" : "ENCHANTED_SULPHUR",
        "img" : "Enchanted_Sulphur",
        "npc" : "1600"
    },
    {
        "name": "Enchanted Gold",
        "id" : "ENCHANTED_GOLD",
        "img" : "Enchanted_Gold",
        "npc" : "480"
    }
]

document.addEventListener("DOMContentLoaded", function () {
    var webptest = new Image(1,1);
    webptest.src = "/static/imageswebp/webpdot.webp";
    if (webptest.width > 0 && webptest.height > 0) {
        WebPSupport = 1;
    } else {
        WebPSupport = 0;
    }

	const savedToggleStates = localStorage.getItem("toggleStates");
	if (savedToggleStates) {
		toggleStates = JSON.parse(savedToggleStates);
	} else {
        toggleStates = Array(3).fill(false);
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
            img.src = `static/imageswebp/${item.img}.webp`;
        } else {
            img.src = `static/images/${item.img}.png`;
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
            localStorage.setItem("toggleStates", JSON.stringify(toggleStates));
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
            bbnsImage.src = `static/imageswebp/${itemsarray[i].img}.webp`
        } else {
            bbnsImage.src = `static/images/${itemsarray[i].img}.png`
        }

        const bbnsText = document.createElement("div");
        bbnsText.id = `BbNs${i+1}Text`;
        bbnsText.className = "BbNsText";
        
        theBox.appendChild(bbnsImage)
        theBox.appendChild(bbnsText);
        document.body.appendChild(theBox);    
    }

    bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

    for (i = 0; i < itemsarray.length; i++) {
        let ableToSellCount = (200000000 / itemsarray[i].npc).toFixed(0);
        document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
        document.getElementById(`BbNs${i+1}Text`).innerHTML = `If you buy ${ableToSellCount} ${itemsarray[i].name} from the bazaar, and sell it to NPC, you will make ${format(ableToSellCount * (itemsarray[i].npc - data.products[`${itemsarray[i].id}`]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"]).toFixed(0))} coins.`
    }
}

function format(x) {
	return Number.parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}