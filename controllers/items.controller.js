var all = require("./data.controller.js").all;
var fuse = require("fuse.js");
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
  }
};
