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

  var autoReduce = function(next) {
    if(this.member){
		this.member = this.member.map(function(element){return element._id});
	}
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('save',autoReduce);



module.exports = mongoose.model('Division',schema);