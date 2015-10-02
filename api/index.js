var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.PORT || 3000;

var endpoints = require('./endpoints');

var app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(endpoints);

app.listen(port,function(){
	console.log('running on',port);
})