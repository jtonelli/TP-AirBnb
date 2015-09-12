var request = require('request');
var https = require("https");
var express = require('express'),
    cors = require('cors');

var app = express();
var appReq = express();

appReq.use(cors());
app.use(cors());

appReq.get('/meliProxy', function (req, res) {
  // console.log(req.query.q)
  var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q + '&limit=10';

  request.get(url, function (err, resMeli, body) {
      if (!err) {
          var resultsObj = JSON.parse(body);
          //Just an example of how to access properties:
          res.json(resultsObj);
      }
  });
});

app.get('/meliProxy', function (req, res) {
  // console.log(req.query.q)
	var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q + '&limit=1';
	var body = '';

	https.get(url, function(resMeli) {
  		// console.log("Got response: " + res.statusCode);
  		resMeli.on("data", function(d) {
			// res.json(d.toString());
			 body += d;
		});
		resMeli.on('end', function() {
    		res.json(body.toString());
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
});

var server = app.listen(8045, function () {
  // Escuchar puerto 8045
});

var serverReq = appReq.listen(8054, function () {
  // Escuchar puerto 8054
});