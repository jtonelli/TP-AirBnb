var express = require('express');
var router = express.Router();

var jwt = require('./helpers/token');

var models = require('./models');
var User = models.users();

// router.get('/:id',function(req,res){
// 	res.json({nombre:'el usuario'})
// });

// router.get('/', function (req,res){
// 	res.json({nombre:'el usuario'})
// });

router.post('/', function (req, res) {
  //Creo un usuario
  var u = new User(req.body);

  //Grabo el usuario
  u.save(function (err) {
    if(err){
      console.log('Error - ', err);
      res.status(400).end();
    }
    else{
      console.log(u);
      res.status(201).end();
    }
    // saved!
  });
});

router.get('/:Id', function (req, res) {
  // Busqueda con filtro
  var query = {email: req.params.Id}
  User.findOne(query, function(err, user){
    console.log('Usuario', user);
    res.json(user);
  });
});

router.get('/', function (req, res) {
  // Busqueda sin filtro
  User.find(function(err, users){
    console.log('Usuario', users);
    res.json(users);
  });
});

router.get('/me', function (req, res) {
  	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'});
	}

	if(decodedUser.id){

		var query = { 
			_id : decodedUser.id
		};

		User.findOne(query, function(err, user){
			console.log('Usuario', user);
			res.json(user);
		});
	}
	else{
		res.status(400).json({error:'invalid user'});
	}
});

router.get('/auth/', function (req, res) {

	// Busqueda con filtro
	var query = {
			email: req.query.email,
			password: req.query.password
		};

	usersModel.findOne(query, function(err, user){
		if(err){
				console.log('Error - ', err);
				res.status(400).end();
		}
		else{
			if(!user){
				console.log('email o password erroneos');
				res.status(401).json({error:'email o password erroneos'});
				// res.status(401).end();
			}
			else{
				var tokenPayload = {
					id:user._id,
					email: user.email
				}
			
				res.json({
					token:jwt.encode(tokenPayload)
				});
			}
		}
	});
});

});

router.put('/:Id', function (req, res) {

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		if(decodedUser.email == req.params.Id){
	        //Actualizo por esta OK
	        query = { _id : decodedUser.id};
	        var update = req.body;

	        User.update(query, update, function(err, userupd){
	          if(err){
	            console.log('Error - ', err);
	            res.status(400).end();
	          }
	          else{
	            console.log(userupd);
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
  // Remove con filtro
  // var query = {email: req.params.userId}
  // User.remove(query, function(err, user){
  //   if(err){
  //     console.log('Error - ', err);
  //     res.status(400).end();
  //   }
  //   else{
  //     console.log(user);
  //     res.status(201).end();
  //   }
  // });

	try{
		var decodedUser =  jwt.decode(req.headers.authorization);
	}catch(e){
		res.status(400).json({error:'invalid token'})
	}

	if(decodedUser.id){

		if(decodedUser.email == req.params.Id){
	        //Actualizo por esta OK
	        query = { _id : decodedUser.id};
	        var update = { active: false };

        	// habria que actualizar los apartments & reservations

	        User.update(query, update, function(err, userupd){
	          if(err){
	            console.log('Error - ', err);
	            res.status(400).end();
	          }
	          else{
	            console.log(userupd);
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