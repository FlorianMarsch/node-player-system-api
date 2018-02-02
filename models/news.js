var mongoose = require('mongoose');
var Profile = require('./profile');

var schema = mongoose.Schema({
  id: String,
  username: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
  user: [Profile],
  
	time: Date,
	message: String
});

var autoPopulate = function(next) {
	this.populate('user');
    next();
  };

  var autoReduce = function(next) {
    if(this.user){
		  this.user = this.user._id;
    }
    this.time = Date.now();
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate).
	pre('save', autoReduce);


    module.exports = mongoose.model('News',schema);