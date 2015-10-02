var express = require('express');
var router = express.Router();

var jwt = require('../helpers/token.js');

var models = require('../models');
var Apartments = models.apartments;

// var User = require('../models/users');

router.post('/', function(req, res) {
	//Creo un departamento
	var a = new apartments(req.body);
	a.active = true;

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		a.owner = decodedUser.id;

		//Grabo el departameto
		a.save(function (err) {
			if(err){
			  console.log('Error - ', err);
			  res.status(400).end();
			}
			else{
			  console.log(a);
			  res.status(201).end();
			}
		});
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

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