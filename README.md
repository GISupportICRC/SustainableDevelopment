# Sustainable Development WAB 2.8 App :seedling: [live demo](https://gisupporticrc.github.io/SustainableDevelopment/)

The atlas catalogues sustainability initiatives implemented around the world by different humanitarian organisations. 
The sustainability initiatives are colour coded by themes: social (yellow), environmental (green) and economic (blue). 
The aim of the atlas is to make these initiatives more visible and to encourage sharing of sustainability best practices among 
humanitarian organisations.

![.](https://icrc.maps.arcgis.com/sharing/rest/content/items/096ea39896894ff2b47f745f2e0cb23c/data)

## Custom Widgets

### ICRCFilterSustainableDevelopment

Filtering WebMap Layer using [Dojo Select](https://dojotoolkit.org/reference-guide/1.10/dijit/form/Select.html) and [Bootstrap Toggle](http://www.bootstraptoggle.com/)

![.](https://icrc.maps.arcgis.com/sharing/rest/content/items/26f999f7241b43d3a8a59f23a79cf6dc/data)

### UpdatePhotos (Off-panel)

By default, ArcGIS Online and Web App Builder are not prepared to show the attachments as a picture in the popups. We develop a solution 
for solve the problem. Using a get method for fetch the attachments from the server, we post these attachments updating the pictures as a 
'img' html tag in a new string field, this way, the browser can interpret the string as a picture. 
This off-panel widget executes the update at 'startup'.

***
