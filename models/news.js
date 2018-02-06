var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	time: Date,
	message: String
},{ strict: 'throw' });

var autoPopulate = function(next) {
  this.populate('user');
    next();
  };

  var autoReduce = function(next) {
    this.time = Date.now();
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate).
	pre('save', autoReduce);


    module.exports = mongoose.model('News',schema);