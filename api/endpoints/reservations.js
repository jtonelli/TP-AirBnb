var express = require('express');
var router = express.Router();

var jwt = require('../helpers/token.js');

var models = require('../models');
var Reservations = models.reservations;

router.post('/', function(req, res) {
	//Agrego una reserva
	var r = new reservations(req.body);
	r.active = true;

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		//
		//deberia validar que este disponible esa fecha.
		//

		r.owner = decodedUser.id;

		//Grabo la reserva
		r.save(function (err) {
			if(err){
			  console.log('Error - ', err);
			  res.status(400).end();
			}
			else{
			  console.log(r);
			  res.status(201).end();
			}
		});
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

//reservas de un usuario
router.get('/:Id', function(req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		if(decodedUser.email == req.params.Id){

	        var query = { owner : decodedUser.id};

			Reservations.find(query, function(err, reservs){
				console.log('Reservas -getbyowner -', reservs);
				res.json(reservs);
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

//reservas por departamento
router.get('/',function(req,res){

	// Busqueda con filtro
	var query = {
		apartmentId: req.query.depto,
	};

	// Busqueda sin filtro
	Reservations.find(query, function(err, reservs){
		console.log('Reservas -getbyapartment -', reservs);
		res.json(reservs);
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
		var r;

		Reservations.findOne(query, function(err, reserv){
			console.log('Depto -getbyid -', reserv);
			r = reserv;
		});

		if(decodedUser.id == r.owner){
	        //Actualizo por esta OK
	        var update = req.body;

        	//Deberia desactivar y crear una reserva nueva??
        	//o solo actualizo la fecha??
	        Reservations.update(query, update, function(err, reserv){
				if(err){
					console.log('Error - ', err);
					res.status(400).end();
				}
				else{
					console.log(reserv);
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
		var r;

		Reservations.findOne(query, function(err, reserv){
			console.log('Depto -getbyid -', reserv);
			r = reserv;
		});

		if(decodedUser.id == a.owner){
	        //Actualizo por esta OK
	        var update = { active: false };

        	// habria que actualizar las reservations
	        Reservations.update(query, update, function(err, reserv){
	          if(err){
	            console.log('Error - ', err);
	            res.status(400).end();
	          }
	          else{
	            console.log(reserv);
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