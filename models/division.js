var mongoose = require('mongoose');

module.exports = mongoose.model('Division',{
	id: String,
	name: String,
	description: String,
    icon: String
    
});