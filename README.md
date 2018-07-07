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

By default, ArcGIS Online and Web App Builder are not prepared to show the attachments as a picture in the popups. We developed a solution 
for solve the problem. Using a get method for fetch the attachments from the server, we post these attachments updating the pictures as a 
'img' html tag in a new string field, this way, the browser can interpret the string as a picture. 
This off-panel widget executes the update at 'startup'.

Use the following Dojo class to post against the server:

```
/**
  * Add or update features POSTing to ArcGIS Server.
  * 
  * The following class works in both AGOL and your own ArcGIS Server
  * 
  * @constructor
  *
  * @param {string} 
  *   POST type: options => 'update' or 'add'
  * @param {object} 
  *   Parameters
  * @param {string} 
  *   Server url 
   */

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'esri/request',
    'jimu/dijit/Message'
  ], function(declare, lang, esriRequest, Message){
    var clazz = declare(null, {

    _mode: null,
    _params: null,
    _url: null,
     
    constructor: function(options){
        if(options.mode == "add"){
          this._mode = "/addFeatures"
        } else if(options.mode == "update"){
          this._mode = "/updateFeatures"
        } else{
          new Message({
            message: 'Please choose one of the following options: "add", "update" or "delete"'
          });
        } 

        this._params = options.features;
        this._url = options.url;
    },

    esriPOST: function(){
		  var updateparams = "features=" + JSON.stringify(this._params) + "&f=json";
		  var http;
		  if(window.XMLHttpRequest){
		    http = new XMLHttpRequest();
		  }
		  else{
		    http = new ActiveXObject("Msxml2.XMLHTTP");
		  }
		  http.open("POST", this._url + this._mode, true);
		  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		  http.onreadystatechange = lang.hitch(this, function(){
		    if(http.readyState == 4 && http.status == 200) {
		      console.log(http.responseText);
		      this.responseAct(http.responseText,'update');
		    }
		  });
		  http.send(updateparams);
	  },


    responseAct: function(httpResponseText,action){
        var alerted  = {"alert":""};
        if (alerted != 'yes') {
            var httpResponse = JSON.parse(httpResponseText);
            var httpResponseKeys = Object.keys(httpResponse);
            var httpResponseFirstKey = httpResponseKeys[0];
            
            if (httpResponseFirstKey == 'addResults' || httpResponseFirstKey == 'updateResults' || httpResponseFirstKey == 
              'deleteResults') {
                if (httpResponse[httpResponseFirstKey][0].success === true){
                    switch (action) {
                        case 'add':
                            //alert ("Item " + httpResponse[httpResponseFirstKey][0].objectId + " added");
                            break;
                        case 'update':
                            //alert ("Item " + httpResponse[httpResponseFirstKey][0].objectId + " updated");
                            break;
                        case 'delete':
                            //alert ("Item " + httpResponse[httpResponseFirstKey][0].objectId + " deleted");
                            break;
                    }
                    alerted.alert ='yes';
                    /* location.reload(); */
                }
                else {
                    alert ("Error: " + httpResponse[httpResponseFirstKey][0].error.description + " Please report to    
                      gisupport@icrc.org.");
                    alerted.alert ='yes';
                }
            } else if (httpResponseFirstKey == 'error') {
                function listDetails(details) {
                    detailsText = '';
                    for (var i=0; i<details.length; i++) {
                        detailsText += details[i];
                    }
                    return detailsText;
                }
                alert ("Error: " + httpResponse[httpResponseFirstKey].message + " " +            
                  listDetails(httpResponse[httpResponseFirstKey].details) + " Please report to gisupport@icrc.org.");
                alerted.alert ='yes';
            }
        }
     }
    });
    return clazz;
  });
```

***
