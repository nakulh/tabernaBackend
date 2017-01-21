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
  getRoute2: function(req, res, next){
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
    var shops =  require("./data.controller.js").shops;
    console.log("shop len = " + shops.length);
    var info = req.params.info;
    var lat = info.split("-")[0].split(",")[0];
    var lon = info.split("-")[0].split(",")[1];
    var images = info.split("-").slice(1, info.split("-").length);
    console.log(images);
    console.log(lat + "," + lon);
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
    shops = [];
    var nofshops = Math.floor(Math.random()*images.length);
    availableShops = shuffle(availableShops);
    for(var r = 0; r < nofshops; r++){
      availableShops[r].items = [];
      shops.push(availableShops[r]);
    }
    res.json(shops);
  },
  getRoute: function(req, res, next){
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
    var shops =  require("./data.controller.js").shops;
    console.log("shop len = " + shops.length);
    var info = req.params.info;
    var lat = info.split("-")[0].split(",")[0];
    var lon = info.split("-")[0].split(",")[1];
    var images = info.split("-").slice(1, info.split("-").length);
    console.log(images);
    console.log(lat + "," + lon);
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
    shops = [];
    var nofshops = Math.floor(Math.random()*images.length);
    availableShops = shuffle(availableShops);
    for(var r = 0; r < nofshops; r++){
      availableShops[r].items = [];
      shops.push(availableShops[r]);
    }
    res.json(shops);
  }
};
