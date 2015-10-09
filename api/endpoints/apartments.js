var express = require('express');
var router = express.Router();

var jwt = require('../helpers/token.js');

var models = require('../models');
var Apartments = models.apartments;

// var User = require('../models/users');

var cloudinary = require('../helpers/cloudinary');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'uploads/' });

router.post('/', multipartMiddleware, function(req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		console.log('=============================')
		console.log(req.body.apartment);
		console.log('=============================')

		//Creo un departamento
		var a = new Apartments(JSON.parse(req.body.apartment));
		a.active = true;
		a.owner = decodedUser.id;

		console.log(JSON.stringify(a))
		console.log('=============================')

		// Grabo el departameto
		a.save(function (err) {
			console.log('save 1 =======================')
			if(err){
			  console.log('Error - ', err);
			  res.status(400).json({resultado:'Error'});
			}
			else{
			  	// console.log(a);
			  	// res.status(200).json({resultado:'todo ok'});
				var imagePath;
				var i;

				function uploader(i) {
					if( i < req.files.uploadfile.length ) {
						imagePath = req.files.uploadfile[i].path;
						cloudinary.uploader.upload(imagePath, function(result) { 
						  	// console.log(result.public_id);
						  	// console.log(result);
						  	console.log('picture add', result.url);
						  	a.pictures.push({url: result.url});
							// console.log('picture upload');
							// console.log(a.pictures);
							uploader(i+1)
						});
						// haceAlgo(i, function(queHizo){
						//    console.log('terminó de hacer ' + queHizo);
						//    uploader(i+1)
						// }); 
						// uploader(i+1)
					} else{
						a.save(function (err) {
							console.log('save 2 =======================')
							if(err){
							  console.log('Error - ', err);
							  res.status(400).json({resultado:'Error'});
							}
							else{
								console.log('apartments');
							  	console.log(a);
							  	res.status(200).json({resultado:'todo ok'});
							}
						});
					}
				}

				uploader(0);

				// for (i = 0; i < req.files.uploadfile.length; i++) {
				// 	imagePath = req.files.uploadfile[i].path;
				// 	cloudinary.uploader.upload(imagePath, function(result) { 
				// 	  	// console.log(result.public_id);
				// 	  	// console.log(result);
				// 	  	console.log('picture add', result.url);
				// 	  	a.pictures.push({url: result.url});
				// 		console.log('picture upload');
				// 		console.log(a.pictures);
				// 	});
				// };
			}
		});

		// console.log(req.files.uploadfile[0].path);
		// res.status(200).json({resultado:'todo ok'});
		// console.log('save');
		// console.log(a);
		// res.status(400).json({resultado:'error'});
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

// router.post('/', multipartMiddleware, function(req, res) {

// 	try{
// 		var decodedUser =  jwt.decode(req.headers.authorization);
// 	}catch(e){
// 		res.status(400).json({error:'invalid token'})
// 	}

// 	if(decodedUser.id){

// 		//Creo un departamento
// 		var a = new Apartments(JSON.parse(req.body.apartment));
// 		a.active = true;
// 		a.owner = decodedUser.id;

// 		var imagePath;
// 		var i;

// 		for (i = 0; i < req.files.uploadfile.length; i++) {
// 			imagePath = req.files.uploadfile[i].path;
// 			cloudinary.uploader.upload(imagePath, function(result) { 
// 			  	// console.log(result.public_id);
// 			  	// console.log(result);
// 			  	console.log('picture add', result.url);
// 			  	a.pictures.push({url: result.url});
// 				console.log('picture upload');
// 				console.log(a.pictures);
// 			});
// 		};

// 		// console.log(req.files.uploadfile[0].path);
// 		// res.status(200).json({resultado:'todo ok'});

// 		console.log('save');
// 		console.log(a);
// 		// res.status(400).json({resultado:'error'});

// 		// Grabo el departameto
// 		// a.save(function (err) {
// 		// 	if(err){
// 		// 	  console.log('Error - ', err);
// 		// 	  res.status(400).json({resultado:'Error'});
// 		// 	}
// 		// 	else{
// 		// 	  console.log(a);
// 		// 	  res.status(200).json({resultado:'todo ok'});
// 		// 	}
// 		// });
// 	}
// 	else{
// 		res.status(400).json({error:'invalid user'});
// 	}
// });

//departamentos de un usuario
router.get('/myApartments', function(req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

        var query = { owner : decodedUser.id};

		Apartments.find(query, function(err, aparts){
			console.log('Depto -getbyowner -', aparts);
			res.json(aparts);
		});
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

//departamentos por filtros
router.get('/',function(req,res){

	// Busqueda con filtro
	// var query = {
	// 	filtro1: req.query.filtro1,
	// 	filtro2: req.query.filtro2
	// };

	// Busqueda sin filtro
	Apartments.find(function(err, aparts){
		console.log('aparts -get-', aparts);
		res.json(aparts);
	});
});

//multipartMiddleware
router.put('/:Id', function(req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		//Obtener Owner del Deptop por el req.params.Id
		var query = { _id : req.params.id};
		var a;

		Apartments.findOne(query, function(err, apart){
			console.log('Depto -getbyid -', apart);
			a = apart;
		});

		if(decodedUser.id == a.owner){
	        //Actualizo por esta OK
	        var update = req.body;

	        Apartments.update(query, update, function(err, apart){
				if(err){
					console.log('Error - ', err);
					res.status(400).end();
				}
				else{
					console.log(apart);
					res.status(201).end();
				}
	        });
	    }
	    else{
			res.status(400).json({error:'no tiene permisos'});
		}
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

router.delete('/:Id', function (req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		//Obtener Owner del Deptop por el req.params.Id
		var query = { _id : req.params.id};
		var a;

		Apartments.findOne(query, function(err, apart){
			console.log('Depto -getbyid -', apart);
			a = apart;
		});

		if(decodedUser.id == a.owner){
	        //Actualizo por esta OK
	        var update = { active: false };

        	// habria que actualizar las reservations
	        Apartments.update(query, update, function(err, apart){
	          if(err){
	            console.log('Error - ', err);
	            res.status(400).end();
	          }
	          else{
	            console.log(apart);
	            res.status(201).end();
	          }
	        });
	    }
	    else{
			res.status(400).json({error:'no tiene permisos'});
		}
	}
	else{
		res.status(400).json({error:'invalid user'});
	}

});

module.exports = router;