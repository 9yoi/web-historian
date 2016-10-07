var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require ('./http-helpers');
var urlParser = require('url');

var actions = {
  'GET': function (req, res) {
    var path = urlParser.parse(req.url).pathname;
    //???? why is index.html === /
    if (path === '/') {
      path = '/index.html';
    }

    //helpers.serveAssets(res, path);
  
  },

  'POST': function (req, res) {

  }
};

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  // calls the relevant method in actions object
  if (action) {
    action(req, res);
  } else {
    helpers.send404(res);
  }
};
