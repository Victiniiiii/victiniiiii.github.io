//ejsforge.js
const express = require('express');
const app = express();
const path = require('path');

// no idea what this does
app.set('views', path.join(__dirname, ''));

// set ejs as the engine
app.set('view engine', 'ejs');

// for css to work
app.use('/static', express.static(path.join(__dirname, 'static')));

// render ejsforge.ejs 
app.get('/', async (req, res) => {
    try {
        const gemstoneSentences = await gemstonenames();

        res.render('ejsforge', { gemstoneSentences, gemstoneNames: ['JADE_GEM', 'AMBER_GEM', 'TOPAZ_GEM', 'SAPPHIRE_GEM', 'AMETHYST_GEM', 'RUBY_GEM', 'JASPER_GEM', 'OPAL_GEM'], capitalizedgemstoneNames: ['Jade', 'Amber', 'Topaz', 'Sapphire', 'Amethyst', 'Ruby', 'Jasper', 'Opal'] });
    } catch (error) {
        console.error('Error rendering template:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function gemstonenames() {
    const fetch = await import('node-fetch'); 

    const response = await fetch.default('https://api.hypixel.net/skyblock/bazaar');
    const data = await response.json();

    const gemstoneNames = ['JADE_GEM', 'AMBER_GEM', 'TOPAZ_GEM', 'SAPPHIRE_GEM', 'AMETHYST_GEM', 'RUBY_GEM', 'JASPER_GEM', 'OPAL_GEM'];
    const capitalizedgemstoneNames = ['Jade', 'Amber', 'Topaz', 'Sapphire', 'Amethyst', 'Ruby', 'Jasper', 'Opal'];

    const getGemstoneInfo = (gemName) => {
        const fineGem = data.products[`FINE_${gemName}`]?.quick_status;
        const flawlessGem = data.products[`FLAWLESS_${gemName}`]?.quick_status;
        const perfectGem = data.products[`PERFECT_${gemName}`]?.quick_status;

        const fineGemPrice = fineGem.sellPrice;
        const flawlessGemPrice = flawlessGem.sellPrice;
        const perfectGemBuyPrice = perfectGem.buyPrice;

        const fineGemProfit = perfectGemBuyPrice - (fineGemPrice * 400);
        const flawlessGemProfit = perfectGemBuyPrice - (flawlessGemPrice * 5);

        const formatNumber = (number) => Math.floor(number).toLocaleString().replace(/,/g, ',');

        const capitalizedGemName = gemName.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return {
            fineSentence: ` 400 Fine ${capitalizedGemName} Gemstones are $${formatNumber(fineGemPrice * 400)}, <br> and 1 Perfect ${capitalizedGemName} Gemstone is $${formatNumber(perfectGemBuyPrice)}.<br>The profit is $${formatNumber(fineGemProfit)}.`,
            flawlessSentence: ` 5 Flawless ${capitalizedGemName} Gemstones are $${formatNumber(flawlessGemPrice * 5)}, <br> and 1 Perfect ${capitalizedGemName} Gemstone is $${formatNumber(perfectGemBuyPrice)}.<br>The profit is $${formatNumber(flawlessGemProfit)}.`,
        };
    };

    const gemstoneInfoArray = gemstoneNames.map(getGemstoneInfo);
    const gemstoneSentences = gemstoneInfoArray.flatMap(({ fineSentence, flawlessSentence}) => [fineSentence, flawlessSentence]);
    return gemstoneSentences;

}

gemstonenames().then(sentences => {
    const gemstoneTexts = sentences.reduce((acc, sentence, index) => {
        acc[`text${index + 1}`] = sentence;
        return acc;
    }, {});
});
