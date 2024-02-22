# in flaskforge.py
import requests
import json

response_API = requests.get('https://api.hypixel.net/skyblock/bazaar')
data = response_API.text
parse_json = json.loads(data)

def gemstonenames():
    FineJade = parse_json['products']['FINE_JADE_GEM']['quick_status']['sellPrice']
    FlawlessJade = parse_json['products']['FLAWLESS_JADE_GEM']['quick_status']['sellPrice']
    PerfectJade = parse_json['products']['PERFECT_JADE_GEM']['quick_status']['buyPrice']
    FineJade400 = FineJade * 400
    FlawlessJade5 = FlawlessJade * 5
    FineJadeProfit = PerfectJade - FineJade400
    FlawlessJadeProfit = PerfectJade - FlawlessJade5
    FineJadeSentence = " 400 Fine Jade Gemstones are ${:,.0f}, and  1 Perfect Jade Gemstone is ${:,.0f}.".format(FineJade400,PerfectJade)
    FineJadeProfitSentence = " The profit is ${:,.0f}.".format(FineJadeProfit)
    FlawlessJadeSentence = " 5 Flawless Jade Gemstones are ${:,.0f}, and  1 Perfect Jade Gemstone is ${:,.0f}.".format(FlawlessJade5,PerfectJade)
    FlawlessJadeProfitSentence = " The profit is ${:,.0f}.".format(FlawlessJadeProfit)

    FineAmber = parse_json['products']['FINE_AMBER_GEM']['quick_status']['sellPrice']
    FlawlessAmber = parse_json['products']['FLAWLESS_AMBER_GEM']['quick_status']['sellPrice']
    PerfectAmber = parse_json['products']['PERFECT_AMBER_GEM']['quick_status']['buyPrice']
    FineAmber400 = FineAmber * 400
    FlawlessAmber5 = FlawlessAmber * 5
    FineAmberProfit = PerfectAmber - FineAmber400
    FlawlessAmberProfit = PerfectAmber - FlawlessAmber5
    FineAmberSentence = " 400 Fine Amber Gemstones are ${:,.0f}, and  1 Perfect Amber Gemstone is ${:,.0f}.".format(FineAmber400,PerfectAmber)
    FineAmberProfitSentence = " The profit is ${:,.0f}.".format(FineAmberProfit)
    FlawlessAmberSentence = " 5 Flawless Amber Gemstones are ${:,.0f}, and  1 Perfect Amber Gemstone is ${:,.0f}.".format(FlawlessAmber5,PerfectAmber)
    FlawlessAmberProfitSentence = " The profit is ${:,.0f}.".format(FlawlessAmberProfit)

    FineTopaz = parse_json['products']['FINE_TOPAZ_GEM']['quick_status']['sellPrice']
    FlawlessTopaz = parse_json['products']['FLAWLESS_TOPAZ_GEM']['quick_status']['sellPrice']
    PerfectTopaz = parse_json['products']['PERFECT_TOPAZ_GEM']['quick_status']['buyPrice']
    FineTopaz400 = FineTopaz * 400
    FlawlessTopaz5 = FlawlessTopaz * 5
    FineTopazProfit = PerfectTopaz - FineTopaz400
    FlawlessTopazProfit = PerfectTopaz - FlawlessTopaz5
    FineTopazSentence = " 400 Fine Topaz Gemstones are ${:,.0f}, and  1 Perfect Topaz Gemstone is ${:,.0f}.".format(FineTopaz400,PerfectTopaz)
    FineTopazProfitSentence = " The profit is ${:,.0f}.".format(FineTopazProfit)
    FlawlessTopazSentence = " 5 Flawless Topaz Gemstones are ${:,.0f}, and  1 Perfect Topaz Gemstone is ${:,.0f}.".format(FlawlessTopaz5,PerfectTopaz)
    FlawlessTopazProfitSentence = " The profit is ${:,.0f}.".format(FlawlessTopazProfit)

    FineSapphire = parse_json['products']['FINE_SAPPHIRE_GEM']['quick_status']['sellPrice']
    FlawlessSapphire = parse_json['products']['FLAWLESS_SAPPHIRE_GEM']['quick_status']['sellPrice']
    PerfectSapphire = parse_json['products']['PERFECT_SAPPHIRE_GEM']['quick_status']['buyPrice']
    FineSapphire400 = FineSapphire * 400
    FlawlessSapphire5 = FlawlessSapphire * 5
    FineSapphireProfit = PerfectSapphire - FineSapphire400
    FlawlessSapphireProfit = PerfectSapphire - FlawlessSapphire5
    FineSapphireSentence = " 400 Fine Sapphire Gemstones are ${:,.0f}, and  1 Perfect Sapphire Gemstone is ${:,.0f}.".format(FineSapphire400,PerfectSapphire)
    FineSapphireProfitSentence = " The profit is ${:,.0f}.".format(FineSapphireProfit)
    FlawlessSapphireSentence = " 5 Flawless Sapphire Gemstones are ${:,.0f}, and  1 Perfect Sapphire Gemstone is ${:,.0f}.".format(FlawlessSapphire5,PerfectSapphire)
    FlawlessSapphireProfitSentence = " The profit is ${:,.0f}.".format(FlawlessSapphireProfit)

    FineAmethyst = parse_json['products']['FINE_AMETHYST_GEM']['quick_status']['sellPrice']
    FlawlessAmethyst = parse_json['products']['FLAWLESS_AMETHYST_GEM']['quick_status']['sellPrice']
    PerfectAmethyst = parse_json['products']['PERFECT_AMETHYST_GEM']['quick_status']['buyPrice']
    FineAmethyst400 = FineAmethyst * 400
    FlawlessAmethyst5 = FlawlessAmethyst * 5
    FineAmethystProfit = PerfectAmethyst - FineAmethyst400
    FlawlessAmethystProfit = PerfectAmethyst - FlawlessAmethyst5
    FineAmethystSentence = " 400 Fine Amethyst Gemstones are ${:,.0f}, and  1 Perfect Amethyst Gemstone is ${:,.0f}.".format(FineAmethyst400,PerfectAmethyst)
    FineAmethystProfitSentence = " The profit is ${:,.0f}.".format(FineAmethystProfit)
    FlawlessAmethystSentence = " 5 Flawless Amethyst Gemstones are ${:,.0f}, and  1 Perfect Amethyst Gemstone is ${:,.0f}.".format(FlawlessAmethyst5,PerfectAmethyst)
    FlawlessAmethystProfitSentence = " The profit is ${:,.0f}.".format(FlawlessAmethystProfit)

    FineRuby = parse_json['products']['FINE_RUBY_GEM']['quick_status']['sellPrice']
    FlawlessRuby = parse_json['products']['FLAWLESS_RUBY_GEM']['quick_status']['sellPrice']
    PerfectRuby = parse_json['products']['PERFECT_RUBY_GEM']['quick_status']['buyPrice']
    FineRuby400 = FineRuby * 400
    FlawlessRuby5 = FlawlessRuby * 5
    FineRubyProfit = PerfectRuby - FineRuby400
    FlawlessRubyProfit = PerfectRuby - FlawlessRuby5
    FineRubySentence = " 400 Fine Ruby Gemstones are ${:,.0f}, and  1 Perfect Ruby Gemstone is ${:,.0f}.".format(FineRuby400,PerfectRuby)
    FineRubyProfitSentence = " The profit is ${:,.0f}.".format(FineRubyProfit)
    FlawlessRubySentence = " 5 Flawless Ruby Gemstones are ${:,.0f}, and  1 Perfect Ruby Gemstone is ${:,.0f}.".format(FlawlessRuby5,PerfectRuby)
    FlawlessRubyProfitSentence = " The profit is ${:,.0f}.".format(FlawlessRubyProfit)

    FineJasper = parse_json['products']['FINE_JASPER_GEM']['quick_status']['sellPrice']
    FlawlessJasper = parse_json['products']['FLAWLESS_JASPER_GEM']['quick_status']['sellPrice']
    PerfectJasper = parse_json['products']['PERFECT_JASPER_GEM']['quick_status']['buyPrice']
    FineJasper400 = FineJasper * 400
    FlawlessJasper5 = FlawlessJasper * 5
    FineJasperProfit = PerfectJasper - FineJasper400
    FlawlessJasperProfit = PerfectJasper - FlawlessJasper5
    FineJasperSentence = " 400 Fine Jasper Gemstones are ${:,.0f}, and  1 Perfect Jasper Gemstone is ${:,.0f}.".format(FineJasper400,PerfectJasper)
    FineJasperProfitSentence = " The profit is ${:,.0f}.".format(FineJasperProfit)
    FlawlessJasperSentence = " 5 Flawless Jasper Gemstones are ${:,.0f}, and  1 Perfect Jasper Gemstone is ${:,.0f}.".format(FlawlessJasper5,PerfectJasper)
    FlawlessJasperProfitSentence = " The profit is ${:,.0f}.".format(FlawlessJasperProfit)

    FineOpal = parse_json['products']['FINE_OPAL_GEM']['quick_status']['sellPrice']
    FlawlessOpal = parse_json['products']['FLAWLESS_OPAL_GEM']['quick_status']['sellPrice']
    PerfectOpal = parse_json['products']['PERFECT_OPAL_GEM']['quick_status']['buyPrice']
    FineOpal400 = FineOpal * 400
    FlawlessOpal5 = FlawlessOpal * 5
    FineOpalProfit = PerfectOpal - FineOpal400
    FlawlessOpalProfit = PerfectOpal - FlawlessOpal5
    FineOpalSentence = " 400 Fine Opal Gemstones are ${:,.0f}, and  1 Perfect Opal Gemstone is ${:,.0f}.".format(FineOpal400,PerfectOpal)
    FineOpalProfitSentence = " The profit is ${:,.0f}.".format(FineOpalProfit)
    FlawlessOpalSentence = " 5 Flawless Opal Gemstones are ${:,.0f}, and  1 Perfect Opal Gemstone is ${:,.0f}.".format(FlawlessOpal5,PerfectOpal)
    FlawlessOpalProfitSentence = " The profit is ${:,.0f}.".format(FlawlessOpalProfit)


    gemstone_sentences = [FineJadeSentence, FineJadeProfitSentence, FlawlessJadeSentence, FlawlessJadeProfitSentence,
                          FineAmberSentence, FineAmberProfitSentence, FlawlessAmberSentence, FlawlessAmberProfitSentence,
                          FineTopazSentence, FineTopazProfitSentence, FlawlessTopazSentence, FlawlessTopazProfitSentence,
                          FineSapphireSentence, FineSapphireProfitSentence, FlawlessSapphireSentence, FlawlessSapphireProfitSentence,
                          FineAmethystSentence, FineAmethystProfitSentence, FlawlessAmethystSentence, FlawlessAmethystProfitSentence,
                          FineRubySentence, FineRubyProfitSentence, FlawlessRubySentence, FlawlessRubyProfitSentence,
                          FineJasperSentence, FineJasperProfitSentence, FlawlessJasperSentence, FlawlessJasperProfitSentence,
                          FineOpalSentence, FineOpalProfitSentence, FlawlessOpalSentence, FlawlessOpalProfitSentence]

    return gemstone_sentences
