var mongoose = require('mongoose');
var sandBox = 'mongodb://admin:admin@ds041581.mongolab.com:41581/tpairbnb';
var uri = process.env.CONNECTION || sandBox;

mongoose.connect(uri,function (err) {
	if(err){ 
		console.error('mongoose connection error'); 
	}else{
		console.log('conexión OK')
	}
});

module.exports = mongoose;