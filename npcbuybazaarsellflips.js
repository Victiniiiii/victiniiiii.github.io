let toggleStates;
let itemsarray = [
	{
		name: "Enchanted Quartz",
		id: "ENCHANTED_QUARTZ",
	},
	{
		name: "Packed Ice",
		id: "PACKED_ICE",
	},
	{
		name: "Sand",
		id: "SAND",
	},
	{
		name: "Experience Bottle",
		id: "EXP_BOTTLE",
	},
	{
		name: "Flint",
		id: "FLINT",
	},
	{
		name: "Iron Ingot",
		id: "IRON_INGOT",
	},
	{
		name: "Slimeball",
		id: "SLIME_BALL",
	},
	{
		name: "Oak Wood",
		id: "LOG",
	},
	{
		name: "Raw Fish",
		id: "RAW_FISH",
	},
	{
		name: "Jungle Wood",
		id: "LOG:3",
	},
	{
		name: "Gunpowder",
		id: "SULPHUR",
	},
	{
		name: "Pufferfish",
		id: "RAW_FISH:3",
	},
	{
		name: "Ice",
		id: "ICE",
	},
	{
		name: "String",
		id: "STRING",
	},
	{
		name: "Acacia Wood",
		id: "LOG:2",
	},
	{
		name: "Magma Cream",
		id: "MAGMA_CREAM",
	},
	{
		name: "Coal",
		id: "COAL",
	},
	{
		name: "End Stone",
		id: "ENDER_STONE",
	},
	{
		name: "Spruce Wood",
		id: "LOG:1",
	},
	{
		name: "Cobblestone",
		id: "COBBLESTONE",
	},
	{
		name: "Wheat",
		id: "WHEAT",
	},
	{
		name: "Sugar Cane",
		id: "SUGAR_CANE",
	},
	{
		name: "Carrot",
		id: "CARROT_ITEM",
	},
	{
		name: "Pumpkin",
		id: "PUMPKIN",
	},
	{
		name: "Potato",
		id: "POTATO_ITEM",
	},
	{
		name: "Melon",
		id: "MELON",
	},
	{
		name: "Cocoa Beans",
		id: "INK_SACK:3",
	},
];

document.addEventListener("DOMContentLoaded", function () {
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
		imagePlaceholder.className = "image-placeholder";

		const picture = document.createElement("picture");
		const source = document.createElement("source");
		source.srcset = `static/imageswebp/${item.id}.webp`;
		source.type = "image/webp";

		const img = document.createElement("img");
		img.src = `static/images/${item.id}.png`;

		picture.appendChild(source);
		picture.appendChild(img);
		imagePlaceholder.appendChild(picture);

		const instasellLabel = document.createElement("span");
		instasellLabel.className = "toggle-label";
		instasellLabel.textContent = "Instasell";

		const toggleSwitch = document.createElement("div");
		toggleSwitch.className = "toggle-switch";
		toggleSwitch.dataset.id = item.id;

		const sellOrderLabel = document.createElement("span");
		sellOrderLabel.className = "toggle-label";
		sellOrderLabel.textContent = "Sell Order";

		groupDiv.appendChild(imagePlaceholder);
		groupDiv.appendChild(instasellLabel);
		groupDiv.appendChild(toggleSwitch);
		groupDiv.appendChild(sellOrderLabel);

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

	bazaarconnect();
});

async function bazaarconnect() {
	const response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
	const data = await response.json();

	for (let i = 0; i < itemsarray.length; i++) {
		document.getElementById(`prices${itemsarray[i].id}`).innerHTML = format(data.products[itemsarray[i].id]?.quick_status[toggleStates[i] ? "buyPrice" : "sellPrice"].toFixed(0)) + " coins";
	}
}

function format(x) {
	return Number.parseFloat(x)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function test() {
    const test = document.getElementById("test");
    for (let i = 0; i < itemsarray.length; i++) {
        const testtest = document.createElement("div");
		testtest.className = "NbBsBox";
        test.appendChild(testtest);
        // 1- NAME
        // 2- Total profit by selling
        // 3- Acquiring place
        // MINI FOTO
        // eğer profit x değerin üstündeyse style: green değilse red
    }
}