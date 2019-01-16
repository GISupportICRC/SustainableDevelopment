define([
  'jimu/BaseWidget',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/request',
  './updatePhotos',
  'jimu/LayerInfos/LayerInfos'
  ],
function(
  BaseWidget,
  declare, lang, esriRequest,
  updatePhotos,
  LayerInfos) {

    return declare([BaseWidget], {

    layer: null,

    startup: function(){
      this.inherited(arguments);
      this.getWebMapLayer();
    },

    getWebMapLayer: function(){
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function(layerInfosObj) {
          var info = layerInfosObj._finalLayerInfos;
          for(i in info){
            if(info[i].layerObject.url == this.appConfig.projectLayerUrl){
              this.layer = layerInfosObj.getLayerInfoById(info[i].layerObject.id).layerObject
              this.getOids();
            }
          } 
        }))
    },

    getOids: function(){
      var string = "/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=objectid&returnGeometry=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson";

      var layersRequest = esriRequest({
        url: this.appConfig.projectLayerUrl + string.slice(0, -7),
        content: { f: "json" },
        handleAs: "json",
        callbackParamName: "callback"
      })
      layersRequest.then(
        lang.hitch(this, function(results){
            var oidArray = [];
            for (i in results.features){
                oidArray.push(results.features[i].attributes.objectid);
            }  
          this.getAttachments(oidArray);
        }))
    },

    getAttachments: function(oids){
      var array = oids;
      for(var i = 0; i < array.length; i++){
        this.layer.queryAttachmentInfos(array[i], lang.hitch(this, function(results){
          if(results.length != 0){
            this.updatePhotos(results);
          }
        }))
      } 
    },

    updatePhotos: function(results){
 
       new updatePhotos({
        mode: 'update', //options: 'update'
        features: {"attributes": { "OBJECTID": results[0].objectId,
                                   "popUpImage"  : "<img src='" + results[0].url + "' alt=''>"
                                 }},
        url: this.appConfig.projectLayerUrl
      }).esriPOST()
    }
});
});