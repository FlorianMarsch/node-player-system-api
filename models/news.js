var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	time: Date,
	message:  {type: String, required:true}
},{ strict: 'throw' });

var autoPopulate = function(next) {
  this.populate('user');
    next();
  };

  var autoReduce = function(next) {
    this.time = Date.now();
    if(this.message ){
      this.message = this.message.trim();
      if(this.message === ""){
        this.message = null;
      }
    }
    
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate).
	pre('save', autoReduce);


    module.exports = mongoose.model('News',schema);