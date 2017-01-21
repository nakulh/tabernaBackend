var all = require("./data.controller.js").all;
var fuse = require("fuse.js");
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
    /*var info = req.params.info;
    var lat = info.split("-")[0].split(",")[0];
    var lon = info.split("-")[0].split(",")[1];*/
    googleMapsClient.directions({
      origin: '23.8151944,86.4415461',
      destination: '23.8107966,86.4464778'
    }, function(err, response) {
      if (!err) {
        console.log(response.json.results);
      }
    });
  }
};
