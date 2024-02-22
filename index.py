# In index.py
from flask import Flask, render_template
from flaskforge import gemstonenames

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404  # Render the 404.html template

@app.route('/ortalamator')
def ortalamator():
    return render_template('ortalamator.html')

@app.route('/bigoil')
def big_oil():
    return render_template('bigoil.html')

@app.route('/contactme')
def contactme():
    return render_template ('contactme.html')

@app.route('/projects')
def projects():
    return render_template ('placeholder.html')

@app.route('/drawtest')
def drawtest():
    return render_template ('drawtest.html')

@app.route('/test1')
def test1():
    return render_template ('placeholder.html')

@app.route('/flaskforge')
def texts():
    gemstone_info = gemstonenames()  # Call the gemstonenames function to get the data
    FineJadeSentence, FineJadeProfitSentence, FlawlessJadeSentence, FlawlessJadeProfitSentence, \
    FineAmberSentence, FineAmberProfitSentence, FlawlessAmberSentence, FlawlessAmberProfitSentence, \
    FineTopazSentence, FineTopazProfitSentence, FlawlessTopazSentence, FlawlessTopazProfitSentence, \
    FineSapphireSentence, FineSapphireProfitSentence, FlawlessSapphireSentence, FlawlessSapphireProfitSentence, \
    FineAmethystSentence, FineAmethystProfitSentence, FlawlessAmethystSentence, FlawlessAmethystProfitSentence, \
    FineRubySentence, FineRubyProfitSentence, FlawlessRubySentence, FlawlessRubyProfitSentence, \
    FineJasperSentence, FineJasperProfitSentence, FlawlessJasperSentence, FlawlessJasperProfitSentence, \
    FineOpalSentence, FineOpalProfitSentence, FlawlessOpalSentence, FlawlessOpalProfitSentence = gemstone_info

    text1 = f"{FineJadeSentence}"
    text2 = f"{FineJadeProfitSentence}"
    text3 = f"{FlawlessJadeSentence}"
    text4 = f"{FlawlessJadeProfitSentence}"
    text5 = f"{FineAmberSentence}"
    text6 = f"{FineAmberProfitSentence}"
    text7 = f"{FlawlessAmberSentence}"
    text8 = f"{FlawlessAmberProfitSentence}"
    text9 = f"{FineTopazSentence}"
    text10 = f"{FineTopazProfitSentence}"
    text11 = f"{FlawlessTopazSentence}"
    text12 = f"{FlawlessTopazProfitSentence}"
    text13 = f"{FineSapphireSentence}"
    text14 = f"{FineSapphireProfitSentence}"
    text15 = f"{FlawlessSapphireSentence}"
    text16 = f"{FlawlessSapphireProfitSentence}"
    text17 = f"{FineAmethystSentence}"
    text18 = f"{FineAmethystProfitSentence}"
    text19 = f"{FlawlessAmethystSentence}"
    text20 = f"{FlawlessAmethystProfitSentence}"
    text21 = f"{FineRubySentence}"
    text22 = f"{FineRubyProfitSentence}"
    text23 = f"{FlawlessRubySentence}"
    text24 = f"{FlawlessRubyProfitSentence}"
    text25 = f"{FineJasperSentence}"
    text26 = f"{FineJasperProfitSentence}"
    text27 = f"{FlawlessJasperSentence}"
    text28 = f"{FlawlessJasperProfitSentence}"
    text29 = f"{FineOpalSentence}"
    text30 = f"{FineOpalProfitSentence}"
    text31 = f"{FlawlessOpalSentence}"
    text32 = f"{FlawlessOpalProfitSentence}"

    return render_template('flaskforge.html', texts=texts ,text1=text1, text2=text2, text3=text3, text4=text4, text5=text5, text6=text6, text7=text7, text8=text8, text9=text9, text10=text10, text11=text11, text12=text12, text13=text13, text14=text14, text15=text15, text16=text16, text17=text17, text18=text18, text19=text19, text20=text20, text21=text21, text22=text22, text23=text23, text24=text24, text25=text25, text26=text26, text27=text27, text28=text28, text29=text29, text30=text30, text31=text31, text32=text32)

if __name__ == '__main__':
    app.run()
