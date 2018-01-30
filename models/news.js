var mongoose = require('mongoose');

module.exports = mongoose.model('News',{
	id: String,
	username: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
	time: String,
	message: String
});