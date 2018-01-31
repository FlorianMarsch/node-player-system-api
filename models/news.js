var mongoose = require('mongoose');


var schema = mongoose.Schema({
	id: String,
	username: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
	time: Date,
	message: String
});

var autoPopulate = function(next) {
	this.populate('username');
    next();
  };

  var autoReduce = function(next) {
    if(this.username){
		this.username = this.username._id;
    }
    
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate).
	pre('save', autoReduce);


    module.exports = mongoose.model('News',schema);;