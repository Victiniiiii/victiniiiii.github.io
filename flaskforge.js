const gemstoneNames = [
    'JADE_GEM',
    'AMBER_GEM',
    'TOPAZ_GEM',
    'SAPPHIRE_GEM',
    'AMETHYST_GEM',
    'RUBY_GEM',
    'JASPER_GEM',
    'OPAL_GEM',
];

async function gemstonenames() {
    const response = await fetch('https://api.hypixel.net/skyblock/bazaar');
    const data = await response.json();

const getGemstoneInfo = (gemName) => {
    const fineGem = data.products[`FINE_${gemName}`]?.quick_status;
    const flawlessGem = data.products[`FLAWLESS_${gemName}`]?.quick_status;
    const perfectGem = data.products[`PERFECT_${gemName}`]?.quick_status;

    // Check if gem data exists
    if (!fineGem || !flawlessGem || !perfectGem) {
        console.error(`Gem data not found for ${gemName}`);
        return {
            fineSentence: '',
            fineProfitSentence: '',
            flawlessSentence: '',
            flawlessProfitSentence: '',
        };
    }

    const fineGemPrice = fineGem.sellPrice;
    const flawlessGemPrice = flawlessGem.sellPrice;
    const perfectGemBuyPrice = perfectGem.buyPrice;

    const fineGemProfit = perfectGemBuyPrice - (fineGemPrice * 400);
    const flawlessGemProfit = perfectGemBuyPrice - (flawlessGemPrice * 5);

    const formatNumber = (number) => Math.floor(number).toLocaleString().replace(/,/g, ',');

    return {
        fineSentence: ` 400 Fine ${gemName.replace('_', ' ')} Gemstones are $${formatNumber(fineGemPrice * 400)}, and 1 Perfect ${gemName.replace('_', ' ')} Gemstone is $${formatNumber(perfectGemBuyPrice)}.`,
        fineProfitSentence: ` The profit is $${formatNumber(fineGemProfit)}.`,
        flawlessSentence: ` 5 Flawless ${gemName.replace('_', ' ')} Gemstones are $${formatNumber(flawlessGemPrice * 5)}, and 1 Perfect ${gemName.replace('_', ' ')} Gemstone is $${formatNumber(perfectGemBuyPrice)}.`,
        flawlessProfitSentence: ` The profit is $${formatNumber(flawlessGemProfit)}.`
    };
};


const gemstoneInfoArray = gemstoneNames.map(getGemstoneInfo);

const gemstoneSentences = gemstoneInfoArray.flatMap(({ fineSentence, fineProfitSentence, flawlessSentence, flawlessProfitSentence }) => [
    fineSentence, fineProfitSentence, flawlessSentence, flawlessProfitSentence]);

return gemstoneSentences;
}

// Call the gemstonenames function and update the text in HTML
gemstonenames().then(sentences => {
    const gemstoneTexts = sentences.reduce((acc, sentence, index) => {
        acc[`text${index + 1}`] = sentence;
        return acc;
    }, {});

    // Update the text in HTML
    Object.entries(gemstoneTexts).forEach(([key, value]) => {
        document.getElementById(key).textContent = value;
    });
});
