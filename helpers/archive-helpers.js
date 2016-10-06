var fs = require('fs');
var path = require('path');
var http = require('http');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to nsuggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(sites) {
    cb(sites.indexOf(url) >= 0);
  }); 
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url, 'utf-8', function (err) {
    if (err) {
      throw err;
    }
  });
  exports.readListOfUrls(function(results) {
    cb(results);
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.stat(exports.paths.archivedSites + '/' + url, function (err, stats) {
    if (err) {
      cb(false);
    } else {
      cb(stats.isFile());
    }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    var fileName = exports.paths.archivedSites + '/' + url;
    var file = fs.createWriteStream(fileName);
    var request = http.get(url, function(response) {  
      console.log(response);
    //   response.pipe(file);
    //   file.on('finish', function () {
    //     file.close();
    //     console.log(file);
    //   });
    // }).on('error', function(err) {
    //   fs.unlink(fileName);
    });
  });
};
