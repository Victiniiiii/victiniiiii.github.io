// inferno.js

// TODO: 

// font'larda max(width,height) kullan
// mobil css


function saveToggleStates() {
    localStorage.setItem('toggleStates', JSON.stringify(toggleStates));
}

function loadToggleStates() {
    const savedToggleStates = localStorage.getItem('toggleStates');
    if (savedToggleStates) {
        toggleStates = JSON.parse(savedToggleStates);
    }
}

document.getElementById('settings-bar').addEventListener('click', function() {
    document.getElementById('settings').classList.toggle('expanded');
});

let toggleStates = Array(39).fill(false);
toggleStates[6] = true;
toggleStates.fill(true, 14, 24);

window.addEventListener('DOMContentLoaded', function() {
    loadToggleStates();
    updateToggleSwitches();
    everyitemtoggling();
});

function updateToggleSwitches() {
    document.querySelectorAll('.toggle-switch').forEach(function(toggleSwitch, index) {
        if (toggleStates[index]) {
            toggleSwitch.classList.add('active');
        } else {
            toggleSwitch.classList.remove('active');
        }
    });
}

document.querySelectorAll('.toggle-switch').forEach(function(toggleSwitch, index) {
    toggleSwitch.addEventListener('click', function() {
        toggleSwitch.classList.toggle('active');
        toggleStates[index] = !toggleStates[index];
        saveToggleStates(); 
        everyitemtoggling();
        bazaarconnect();
    });
});

const htmlinfernoresulttext = document.getElementById("infernoprofitresults");
htmlinfernoresulttext.innerHTML = "Press the calculate button at the top right to start.";

function format(x) {
    return Number.parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var everyitem = [];
var items = [];

async function fetchBazaarData() {
    const response = await fetch('https://api.hypixel.net/v2/skyblock/bazaar');
    return await response.json();
}

async function everyitemtoggling() {
    const data = await fetchBazaarData();

    /*
    0. Enchanted Coal
    1. Enchanted Sulphur
    2. Chili Pepper
    3. Eyedrops
    4. Crude Gabagool
    5. CHANGED TO: Derelict Ashe
    6. Hypergolic Gabagool
    7. Ceramics
    8. Gabagool Distillate
    9. Blaze Rod Distillate
    10. Glowstone Distillate
    11. Magma Cream Distillate
    12. Nether Wart Distillate
    13. Inferno Fuel Block
    14. Entropy Surpressor
    15. Jalapeno Book
    16. Sulphuric Coal
    17. Habanero Tactics 4
    18. Stuffed Chili Pepper
    19. Cayenne 4
    20. Vertex
    21. Apex
    22. Reaper Pepper
    23. Reheated Gummy
    24. Enchanted Snow Block
    25. Enchanted Slimeball
    26. Kelvin Inventer
    27. Enchanted Paper
    28. Wood Singularity
    29. Enchanted Iron Block
    30. Enchanted Brown Mushroom Block
    31. Enchanted Rabbit Hide
    32. Volta
    33. Blaze Rod
    34. Glowstone
    35. Magma Cream
    36. Nether Wart
    37. Power Crystal
    38. Scorched Power Crystal
    39. Molten Powder
    */

    everyitem = [
        format(data.products[`ENCHANTED_COAL`]?.quick_status[toggleStates[0] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_SULPHUR`]?.quick_status[toggleStates[1] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`CHILI_PEPPER`]?.quick_status[toggleStates[2] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`CAPSAICIN_EYEDROPS_NO_CHARGES`]?.quick_status[toggleStates[3] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`CRUDE_GABAGOOL`]?.quick_status[toggleStates[4] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`DERELICT_ASHE`]?.quick_status[toggleStates[5] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`HYPERGOLIC_GABAGOOL`]?.quick_status[toggleStates[6] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`HYPERGOLIC_IONIZED_CERAMICS`]?.quick_status[toggleStates[7] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`CRUDE_GABAGOOL_DISTILLATE`]?.quick_status[toggleStates[8] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`BLAZE_ROD_DISTILLATE`]?.quick_status[toggleStates[9] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`GLOWSTONE_DUST_DISTILLATE`]?.quick_status[toggleStates[10] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`MAGMA_CREAM_DISTILLATE`]?.quick_status[toggleStates[11] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`NETHER_STALK_DISTILLATE`]?.quick_status[toggleStates[12] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`INFERNO_FUEL_BLOCK`]?.quick_status[toggleStates[13] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENTROPY_SUPPRESSOR`]?.quick_status[toggleStates[14] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`JALAPENO_BOOK`]?.quick_status[toggleStates[15] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`SULPHURIC_COAL`]?.quick_status[toggleStates[16] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_4`]?.quick_status[toggleStates[17] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`STUFFED_CHILI_PEPPER`]?.quick_status[toggleStates[18] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTMENT_CAYENNE_4`]?.quick_status[toggleStates[19] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`INFERNO_VERTEX`]?.quick_status[toggleStates[20] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`INFERNO_APEX`]?.quick_status[toggleStates[21] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`REAPER_PEPPER`]?.quick_status[toggleStates[22] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`REHEATED_GUMMY_POLAR_BEAR`]?.quick_status[toggleStates[23] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_SNOW_BLOCK`]?.quick_status[toggleStates[24] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_SLIME_BALL`]?.quick_status[toggleStates[25] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`KELVIN_INVERTER`]?.quick_status[toggleStates[26] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_PAPER`]?.quick_status[toggleStates[27] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`WOOD_SINGULARITY`]?.quick_status[toggleStates[28] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_IRON_BLOCK`]?.quick_status[toggleStates[29] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status[toggleStates[30] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`ENCHANTED_RABBIT_HIDE`]?.quick_status[toggleStates[31] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`VOLTA`]?.quick_status[toggleStates[32] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`BLAZE_ROD`]?.quick_status[toggleStates[33] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`GLOWSTONE_DUST`]?.quick_status[toggleStates[34] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`MAGMA_CREAM`]?.quick_status[toggleStates[35] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`NETHER_STALK`]?.quick_status[toggleStates[36] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`POWER_CRYSTAL`]?.quick_status[toggleStates[37] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`SCORCHED_POWER_CRYSTAL`]?.quick_status[toggleStates[38] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        format(data.products[`MOLTEN_POWDER`]?.quick_status[toggleStates[39] ? 'buyPrice' : 'sellPrice'].toFixed(0)),   
    ];

    for (let i = 1; i <= 40; i++) {
        items[i] = everyitem[i]
        let divId = 'prices' + i;
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `${everyitem[i-1]} coins`;
        }
    }
}


async function bazaarconnect() {
    const data = await fetchBazaarData();

    everyitem = [
        (data.products[`ENCHANTED_COAL`]?.quick_status[toggleStates[0] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SULPHUR`]?.quick_status[toggleStates[1] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CHILI_PEPPER`]?.quick_status[toggleStates[2] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CAPSAICIN_EYEDROPS_NO_CHARGES`]?.quick_status[toggleStates[3] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL`]?.quick_status[toggleStates[4] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`DERELICT_ASHE`]?.quick_status[toggleStates[5] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_GABAGOOL`]?.quick_status[toggleStates[6] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_IONIZED_CERAMICS`]?.quick_status[toggleStates[7] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL_DISTILLATE`]?.quick_status[toggleStates[8] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD_DISTILLATE`]?.quick_status[toggleStates[9] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST_DISTILLATE`]?.quick_status[toggleStates[10] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM_DISTILLATE`]?.quick_status[toggleStates[11] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK_DISTILLATE`]?.quick_status[toggleStates[12] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_FUEL_BLOCK`]?.quick_status[toggleStates[13] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENTROPY_SUPPRESSOR`]?.quick_status[toggleStates[14] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`JALAPENO_BOOK`]?.quick_status[toggleStates[15] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SULPHURIC_COAL`]?.quick_status[toggleStates[16] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_4`]?.quick_status[toggleStates[17] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`STUFFED_CHILI_PEPPER`]?.quick_status[toggleStates[18] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_CAYENNE_4`]?.quick_status[toggleStates[19] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_VERTEX`]?.quick_status[toggleStates[20] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_APEX`]?.quick_status[toggleStates[21] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REAPER_PEPPER`]?.quick_status[toggleStates[22] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REHEATED_GUMMY_POLAR_BEAR`]?.quick_status[toggleStates[23] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SNOW_BLOCK`]?.quick_status[toggleStates[24] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SLIME_BALL`]?.quick_status[toggleStates[25] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`KELVIN_INVERTER`]?.quick_status[toggleStates[26] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_PAPER`]?.quick_status[toggleStates[27] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`WOOD_SINGULARITY`]?.quick_status[toggleStates[28] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_IRON_BLOCK`]?.quick_status[toggleStates[29] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status[toggleStates[30] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_RABBIT_HIDE`]?.quick_status[toggleStates[31] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`VOLTA`]?.quick_status[toggleStates[32] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD`]?.quick_status[toggleStates[33] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST`]?.quick_status[toggleStates[34] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM`]?.quick_status[toggleStates[35] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK`]?.quick_status[toggleStates[36] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`POWER_CRYSTAL`]?.quick_status[toggleStates[37] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SCORCHED_POWER_CRYSTAL`]?.quick_status[toggleStates[38] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MOLTEN_POWDER`]?.quick_status[toggleStates[39] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
    ];

    const enchantedcoalprice = everyitem[0];
    const enchantedsulphurprice = everyitem[1];
    var chilipepperprice = everyitem[2];
    const crudegabagoolprice = everyitem[4];
    var hypergolicgabagoolprice = everyitem[6];
    var entropysurpressorprice = everyitem[14];
    var jalapenobookprice = everyitem[15];
    var sulphuriccoalprice = everyitem[16];
    var habanerotactics4price = everyitem[17];
    var stuffedchilipepperprice = everyitem[18];
    var cayenne4price = everyitem[19];
    var gummyprice = everyitem[23];
    const enchantedsnowprice = everyitem[24];
    const enchantedslimeballprice = everyitem[25];
    var kelvininventerprice = everyitem[26];
    var enchantedpaperprice = everyitem[27];
    var woodsingularityprice = everyitem[28];
    var enchantedironblockprice = everyitem[29];
    var enchantedbrownmushroomblockprice = everyitem[30];
    var enchantedrabbithideprice = everyitem[31];
    var voltaprice = everyitem[32];
    
    hypergoliccraftprice = 75.25 * parseFloat(enchantedsulphurprice) + 6912 * parseFloat(crudegabagoolprice) + 1204 * parseFloat(enchantedcoalprice); 
    hypergoliccraftprice = Math.round(hypergoliccraftprice).toLocaleString();
    hypergolicgabagoolprice = Math.round(hypergolicgabagoolprice).toLocaleString();
    hypergolicgabagoolcraft.innerHTML = `Crafting Hypergolic Gabagool costs ${hypergoliccraftprice} and buying it will cost ${hypergolicgabagoolprice} coins.`;

    var sulphuriccoalnopeppers = (parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice)) / 4;
    var sulphuriccoalwithpeppers = ((parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice) + parseFloat(chilipepperprice) * 4) / 12);
    sulphuriccoalprice = Math.round(sulphuriccoalprice).toLocaleString();
    sulphuriccoalnopeppers = Math.round(sulphuriccoalnopeppers).toLocaleString();
    sulphuriccoalwithpeppers = Math.round(sulphuriccoalwithpeppers).toLocaleString();
    sulphuriccoalcraft.innerHTML = `Crafting Sulphuric Coal with no peppers costs ${sulphuriccoalnopeppers} coins, with peppers it costs ${sulphuriccoalwithpeppers} coins, and buying it will cost ${sulphuriccoalprice} coins.`;  

    var gummycraft = parseFloat(enchantedsnowprice) * 4 + parseFloat(enchantedslimeballprice) * 4 + parseFloat(chilipepperprice) * 4;
    gummycraft = Math.round(gummycraft).toLocaleString();
    gummyprice = Math.round(gummyprice).toLocaleString();
    gummybearcraft.innerHTML = `Crafting Re-heated Gummy Polar Bear costs ${gummycraft} coins and buying it costs ${gummyprice} coins.`;

    var entropycraft2 = parseFloat(crudegabagoolprice) * 9216 + parseFloat(enchantedsulphurprice) * 132 + parseFloat(enchantedcoalprice) * 2112 + parseFloat(chilipepperprice) * 32 + parseFloat(kelvininventerprice) * 4;
    entropycraft2 = Math.round(entropycraft2).toLocaleString();
    entropysurpressorprice = Math.round(entropysurpressorprice).toLocaleString();
    entropycraft.innerHTML = `Crafting Entropy Suppressor costs ${entropycraft2} coins and buying it costs ${entropysurpressorprice} coins.`;

    jalapenorecipe = parseFloat(chilipepperprice) * 160 + parseFloat(enchantedpaperprice) * 3 ;
    jalapenorecipe = Math.round(jalapenorecipe).toLocaleString();
    jalapenobookprice = Math.round(jalapenobookprice).toLocaleString();
    jalapenocraft.innerHTML = `Crafting Jalapeno Book costs ${jalapenorecipe} coins and buying it costs ${jalapenobookprice} coins.`;

    cayennerecipe = parseFloat(chilipepperprice) * 32 + parseFloat(enchantedironblockprice) * 4 + parseFloat(woodsingularityprice);
    cayenne4price = Math.round(cayenne4price).toLocaleString();
    cayennerecipe = Math.round(cayennerecipe).toLocaleString();
    cayennecraft.innerHTML = `Crafting Cayenne IV Book costs ${cayennerecipe} coins and buying it costs ${cayenne4price} coins.`;

    habanerorecipe = parseFloat(stuffedchilipepperprice) * 32 + parseFloat(enchantedbrownmushroomblockprice) * 16 + parseFloat(enchantedrabbithideprice) * 16 + parseFloat(voltaprice) * 8 ;
    habanerorecipe = Math.round(habanerorecipe).toLocaleString();
    habanerotactics4price = Math.round(habanerotactics4price).toLocaleString();
    habanerocraft.innerHTML = `Crafting Habanero Tactics IV Book costs ${habanerorecipe} coins and buying it costs ${habanerotactics4price} coins.`;

    stuffedrecipe = parseFloat(chilipepperprice) * 160;
    stuffedrecipe = Math.round(stuffedrecipe).toLocaleString();
    stuffedchilipepperprice = Math.round(stuffedchilipepperprice).toLocaleString();
    stuffedchilicraft.innerHTML = `Crafting Stuffed Chili Pepper costs ${stuffedrecipe} coins and buying it costs ${stuffedchilipepperprice} coins.`;
}

async function minionprofits() {
    const data = await fetchBazaarData();

    everyitem = [
        (data.products[`ENCHANTED_COAL`]?.quick_status[toggleStates[0] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SULPHUR`]?.quick_status[toggleStates[1] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CHILI_PEPPER`]?.quick_status[toggleStates[2] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CAPSAICIN_EYEDROPS_NO_CHARGES`]?.quick_status[toggleStates[3] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL`]?.quick_status[toggleStates[4] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`DERELICT_ASHE`]?.quick_status[toggleStates[5] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_GABAGOOL`]?.quick_status[toggleStates[6] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_IONIZED_CERAMICS`]?.quick_status[toggleStates[7] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL_DISTILLATE`]?.quick_status[toggleStates[8] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD_DISTILLATE`]?.quick_status[toggleStates[9] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST_DISTILLATE`]?.quick_status[toggleStates[10] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM_DISTILLATE`]?.quick_status[toggleStates[11] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK_DISTILLATE`]?.quick_status[toggleStates[12] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_FUEL_BLOCK`]?.quick_status[toggleStates[13] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENTROPY_SUPPRESSOR`]?.quick_status[toggleStates[14] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`JALAPENO_BOOK`]?.quick_status[toggleStates[15] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SULPHURIC_COAL`]?.quick_status[toggleStates[16] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_4`]?.quick_status[toggleStates[17] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`STUFFED_CHILI_PEPPER`]?.quick_status[toggleStates[18] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_CAYENNE_4`]?.quick_status[toggleStates[19] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_VERTEX`]?.quick_status[toggleStates[20] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_APEX`]?.quick_status[toggleStates[21] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REAPER_PEPPER`]?.quick_status[toggleStates[22] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REHEATED_GUMMY_POLAR_BEAR`]?.quick_status[toggleStates[23] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SNOW_BLOCK`]?.quick_status[toggleStates[24] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SLIME_BALL`]?.quick_status[toggleStates[25] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`KELVIN_INVERTER`]?.quick_status[toggleStates[26] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_PAPER`]?.quick_status[toggleStates[27] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`WOOD_SINGULARITY`]?.quick_status[toggleStates[28] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_IRON_BLOCK`]?.quick_status[toggleStates[29] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status[toggleStates[30] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_RABBIT_HIDE`]?.quick_status[toggleStates[31] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`VOLTA`]?.quick_status[toggleStates[32] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD`]?.quick_status[toggleStates[33] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST`]?.quick_status[toggleStates[34] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM`]?.quick_status[toggleStates[35] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK`]?.quick_status[toggleStates[36] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`POWER_CRYSTAL`]?.quick_status[toggleStates[37] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SCORCHED_POWER_CRYSTAL`]?.quick_status[toggleStates[38] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MOLTEN_POWDER`]?.quick_status[toggleStates[39] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
    ];

    const enchantedcoalprice = everyitem[0]
    const enchantedsulphurprice = everyitem[1]
    const chilipepperprice = everyitem[2]
    const eyedropbuy = everyitem[3]
    const crudegabagoolprice = everyitem[4]
    const hypergolicgabagoolprice = everyitem[6]
    const gabagooldistillateprice = everyitem[8]
    const blazeroddistillateprice = everyitem[9]
    const glowstonedistillateprice = everyitem[10]
    const magmacreamdistillateprice = everyitem[11]
    const netherwartdistillateprice = everyitem[12]
    const infernofuelblockprice = everyitem[13]
    const vertexprice = everyitem[20]
    const apexprice = everyitem[21]
    const reaperprice = everyitem[22]
    const blazerodprice = everyitem[33]
    const glowstonedustprice = everyitem[34]
    const magmacreamprice = everyitem[35]
    const netherwartprice = everyitem[36]
    const powercrystalprice = everyitem[37]
    const scorchedprice = everyitem[38]

    const sulphuriccoalnopeppers = ((parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice)) / 4).toFixed(0);
    const sulphuriccoalwithpeppers = ((parseFloat(enchantedcoalprice) * 16 + parseFloat(enchantedsulphurprice) + parseFloat(chilipepperprice) * 4) / 12).toFixed(0);
    let bestsulphuriccoal = [sulphuriccoalnopeppers > sulphuriccoalwithpeppers ? sulphuriccoalwithpeppers : sulphuriccoalnopeppers];
    let bestfuelgabagool = (parseFloat(crudegabagoolprice) * 24 + parseFloat(bestsulphuriccoal)).toFixed(0);

    let extraspeeds = 0;

    var htmlminioncount = document.getElementById('minioncount').value;
    if (htmlminioncount < 1 || htmlminioncount > 31) {
        htmlinfernoresulttext.innerHTML = "You must enter a minion count value between 1 and 31.";
    } else if (htmlminioncount > 0 && htmlminioncount < 11) {extraspeeds += htmlminioncount * 18}
    else if (htmlminioncount > 10 && htmlminioncount < 33) {extraspeeds += 180}
    else {console.log("Minion count error.")}

    var htmlminiontier = document.getElementById('miniontier').value;
    var apexCount = 0;
    var minionwaitingtime = 0;
    if (htmlminiontier == "t1") {minionwaitingtime = 1013; apexCount = 1;}
    else if (htmlminiontier == "t2") {minionwaitingtime = 982; apexCount = 1;}
    else if (htmlminiontier == "t3") {minionwaitingtime = 950; apexCount = 1;}
    else if (htmlminiontier == "t4") {minionwaitingtime = 919; apexCount = 1;}
    else if (htmlminiontier == "t5") {minionwaitingtime = 886; apexCount = 1;}
    else if (htmlminiontier == "t6") {minionwaitingtime = 855; apexCount = 1;}
    else if (htmlminiontier == "t7") {minionwaitingtime = 823; apexCount = 1;}
    else if (htmlminiontier == "t8") {minionwaitingtime = 792; apexCount = 1;}
    else if (htmlminiontier == "t9") {minionwaitingtime = 760; apexCount = 1;}
    else if (htmlminiontier == "t10") {minionwaitingtime = 728; apexCount = 2;}
    else if (htmlminiontier == "t11") {minionwaitingtime = 697; apexCount = 2;}

    var htmlfueltype = document.getElementById("fueltype").value;
    var fuelmultiplier = 1;
    var specialproduction = 0; 
    var specialfueloutput = 0;
    var checkifitst3 = 0;
    var expenses = 0;
    let chosenfuel;
    let specialfuelitem;
    if (htmlfueltype == "nothing") {fuelmultiplier = 1; checkifitst3 = 0;}
    else if (htmlfueltype == "t1-gabagool") {fuelmultiplier = 11; checkifitst3 = 0; specialfuelitem = 1; specialfueloutput+= parseFloat(crudegabagoolprice); specialproduction += 0.8; chosenfuel = "Crude Gabagool";
        expenses += htmlminioncount * ( 6 * parseFloat(gabagooldistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t1-blazerod") {fuelmultiplier = 11; checkifitst3 = 0; specialfuelitem = 1; specialfueloutput+= parseFloat(blazerodprice); specialproduction += 0.8; chosenfuel = "Blaze Rod";
        expenses += htmlminioncount * ( 6 * parseFloat(blazeroddistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t1-glowstone") {fuelmultiplier = 11; checkifitst3 = 0; specialfuelitem = 2.5; specialfueloutput+= parseFloat(glowstonedustprice*2.5); specialproduction += 0.8; chosenfuel = "Glowstone Dust";
        expenses += htmlminioncount * ( 6 * parseFloat(glowstonedistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t1-magmacream") {fuelmultiplier = 11; checkifitst3 = 0; specialfuelitem = 2; specialfueloutput+= parseFloat(magmacreamprice*2); specialproduction += 0.8; chosenfuel = "Magma Cream";
        expenses += htmlminioncount * ( 6 * parseFloat(magmacreamdistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t1-netherwart") {fuelmultiplier = 11; checkifitst3 = 0; specialfuelitem = 5; specialfueloutput+= parseFloat(netherwartprice*5); specialproduction += 0.8; chosenfuel = "Nether Wart";
        expenses += htmlminioncount * ( 6 * parseFloat(netherwartdistillateprice) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t2-gabagool") {fuelmultiplier = 16; checkifitst3 = 0; specialfuelitem = 1; specialfueloutput+= parseFloat(crudegabagoolprice); specialproduction += 0.8; chosenfuel = "Crude Gabagool";
        expenses += htmlminioncount * ( 6 * parseFloat(gabagooldistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool)+ 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t2-blazerod") {fuelmultiplier = 16; checkifitst3 = 0; specialfuelitem = 1; specialfueloutput+= parseFloat(blazerodprice); specialproduction += 0.8; chosenfuel = "Blaze Rod";
        expenses += htmlminioncount * ( 6 * parseFloat(blazeroddistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t2-glowstone") {fuelmultiplier = 16; checkifitst3 = 0; specialfuelitem = 2.5; specialfueloutput+= parseFloat(glowstonedustprice*2.5); specialproduction += 0.8; chosenfuel = "Glowstone Dust";
        expenses += htmlminioncount * ( 6 * parseFloat(glowstonedistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t2-magmacream") {fuelmultiplier = 16; checkifitst3 = 0; specialfuelitem = 2; specialfueloutput+= parseFloat(magmacreamprice*2); specialproduction += 0.8; chosenfuel = "Magma Cream";
        expenses += htmlminioncount * ( 6 * parseFloat(magmacreamdistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t2-netherwart") {fuelmultiplier = 16; checkifitst3 = 0; specialfuelitem = 5; specialfueloutput+= nparseFloat(etherwartprice*5); specialproduction += 0.8; chosenfuel = "Nether Wart";
        expenses += htmlminioncount * ( 6 * parseFloat(netherwartdistillateprice) + parseFloat(bestsulphuriccoal) + 24 * parseFloat(bestfuelgabagool) + parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t3-gabagool") {fuelmultiplier = 21; checkifitst3 = 1; specialfuelitem = 1; specialfueloutput+= parseFloat(crudegabagoolprice); specialproduction += 0.8; chosenfuel = "Crude Gabagool";
        expenses += htmlminioncount * ( 6 * parseFloat(gabagooldistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t3-blazerod") {fuelmultiplier = 21; checkifitst3 = 1; specialfuelitem = 1; specialfueloutput+= parseFloat(blazerodprice); specialproduction += 0.8; chosenfuel = "Blaze Rod";
        expenses += htmlminioncount * ( 6 * parseFloat(blazeroddistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t3-glowstone") {fuelmultiplier = 21; checkifitst3 = 1; specialfuelitem = 2.5; specialfueloutput+= parseFloat(glowstonedustprice*2.5); specialproduction += 0.8; chosenfuel = "Glowstone Dust";
        expenses += htmlminioncount * ( 6 * parseFloat(glowstonedistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t3-magmacream") {fuelmultiplier = 21; checkifitst3 = 1; specialfuelitem = 2; specialfueloutput+= parseFloat(magmacreamprice*2); specialproduction += 0.8; chosenfuel = "Magma Cream";
        expenses += htmlminioncount * ( 6 * parseFloat(magmacreamdistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}
    else if (htmlfueltype == "t3-netherwart") {fuelmultiplier = 21; checkifitst3 = 1; specialfuelitem = 5; specialfueloutput+= parseFloat(netherwartprice*5); specialproduction += 0.8; chosenfuel = "Nether Wart";
        expenses += htmlminioncount * ( 6 * parseFloat(netherwartdistillateprice) + 25 * parseFloat(bestsulphuriccoal) + 288 * parseFloat(bestfuelgabagool) + 2 * parseFloat(infernofuelblockprice));}

    var htmleyedrop = document.getElementById("eyedrops").value;
    if (checkifitst3 == 1 && htmleyedrop == "yes") { checkifitst3 += 0.3; expenses += parseFloat(eyedropbuy)}

    var htmlbeacontier = document.getElementById("beaconlevel").value;
    if (htmlbeacontier == "1") {extraspeeds += 2; expenses += parseFloat(powercrystalprice)/2;}
    else if (htmlbeacontier == "1s") {extraspeeds += 3; expenses += parseFloat(scorchedprice)/2}
    else if (htmlbeacontier == "2") {extraspeeds += 4; expenses += parseFloat(powercrystalprice)/2}
    else if (htmlbeacontier == "2s") {extraspeeds += 5; expenses += parseFloat(scorchedprice)/2}
    else if (htmlbeacontier == "3") {extraspeeds += 6; expenses += parseFloat(powercrystalprice)/2}
    else if (htmlbeacontier == "3s") {extraspeeds += 7; expenses += parseFloat(scorchedprice)/2}
    else if (htmlbeacontier == "4") {extraspeeds += 8; expenses += parseFloat(powercrystalprice)/2}
    else if (htmlbeacontier == "4s") {extraspeeds += 9; expenses += parseFloat(scorchedprice)/2}
    else if (htmlbeacontier == "5") {extraspeeds += 10; expenses += parseFloat(powercrystalprice)/2}    
    else if (htmlbeacontier == "5s") {extraspeeds += 11; expenses += parseFloat(scorchedprice)/2}

    var htmlinfusion = document.getElementById("infusion").value;
    if (htmlinfusion == "yes") {extraspeeds += 10}
    else {extraspeeds += 0}

    var htmlupgrades1 = document.getElementById("upgrades1").value;
    var htmlupgrades2 = document.getElementById("upgrades2").value;
    if (htmlupgrades1 == "super-compactor-3000" || htmlupgrades2 == "super-compactor-3000") {
        compactor = true;
    } else {compactor = false}
    if (htmlupgrades1 == "minion-expander") {extraspeeds += 5}
    if (htmlupgrades2 == "minion-expander") {extraspeeds += 5}
    if (htmlupgrades1 == "flycatcher") {extraspeeds += 20}
    if (htmlupgrades2 == "flycatcher") {extraspeeds += 20}      
    
    let miniondailyprofit;
    let dailytotalminionactions = 86400 / 2 / (( minionwaitingtime / fuelmultiplier ) / ((100+extraspeeds)/100)); // this many actions per day
    miniondailyprofit = htmlminioncount * dailytotalminionactions  * ((1-specialproduction) * parseFloat(crudegabagoolprice) + (specialproduction)*(specialfueloutput)) +
    checkifitst3/136*htmlminioncount*dailytotalminionactions*parseFloat(chilipepperprice) +
    checkifitst3/5950*htmlminioncount*dailytotalminionactions*parseFloat(vertexprice) +
    checkifitst3/1309091*apexCount*htmlminioncount*dailytotalminionactions*parseFloat(apexprice) +
    checkifitst3/458182*htmlminioncount*dailytotalminionactions*parseFloat(reaperprice);    

    possiblehypergoliccraftingamount = dailytotalminionactions * htmlminioncount / 6912;
    profitfromcraftinghypergolicper = parseFloat(hypergolicgabagoolprice) - 75.25 * parseFloat(enchantedsulphurprice) - 6912 * parseFloat(crudegabagoolprice) - 1204 * parseFloat(enchantedcoalprice); 
    profitfromcraftinghypergolic = possiblehypergoliccraftingamount * profitfromcraftinghypergolicper
    var coinsleft = miniondailyprofit - expenses;
    totalaftereverything = profitfromcraftinghypergolic + coinsleft;    
    
    minionhourlyprofit = miniondailyprofit / 24;
    oneminionhourlyprofit = Math.round(minionhourlyprofit / htmlminioncount).toLocaleString();
    minionhourlyprofit = Math.round(miniondailyprofit / 24).toLocaleString();

    oneminiondailyprofit = Math.round(miniondailyprofit / htmlminioncount).toLocaleString();    
    miniondailyprofit =  Math.round(miniondailyprofit).toLocaleString();     
    expenses = Math.round(expenses).toLocaleString();    
    coinsleft = Math.round(coinsleft).toLocaleString();    
    profitfromcraftinghypergolic = Math.round(profitfromcraftinghypergolic).toLocaleString();
    totalaftereverything = Math.round(totalaftereverything).toLocaleString();    

    htmlinfernoresulttext.innerHTML = `One minion makes ${oneminionhourlyprofit} coins per hour and ${oneminiondailyprofit} per day.
                                        <br> All the minions combined make ${minionhourlyprofit} coins per hour and ${miniondailyprofit} per day.
                                        <br> Using this fuel and beacon will cost you ${expenses} coins per day.
                                        <br> That will leave you with ${coinsleft} coins after your expenses.
                                        <br> &nbsp;
                                        <br> The items you will get will be: 
                                        <br> ${format((htmlminioncount*dailytotalminionactions*(1-specialproduction)).toFixed(0))} base Crude Gabagool worth ${format((htmlminioncount*dailytotalminionactions*(1-specialproduction)*parseFloat(crudegabagoolprice)).toFixed(0))} coins,
                                        <br> ${format((htmlminioncount * dailytotalminionactions * specialfuelitem).toFixed(0))} distillate ${chosenfuel} worth ${format((htmlminioncount*dailytotalminionactions*specialproduction*specialfueloutput).toFixed(0))} coins,
                                        <br> ${format((checkifitst3/136*htmlminioncount*dailytotalminionactions).toFixed(2))} Chili Peppers worth ${format((checkifitst3/136*htmlminioncount*dailytotalminionactions*parseFloat(chilipepperprice)).toFixed(0))} coins.
                                        <br> ${format((checkifitst3/5950*htmlminioncount*dailytotalminionactions).toFixed(2))} Inferno Vertex worth ${format((checkifitst3/5950*htmlminioncount*dailytotalminionactions*parseFloat(vertexprice)).toFixed(0))} coins,
                                        <br> ${format((checkifitst3/1309091*apexCount*htmlminioncount*dailytotalminionactions).toFixed(2))} Inferno Apex worth ${format((checkifitst3/1309091*apexCount*htmlminioncount*dailytotalminionactions*parseFloat(apexprice)).toFixed(0))} coins,
                                        <br> ${format((checkifitst3/458182*htmlminioncount*dailytotalminionactions).toFixed(2))} Reaper Peppers worth ${format((checkifitst3/458182*htmlminioncount*dailytotalminionactions*parseFloat(reaperprice)).toFixed(0))} coins,`;

}   

async function minioncraftingcosts() {
    const data = await fetchBazaarData();

    everyitem = [
        (data.products[`ENCHANTED_COAL`]?.quick_status[toggleStates[0] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SULPHUR`]?.quick_status[toggleStates[1] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CHILI_PEPPER`]?.quick_status[toggleStates[2] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CAPSAICIN_EYEDROPS_NO_CHARGES`]?.quick_status[toggleStates[3] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL`]?.quick_status[toggleStates[4] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`DERELICT_ASHE`]?.quick_status[toggleStates[5] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_GABAGOOL`]?.quick_status[toggleStates[6] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`HYPERGOLIC_IONIZED_CERAMICS`]?.quick_status[toggleStates[7] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`CRUDE_GABAGOOL_DISTILLATE`]?.quick_status[toggleStates[8] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD_DISTILLATE`]?.quick_status[toggleStates[9] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST_DISTILLATE`]?.quick_status[toggleStates[10] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM_DISTILLATE`]?.quick_status[toggleStates[11] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK_DISTILLATE`]?.quick_status[toggleStates[12] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_FUEL_BLOCK`]?.quick_status[toggleStates[13] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENTROPY_SUPPRESSOR`]?.quick_status[toggleStates[14] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`JALAPENO_BOOK`]?.quick_status[toggleStates[15] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SULPHURIC_COAL`]?.quick_status[toggleStates[16] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_4`]?.quick_status[toggleStates[17] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`STUFFED_CHILI_PEPPER`]?.quick_status[toggleStates[18] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTMENT_CAYENNE_4`]?.quick_status[toggleStates[19] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_VERTEX`]?.quick_status[toggleStates[20] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`INFERNO_APEX`]?.quick_status[toggleStates[21] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REAPER_PEPPER`]?.quick_status[toggleStates[22] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`REHEATED_GUMMY_POLAR_BEAR`]?.quick_status[toggleStates[23] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SNOW_BLOCK`]?.quick_status[toggleStates[24] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_SLIME_BALL`]?.quick_status[toggleStates[25] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`KELVIN_INVERTER`]?.quick_status[toggleStates[26] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_PAPER`]?.quick_status[toggleStates[27] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`WOOD_SINGULARITY`]?.quick_status[toggleStates[28] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_IRON_BLOCK`]?.quick_status[toggleStates[29] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_HUGE_MUSHROOM_1`]?.quick_status[toggleStates[30] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`ENCHANTED_RABBIT_HIDE`]?.quick_status[toggleStates[31] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`VOLTA`]?.quick_status[toggleStates[32] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`BLAZE_ROD`]?.quick_status[toggleStates[33] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`GLOWSTONE_DUST`]?.quick_status[toggleStates[34] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MAGMA_CREAM`]?.quick_status[toggleStates[35] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`NETHER_STALK`]?.quick_status[toggleStates[36] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`POWER_CRYSTAL`]?.quick_status[toggleStates[37] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`SCORCHED_POWER_CRYSTAL`]?.quick_status[toggleStates[38] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
        (data.products[`MOLTEN_POWDER`]?.quick_status[toggleStates[39] ? 'buyPrice' : 'sellPrice'].toFixed(0)),
    ];

    const derelictasheprice = parseFloat(everyitem[5]);
    const moltenpowderprice = parseFloat(everyitem[39]);
    const blazerodprice = parseFloat(everyitem[33]);
    const vertexprice = parseFloat(everyitem[20]);
    const apexprice = parseFloat(everyitem[21]); 
    const blazecrafting1 = blazerodprice * 80;

    tiercraftingitems = [
        format(derelictasheprice * 80 + blazecrafting1),
        format(derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 8 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 24 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 56 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 120 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 248 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 504 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 760 + vertexprice * 16 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 1016 + vertexprice * 64 + derelictasheprice * 400 + blazecrafting1),
        format(moltenpowderprice * 1272 + vertexprice * 112 + apexprice + derelictasheprice * 400 + blazecrafting1), 
    ];

    tiercraftingitemsderelictashes = [80,400,400,400,400,400,400,400,400,400,400];
    tiercraftingitemsmoltenpowders = [0,0,8,24,56,120,248,504,760,1016,1272];
    tiercraftingitemsvertex = [0,0,0,0,0,0,0,0,16,64,112];
    tiercraftingitemsapex = [0,0,0,0,0,0,0,0,0,0,1];
    
    for (let i = 1; i <= 11; i++) { // blade rod
        let divId = 'infernominioncraftingtiertext' + i + 'blazerod';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `Blaze Rod costs: ${format(blazecrafting1)} coins.`;
        }
    }

    for (let i = 1; i <= 11; i++) { // derelict ashe
        let divId = 'infernominioncraftingtiertext' + i + 'derelictashe';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `Derelict Ashe costs: ${format(derelictasheprice*tiercraftingitemsderelictashes[i-1])} coins.`;
        }
    }

    for (let i = 3; i <= 11; i++) { // molten powder
        let divId = 'infernominioncraftingtiertext' + i + 'moltenpowder';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `Molten Powder costs: ${format(moltenpowderprice*tiercraftingitemsmoltenpowders[i-1])} coins.`;
        }
    }

    for (let i = 9; i <= 11; i++) { // vertex
        let divId = 'infernominioncraftingtiertext' + i + 'infernovertex';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `Inferno Vertex costs: ${format(vertexprice*tiercraftingitemsvertex[i-1])} coins.`;
        }
    }

    for (let i = 11; i <= 11; i++) { // apex
        let divId = 'infernominioncraftingtiertext' + i + 'infernoapex';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `Inferno Apex costs: ${format(apexprice*tiercraftingitemsapex[i-1])} coins.`;
        }
    }

    for (let i = 1; i <= 11; i++) { // TOTAL
        let divId = 'infernominioncraftingtiertext' + i + 'total';
        let divElement = document.getElementById(divId);
        if (divElement) {
            divElement.innerHTML = `The total cost is: ${tiercraftingitems[i-1]} coins.`;
        }
    }
}

everyitemtoggling();
bazaarconnect();
minioncraftingcosts();