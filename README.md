# servo api use

an app to show where you are to find where the closest service station is to you based off the location you put into the map

# features 
The app uses server requests from a database to render requests from the database about the locations of various various service stations. It includes a search function to find various locations on the map, information about the owners of each service station, current location displayed and service stations closest to them, spotlighted info for a random service station, dynamically displayed markers that appear as the center of the map is changed and oil prices based of current oil prices.

# map api 
The map is used to display information based off the database, the data base takes the latitude and longitude and places that location into the map that is dynamically places the markers on the map based off the map center and the other positions of the map.

# database 
The datatbase has the information based off every service station. It is called either randomly, to fetch a random pertrol station and display that in the spotlight, all service station within the bounds of what is currently visiable on the map. The owners of each petrol station and the amount of petrol stations they own and the current nearest stations to the current centre of the map within a 5km distance of the location.

# distances
distances are processed through postgresql query string that is then sorted via the alogithm places into it. The lognitude and latitude for the current center of the map is then found and processed through the algorithm in the postgresql query. It then shows sorts the information by those closest to the current map center before being dynamically displayed on the sidebars.

# oil prices
oil prices are displayed on the bottom of the screen via the information through the commodiites api, this information is then given to us through and displayed on the screen.

# languages
Javascript, css, html, ejs, node, axios, postgresql

By
- henry: https://github.com/henry-rennell
- elmira: https://github.com/elmira1788
- Falko: https://github.com/FalkoKa 
- Jack: https://github.com/jrh1010101101010 

