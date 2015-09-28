var jwt = require('jwt-simple');
var secret = process.env.SECRETPASS || 'Ju4n17one$';

var encode = function (tokenPayload) {
	return jwt.encode(tokenPayload, secret)
}

var decode = function (token) {
	return jwt.decode(token, secret);
}

module.exports.encode = encode;
module.exports.decode = decode;