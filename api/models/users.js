var mongoose = require('_db.js');

var schema = new mongoose.Schema({ 
	email:String,
	password:String
    fullname:String, 
    lastName:String, 
    active:Boolean,
    reservations:[mongoose.Schema.Types.ObjectId], 
    apartments:[mongoose.Schema.Types.ObjectId]
  });

module.exports = mongoose.model('User', userSchema);