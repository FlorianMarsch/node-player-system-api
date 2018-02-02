var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: String,
  username: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
  _user: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
  
	time: Date,
	message: String
});

var autoPopulate = function(next) {
	this.populate('_user');
    next();
  };

  var autoReduce = function(next) {
    if(this._user){
		  this._user = this._user._id;
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