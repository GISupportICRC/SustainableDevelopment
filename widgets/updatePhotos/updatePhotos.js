/**
  * Update features POSTing to ArcGIS Server.
  * 
  * The following class works in both AGOL and your own ArcGIS Server
  * 
  * @constructor
  *
  * @param {string} 
  *   POST type: options => 'update'
  * @param {object} 
  *   Parameters
  * @param {string} 
  *   Server url 
   */
define([
    'dojo/_base/declare',
    'dojo/_base/lang'
  ], function(declare, lang){
    var clazz = declare(null, {

    _mode: null,
    _params: null,
    _url: null,
     
    constructor: function(options){
        if(options.mode == "update"){
          this._mode = "/updateFeatures"
        } else{
          console.log('error')
        }

        this._params = JSON.stringify(options.features);
        this._url = options.url;
    },

    esriPOST: function(){
		var updateparams = "features=" + this._params + "&f=json";
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
            
            if (httpResponseFirstKey == 'addResults' || httpResponseFirstKey == 'updateResults' || httpResponseFirstKey == 'deleteResults') {
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
                    alert ("Error: " + httpResponse[httpResponseFirstKey][0].error.description + " Please report to gisupport@icrc.org.");
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
                alert ("Error: " + httpResponse[httpResponseFirstKey].message + " " + listDetails(httpResponse[httpResponseFirstKey].details) + " Please report to gisupport@icrc.org.");
                alerted.alert ='yes';
            }
        }
    }
  
    });
    return clazz;
  });