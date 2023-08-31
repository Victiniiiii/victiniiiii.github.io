import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import requests
import json
import os
import urllib.request

response_API = requests.get('https://api.hypixel.net/skyblock/bazaar')
data = response_API.text
parse_json = json.loads(data)

# Create the main window
root = tk.Tk()
root.title("Forging Profit Calculator")
root.geometry("1200x900")
root.resizable(False, False)  # Prevent resizing of the app
root.config(bg="black")

# Create a style for dark mode
style = ttk.Style()
style.theme_use('clam')
style.configure("TNotebook", background="black")
style.configure("TNotebook.Tab", background="black", foreground="black", font=("Verdana", 10, "bold"))
style.configure("TFrame", background="black")
style.configure("TLabel", background="black", foreground="white")

# Define the font style and size for the gemstone names
font_style = ("Verdana", 14, "bold")

# All the data of gemstones
FineJade = parse_json['products']['FINE_JADE_GEM']['quick_status']['sellPrice']
PerfectJade = parse_json['products']['PERFECT_JADE_GEM']['quick_status']['sellPrice']
FineJade400 = FineJade * 400
JadeProfit = PerfectJade - FineJade400
FineAmber = parse_json['products']['FINE_AMBER_GEM']['quick_status']['sellPrice']
PerfectAmber = parse_json['products']['PERFECT_AMBER_GEM']['quick_status']['sellPrice']
FineAmber400 = FineAmber * 400
AmberProfit = PerfectAmber - FineAmber400
FineTopaz = parse_json['products']['FINE_TOPAZ_GEM']['quick_status']['sellPrice']
PerfectTopaz = parse_json['products']['PERFECT_TOPAZ_GEM']['quick_status']['sellPrice']
FineTopaz400 = FineTopaz * 400
TopazProfit = PerfectTopaz - FineTopaz400
FineSapphire = parse_json['products']['FINE_SAPPHIRE_GEM']['quick_status']['sellPrice']
PerfectSapphire = parse_json['products']['PERFECT_SAPPHIRE_GEM']['quick_status']['sellPrice']
FineSapphire400 = FineSapphire * 400
SapphireProfit = PerfectSapphire - FineSapphire400
FineAmethyst = parse_json['products']['FINE_AMETHYST_GEM']['quick_status']['sellPrice']
PerfectAmethyst = parse_json['products']['PERFECT_AMETHYST_GEM']['quick_status']['sellPrice']
FineAmethyst400 = FineAmethyst * 400
AmethystProfit = PerfectAmethyst - FineAmethyst400
FineRuby = parse_json['products']['FINE_RUBY_GEM']['quick_status']['sellPrice']
PerfectRuby = parse_json['products']['PERFECT_RUBY_GEM']['quick_status']['sellPrice']
FineRuby400 = FineRuby * 400
RubyProfit = PerfectRuby - FineRuby400
FineJasper = parse_json['products']['FINE_JASPER_GEM']['quick_status']['sellPrice']
PerfectJasper = parse_json['products']['PERFECT_JASPER_GEM']['quick_status']['sellPrice']
FineJasper400 = FineJasper * 400
JasperProfit = PerfectJasper - FineJasper400
FineOpal = parse_json['products']['FINE_OPAL_GEM']['quick_status']['sellPrice']
PerfectOpal = parse_json['products']['PERFECT_OPAL_GEM']['quick_status']['sellPrice']
FineOpal400 = FineOpal * 400
OpalProfit = PerfectOpal - FineOpal400

jadesentence = "The price of 400 Fine Jade is ${:,.0f}.\n".format(FineJade400) + \
               "The price of 1 Perfect Jade is ${:,.0f}.\n".format(PerfectJade) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(JadeProfit)
ambersentence = "The price of 400 Fine Topaz is ${:,.0f}.\n".format(FineAmber400) + \
               "The price of 1 Perfect Topaz is ${:,.0f}.\n".format(PerfectAmber) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(AmberProfit)
topazsentence = "The price of 400 Fine Topaz is ${:,.0f}.\n".format(FineTopaz400) + \
               "The price of 1 Perfect Topaz is ${:,.0f}.\n".format(PerfectTopaz) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(TopazProfit)
sapphiresentence = "The price of 400 Fine Sapphire is ${:,.0f}.\n".format(FineSapphire400) + \
               "The price of 1 Perfect Sapphire is ${:,.0f}.\n".format(PerfectSapphire) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(SapphireProfit)
amethystsentence = "The price of 400 Fine Amethyst is ${:,.0f}.\n".format(FineAmethyst400) + \
               "The price of 1 Perfect Amethyst is ${:,.0f}.\n".format(PerfectAmethyst) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(AmethystProfit)
jaspersentence = "The price of 400 Fine Jasper is ${:,.0f}.\n".format(FineJasper400) + \
               "The price of 1 Perfect Jasper is ${:,.0f}.\n".format(PerfectJasper) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(JasperProfit)
rubysentence = "The price of 400 Fine Amethyst is ${:,.0f}.\n".format(FineRuby400) + \
               "The price of 1 Perfect Amethyst is ${:,.0f}.\n".format(PerfectRuby) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(RubyProfit)
opalsentence = "The price of 400 Fine Opal is ${:,.0f}.\n".format(FineOpal400) + \
               "The price of 1 Perfect Opal is ${:,.0f}.\n".format(PerfectOpal) + \
               "The profit from forging this gem is ${:,.0f}.\n".format(OpalProfit)

def exit_app():
    if root is not None:
        root.destroy()

# Bazaar API status box
response = requests.get("https://api.hypixel.net/skyblock/bazaar")
if response.status_code == 200:
    border_frame = tk.Frame(bg="green", width=30, height=5)
    border_frame.grid(row=2, column=2, padx=100, pady=0, sticky="nsew")
    bazaar_api_label = tk.Label(border_frame, text="Bazaar API\naccessed\nsuccessfully!", fg="white", font=("Verdana", 20, "bold"), bg="green")
    bazaar_api_label.pack()
else:
    border_frame = tk.Frame(bg="red", width=30, height=5)
    border_frame.grid(row=2, column=2, padx=100, pady=0, sticky="nsew")
    bazaar_api_label = tk.Label(border_frame, text="Failed to access\nBazaar API.\nError code: {response.status_code}", fg="white", font=("Verdana", 20, "bold"), bg="white")
    bazaar_api_label.pack()

# Create the Exit button
exit_button = tk.Button(text="Exit", bg="white", width=30, height=5, command=exit_app)
exit_button.grid(row=4, column=2, padx=100, pady=0, sticky="nsew")

# Create image placeholders and text placeholders in the Gemstone Merging tab
image_file_paths = []

# Download and save the image from the URL
ruby_image_path = "jade_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/7/7b/Fine_Jade_Gemstone.png/revision/latest?cb=20210706152109", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "amber_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/9/93/Fine_Amber_Gemstone.png/revision/latest?cb=20210706152107", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "topaz_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/b/bb/Fine_Topaz_Gemstone.png/revision/latest?cb=20210706152116", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "sapphire_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/1/1b/Fine_Sapphire_Gemstone.png/revision/latest?cb=20210706152115", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "amethyst_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/3/3a/Fine_Amethyst_Gemstone.png/revision/latest?cb=20210706152108", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "jasper_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/b/b5/Fine_Jasper_Gemstone.png/revision/latest?cb=20210706152110", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "ruby_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/2/29/Fine_Ruby_Gemstone.png/revision/latest?cb=20210706152112", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))
ruby_image_path = "opal_gem.png"
urllib.request.urlretrieve("https://static.wikia.nocookie.net/hypixel-skyblock/images/b/b7/Fine_Opal_Gemstone.png/revision/latest?cb=20221004093642", ruby_image_path)
image_file_paths.append(os.path.abspath(ruby_image_path))

gemstone_names = [jadesentence, ambersentence, topazsentence, sapphiresentence, amethystsentence, jaspersentence, rubysentence, opalsentence]

for i, image_file_path in enumerate(image_file_paths):
    image = Image.open(image_file_path)
    width, height = image.size
    new_width = 89
    new_height = 89
    resized_image = image.resize((new_width, new_height))
    image_placeholder = ImageTk.PhotoImage(resized_image)
    image_label = tk.Label(image=image_placeholder)
    image_label.grid(row=i, column=0, padx=10, pady=10)
    image_label.image = image_placeholder  # Store a reference to the image to prevent it from being garbage collected

# Create the text placeholder with the modified font style and size
    text_placeholders = []
    for i, gemstone_name in enumerate(gemstone_names):
        text_placeholder = tk.Label(bg="white", width=50, height=3, padx=3, pady=1, font=font_style)
        text_placeholder.grid(row=i, column=1, padx=10, pady=1, sticky="nsew")  # Set sticky parameter to "nsew"
        text_placeholders.append(text_placeholder)  # Store the text placeholder in a list


def update_text():
    # Update the text placeholders based on the values of JadeProfit, AmberProfit, etc.
    for i, gemstone_name in enumerate(gemstone_names):
        text_placeholder = text_placeholders[i]  # Get the corresponding text placeholder

        if i == 0:
            # Change the text color of jadesentence based on JadeProfit value
            if JadeProfit > 1000000:
                text_placeholder.config(text=jadesentence, fg="green")
            elif JadeProfit > 0:
                text_placeholder.config(text=jadesentence, fg="B89D07")
            else:
                text_placeholder.config(text=jadesentence, fg="red")
        elif i == 1:
            # Change the text color of ambersentence based on AmberProfit value
            if AmberProfit > 1000000:
                text_placeholder.config(text=ambersentence, fg="green")
            elif AmberProfit > 0:
                text_placeholder.config(text=ambersentence, fg="#B89D07")
            else:
                text_placeholder.config(text=ambersentence, fg="red")
        elif i == 2:
            # Change the text color of topazsentence based on TopazProfit value
            if TopazProfit > 1000000:
                text_placeholder.config(text=topazsentence, fg="green")
            elif TopazProfit > 0:
                text_placeholder.config(text=topazsentence, fg="#B89D07")
            else:
                text_placeholder.config(text=topazsentence, fg="red")
        elif i == 3:
            # Change the text color of sapphiresentence based on SapphireProfit value
            if SapphireProfit > 1000000:
                text_placeholder.config(text=sapphiresentence, fg="green")
            elif SapphireProfit > 0:
                text_placeholder.config(text=sapphiresentence, fg="#B89D07")
            else:
                text_placeholder.config(text=sapphiresentence, fg="red")
        elif i == 4:
            # Change the text color of amethystsentence based on AmethystProfit value
            if AmethystProfit > 1000000:
                text_placeholder.config(text=amethystsentence, fg="green")
            elif AmethystProfit > 0:
                text_placeholder.config(text=amethystsentence, fg="#B89D07")
            else:
                text_placeholder.config(text=amethystsentence, fg="red")
        elif i == 5:
            # Change the text color of jaspersentence based on JasperProfit value
            if JasperProfit > 1000000:
                text_placeholder.config(text=jaspersentence, fg="green")
            elif JasperProfit > 0:
                text_placeholder.config(text=jaspersentence, fg="#B89D07")
            else:
                text_placeholder.config(text=jaspersentence, fg="red")
        elif i == 6:
            # Change the text color of rubysentence based on RubyProfit value
            if RubyProfit > 1000000:
                text_placeholder.config(text=rubysentence, fg="green")
            elif RubyProfit > 0:
                text_placeholder.config(text=rubysentence, fg="#B89D07")
            else:
                text_placeholder.config(text=rubysentence, fg="red")
        elif i == 7:
            # Change the text color of opalsentence based on OpalProfit value
            if OpalProfit > 1000000:
                text_placeholder.config(text=opalsentence, fg="green")
            elif OpalProfit > 0:
                text_placeholder.config(text=opalsentence, fg="#B89D07")
            else:
                text_placeholder.config(text=opalsentence, fg="red")

# Schedule the initial update
update_text()

# Run the application
root.mainloop()
