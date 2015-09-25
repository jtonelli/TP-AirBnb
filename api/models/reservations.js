var mongoose = require('_db.js');

var schema = new m.Schema({ 
	userId:mongoose.Schema.Types.ObjectId, 
	apartmentId:mongoose.Schema.Types.ObjectId,
	startDate:Date, 
	endDate:Date
});

module.exports = m.model('Reservations', schema);