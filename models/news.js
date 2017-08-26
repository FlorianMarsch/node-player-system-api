var mongoose = require('mongoose');

module.exports = mongoose.model('News',{
	id: String,
	username: String,
	time: String,
	message: String
});