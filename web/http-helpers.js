var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  
  var encoding = 'utf-8';

  // Priority 1: look in public and serve those files
  fs.readFile(archive.paths.siteAssets + asset, encoding, function (err, data) {
    if (err) {
      // Priority 2: look in archive and serve
      throw err;
    } else {
      
      exports.sendResponse(res, data);
    }
  });


};

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function (response, data, status) {
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(data);
};

exports.send404 = function (response) {
  exports.sendReponse(response, '404: File not found', 404);
};