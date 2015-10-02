var mongoose = require('./_db.js');

var schema = new mongoose.Schema({ 
	userId:mongoose.Schema.Types.ObjectId, 
	apartmentId:mongoose.Schema.Types.ObjectId,
	startDate:Date, 
	endDate:Date,
	active:Boolean
});

module.exports = mongoose.model('Reservations', schema);