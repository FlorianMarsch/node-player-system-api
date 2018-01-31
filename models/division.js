var mongoose = require('mongoose');

var schema = mongoose.Schema({
	id: String,
	name: String,
	description: String,
	icon: String,
	
	member :{ type: [{ type: mongoose.Schema.ObjectId, ref: 'Profile' }], default: [] }
    
});
var autoPopulate = function(next) {
    this.populate('member');
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);



module.exports = mongoose.model('Division',schema);