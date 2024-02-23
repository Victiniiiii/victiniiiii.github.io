async function gemstonenames() {
    const response = await fetch('https://api.hypixel.net/skyblock/bazaar');
    const data = await response.json();

    const getGemstoneInfo = (gemName) => {
        const sellPrice = data.products[gemName].quick_status.sellPrice;
        const buyPrice = data.products[gemName].quick_status.buyPrice;
        const fineGemPrice = sellPrice * 400;
        const flawlessGemPrice = sellPrice * 5;
        const fineGemProfit = buyPrice - fineGemPrice;
        const flawlessGemProfit = buyPrice - flawlessGemPrice;

        return {
            fineSentence: ` 400 Fine ${gemName} Gemstones are $${fineGemPrice.toLocaleString()}, and 1 Perfect ${gemName} Gemstone is $${buyPrice.toLocaleString()}.`,
            fineProfitSentence: ` The profit is $${fineGemProfit.toLocaleString()}.`,
            flawlessSentence: ` 5 Flawless ${gemName} Gemstones are $${flawlessGemPrice.toLocaleString()}, and 1 Perfect ${gemName} Gemstone is $${buyPrice.toLocaleString()}.`,
            flawlessProfitSentence: ` The profit is $${flawlessGemProfit.toLocaleString()}.`
        };
    };

    const gemstoneInfoArray = [
        getGemstoneInfo('FINE_JADE_GEM'),
        getGemstoneInfo('FINE_AMBER_GEM'),
        getGemstoneInfo('FINE_TOPAZ_GEM'),
        getGemstoneInfo('FINE_SAPPHIRE_GEM'),
        getGemstoneInfo('FINE_AMETHYST_GEM'),
        getGemstoneInfo('FINE_RUBY_GEM'),
        getGemstoneInfo('FINE_JASPER_GEM'),
        getGemstoneInfo('FINE_OPAL_GEM'),
    ];

    const gemstoneSentences = gemstoneInfoArray.flatMap(({ fineSentence, fineProfitSentence, flawlessSentence, flawlessProfitSentence }) => [
        fineSentence, fineProfitSentence, flawlessSentence, flawlessProfitSentence
    ]);

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
