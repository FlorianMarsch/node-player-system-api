var mongoose = require('mongoose');

var schema =  mongoose.model('News',{
	id: String,
	username: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
	time: String,
	message: String
});

var autoPopulate = function(next) {
    this.populate('username');
    next();
  };
  
schema.schema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

    module.exports = schema;