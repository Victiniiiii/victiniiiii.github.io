let toggleStates;
let WebPSupport = 2;
let itemsarray = [
	{
		name: "Acacia Wood",
		id: "LOG:2",
        amount: "640",
        source: "Lumber Merchant",
        npc: "5",
        image: "Acacia_Wood"
	},
	{
		name: "Carrot",
		id: "CARROT_ITEM",
        amount: "640",
        source: "Farm Merchant",
        npc: "10",
        image: "Carrot"
	},
	{
		name: "Cocoa Beans",
		id: "INK_SACK:3",
        amount: "640",
        source: "Farm Merchant",
        npc: "5",
        image: "Cocoa_Beans"
	},
	{
		name: "Coal",
		id: "COAL",
        amount: "640",
        source: "Mine Merchant",
        npc: "4",
        image: "Coal"
	},
	{
		name: "Cobblestone",
		id: "COBBLESTONE",
        amount: "1280",
        source: "Mine Merchant, Builder",
        npc: "2.5", // mean of all sellers
        image: "Cobblestone"
	},
	{
		name: "End Stone",
		id: "ENDER_STONE",
        amount: "640",
        source: "Pearl Dealer",
        npc: "10",
        image: "End_Stone"
	},
	{
		name: "Experience Bottle",
		id: "EXP_BOTTLE",
        amount: "640",
        source: "Librarian",
        npc: "30",
        image: "Experience_Bottle"
	},
    {
        name: "Flint",
        id: "FLINT",
        amount: "640",
        source: "Pat",
        npc: "6",
        image: "Flint"
    },
    {
		name: "Grand Experience Bottle",
		id: "GRAND_EXP_BOTTLE",
        amount: "640",
        source: "Mage Emissary",
        npc: "5000",
        image: "Experience_Bottle"
	},
	{
		name: "Gunpowder",
		id: "SULPHUR",
        amount: "640",
        source: "Adventurer",
        npc: "10",
        image: "Gunpowder"
	},
	{
		name: "Ice",
		id: "ICE",
        amount: "640",
        source: "Merchant",
        npc: "1",
        image: "Ice"
	},
	{
		name: "Iron Ingot",
		id: "IRON_INGOT",
        amount: "1280",
        source: "Mine Merchant, Iron Forger",
        npc: "5.25", // mean of all sellers
        image: "Iron_Ingot"
	},
	{
		name: "Jungle Wood",
		id: "LOG:3",
        amount: "640",
        source: "Lumber Merchant",
        npc: "5",
        image: "Jungle_Wood"
	},
	{
		name: "Magma Cream",
		id: "MAGMA_CREAM",
        amount: "640",
        source: "Alchemist",
        npc: "20",
        image: "Magma_Cream"
	},
	{
		name: "Melon",
		id: "MELON",
        amount: "640",
        source: "Farm Merchant",
        npc: "4",
        image: "Melon"
	},
	{
		name: "Oak Wood",
		id: "LOG",
        amount: "640",
        source: "Lumber Merchant",
        npc: "5",
        image: "Oak_Wood"
	},
	{
		name: "Packed Ice",
		id: "PACKED_ICE",
        amount: "640",
        source: "Builder",
        npc: "9",
        image: "Packed_Ice"
	},
	{
		name: "Pufferfish",
		id: "RAW_FISH:3",
        amount: "640",
        source: "Fish Merchant",
        npc: "40",
        image: "Pufferfish"
	},
	{
		name: "Potato",
		id: "POTATO_ITEM",
        amount: "640",
        source: "Farm Merchant",
        npc: "10",
        image: "Potato"
	},
	{
		name: "Pumpkin",
		id: "PUMPKIN",
        amount: "640",
        source: "Farm Merchant",
        npc: "25",
        image: "Pumpkin"
	},
	{
		name: "Raw Fish",
		id: "RAW_FISH",
        amount: "640",
        source: "Fish Merchant",
        npc: "20",
        image: "Raw_Fish"
	},
	{
		name: "Sand",
		id: "SAND",
        amount: "1280",
        source: "Farm Merchant, Builder",
        npc: "3", // mean of all sellers
        image: "Sand"
	},
	{
		name: "Slimeball",
		id: "SLIME_BALL",
        amount: "640",
        source: "Adventurer",
        npc: "14",
        image: "Slimeball"
	},
	{
		name: "Spruce Wood",
		id: "LOG:1",
        amount: "640",
        source: "Lumber Merchant",
        npc: "5",
        image: "Spruce_Wood"
	},
	{
		name: "String",
		id: "STRING",
        amount: "640",
        source: "Adventurer",
        npc: "10",
        image: "String"
	},
	{
		name: "Sugar Cane",
		id: "SUGAR_CANE",
        amount: "640",
        source: "Farm Merchant",
        npc: "10",
        image: "Sugar_Cane"
	},
	{
		name: "Wheat",
		id: "WHEAT",
        amount: "640",
        source: "Farm Merchant",
        npc: "10",
        image: "Wheat"
	}
];

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
		toggleStates = Array(itemsarray.length).fill(true);
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
            img.src = `static/imageswebp/${item.image}.webp`;
        } else {
            img.src = `static/images/${item.image}.png`;
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

    const test = document.getElementById("NbBsSpace");

    for (let i = 0; i < itemsarray.length; i++) {
        const testtest = document.createElement("div");
        testtest.className = "NbBsBox";
        testtest.id = `NbBsBox${i}`

        const test1 = document.createElement("img");
        if (WebPSupport == 1) {
            test1.src = `static/imageswebp/${itemsarray[i].image}.webp`
        } else {
            test1.src = `static/images/${itemsarray[i].image}.png`
        }
        
        const both = document.createElement("div");

        test.appendChild(both)
        both.appendChild(test1);
        both.appendChild(testtest);    
    }
	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	for (let i = 0; i < itemsarray.length; i++) {
		document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
        document.getElementById(`NbBsBox${i}`).innerHTML = itemsarray[i].name + "<br>";
        document.getElementById(`NbBsBox${i}`).innerHTML += "Profit: ";
        document.getElementById(`NbBsBox${i}`).innerHTML += format((itemsarray[i].amount * (data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] - itemsarray[i].npc)).toFixed(0)) + " coins<br>"
        if (itemsarray[i].amount * (data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] - itemsarray[i].npc) > 100000) {
            document.getElementById(`NbBsBox${i}`).style.backgroundColor = "#0f6319"
        } else if (itemsarray[i].amount * (data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] - itemsarray[i].npc) > 10000){
            document.getElementById(`NbBsBox${i}`).style.backgroundColor = "#81cc8a"
        } else if (itemsarray[i].amount * (data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"] - itemsarray[i].npc) > 0){
            document.getElementById(`NbBsBox${i}`).style.backgroundColor = "#d5db23"
        } else {
            document.getElementById(`NbBsBox${i}`).style.backgroundColor = "#db2323"
        }
        document.getElementById(`NbBsBox${i}`).innerHTML += `Source: ${itemsarray[i].source}`;
	}
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}