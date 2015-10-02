var mongoose = require('./_db.js');

var schema = new mongoose.Schema({ 
	owner:mongoose.Schema.Types.ObjectId, 
	title:String, 
	description:String,
	address:{ 
		fullAdress:String, 
		coor:{
           type:{ type:String },
           coordinates:[Number]
       }
	},
	pictures:[{ url:String }], 
	reservations:[mongoose.Schema.Types.ObjectId],
	active: Boolean
});

module.exports = mongoose.model('Apartments', schema);