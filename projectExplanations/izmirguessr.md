# IzmirGuessr

This is a web based game, inspired from the game GeoGuessr, but coded entirely from scratch.  
The main difference is, instead of guessing the random jungles or the deserts of the world, this game is aimed to have the neighborhoods where we grew up, adding real guessability to the locations, also creating a factor of nostalgia.  
The districts are also toggleable, so you can limit the play area to your 5 most favorite districts, or even one.  
It uses the free version of the Google Maps API, to create street view in the webpage. The user then needs to guess where they are based on their surroundings, and put their guess at the minimap bottom-right of the screen. The points are calculated according to how close the guess was.  
The game also uses Firebase, both for authentication and storage, to create the public leaderboards, personal statistics and match history.  