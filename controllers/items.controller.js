var all = require("./data.controller.js").all;
var fuse = require("fuse.js");
var request = require('request');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCOCwnNxnjm35U24CFKZYMH8akAhBxpqSI'
});
var options = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "subtitle"
  ]
};
module.exports = {
  search: function(req, res, next){
    var search = req.params.info;
    var searchAll = new fuse(all, options);
    var result = searchAll.search(search);
    var obj = {
      array: result
    };
    res.json(obj);
  },
  get: function(req, res, next){
    var search = req.params.info;
    var obj = {
      array: require("./data.controller.js")[search]
    };
    res.json(obj);
  },
  price: function(req, res, next){
    var images = req.params.info.split("-");
    var items =  require("./data.controller.js").all;
    var selectedItems = [];
    for(var x = 0; x < items.length; x++){
      for(var y = 0; y < images.length; y++){
        if(items[x].image == images[y]){
          selectedItems.push(items[x]);
          if(Math.random() > 0.5){
            console.log("old price - " + selectedItems[selectedItems.length - 1].price);
            selectedItems[selectedItems.length - 1].price = selectedItems[selectedItems.length - 1].price - Math.floor(Math.random()*selectedItems[selectedItems.length - 1].price*0.1);
            console.log("new price - " + selectedItems[selectedItems.length - 1].price);
          }
        }
      }
    }
    res.json({array: selectedItems});
  },
  getRoute: function(req, res, next){
    var distance = function (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
  };
    var shops =  require("./data.controller.js").shops;
    var info = req.params.info;
    var lat = info.split("-")[0].split(",")[0];
    var lon = info.split("-")[0].split(",")[1];
    var images = info.split("-").slice(1, info.split("-").length);
    var availableShops = [];
    for(var x = 0; x < images.length; x++){
      for(var y = 0; y < shops.length; y++){
        for(var z = 0; z < shops[y].items.length; z++){
          if(shops[y].items[z].image == images[x]){
            availableShops.push(shops[y]);
          }
        }
      }
    }

    /*request('https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&mode=transit&key=AIzaSyCOCwnNxnjm35U24CFKZYMH8akAhBxpqSI', function (error, res, body) {
      if (!error && res.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
      }
    });*/
  }
};
