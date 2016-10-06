var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require ('./http-helpers');

// require more modules/folders here!
exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {  
    // save url
    var url = req.url;
    // if url is in sites.txt
    
      // serve up static site from sites directory

    // if not return 404


    res.writeHead(200, helpers.headers);
    fs.readFile('web/public/index.html', 'utf-8', function (err, data) {
      if (err) {
        throw err;
      } else {
        //res.write(data);
        res.end(data);
      }
    });
  } 
};

// exports.handleRequest = function (req, res) {
//   if (req.method === 'GET') {  
//     res.writeHead(200, http.headers);
//     fs.readFile('web/public/index.html', 'utf-8', function (err, data) {
//       if (err) {
//         throw err;
//       } else {
//         //res.write(data);
//         res.end(data);
//       }
//     });
//   } 
// };

