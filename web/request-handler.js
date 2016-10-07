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
    // send into helper function for flow
    helpers.serveAssets(res, path, function () {
      // this is the callback function for the case when nothing is found
      archive.isUrlInList(path, function (bool) {
        //is it still loading?
        if (bool) {
          helpers.sendRedirect(res, '/loading.html');
        } else {
          console.log('here');
          helpers.send404(res);
        }
      });
    });
  },

  'POST': function (req, res) {
    var path = urlParser.parse(req.url).pathname;
    archive.addUrlToList(path, function() {
      helpers.sendRedirect(res, '/loading.html');
    });
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
