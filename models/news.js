var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: String,
  username: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
  user: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
  
	time: Date,
	message: String
},{ strict: 'throw' });

var autoPopulate = function(next) {
  this.populate('user');
  this.populate('username');
    next();
  };

  var autoReduce = function(next) {
    if(this.user){
		  this.user = this.user._id;
    }
    if(this.username){
		  this.username = this.username._id;
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