var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('h676E9pPBCkKwOIHT1Dtag');

// var message = {
// 	    "html": "Hola usuario:"+req.user,
// 	    "subject": "Bienvenido",
// 	    "from_email": "message.from_email@example.com",
// 	    "from_name": "Example Name",
// 	    "to": [{
// 	            "email": req.user.email
// 	        }]
// 	};

var sendMessage = function (argument) {
	mandrill_client.messages.send({"message": message}, function(result){
	    return result;  
	},function(e) {
	    // console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message)
	    return {
	    	error: true,
	    	name: e.name,
	    	message: e.message
	    }
	});
}

module.exports.sendMessage = sendMessage;