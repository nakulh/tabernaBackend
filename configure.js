var path = require('path'),
    routes = require('./router'),
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    errorHandler = require('errorhandler');
    methodOverride = require('method-override'),
    //moment = require('moment');

module.exports = function(app){
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended': true}));
  app.use(methodOverride());
  routes(app);//move routes to route folder
  app.use('/public/', express.static(path.join(__dirname, './public')));
  if('development'=== app.get('env')){
    app.use(errorHandler());
  }
  return app;
};
