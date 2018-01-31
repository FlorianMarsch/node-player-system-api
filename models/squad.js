var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	id: String,
	players :{ type: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }], default: [] },
	lineUp :{ type: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }], default: [] },
	money :{ type: Number, default: 40000000 },
	ownerId : {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	updated: { type: Date, default: Date.now }
});

var autoPopulate = function(next) {
	this.populate('players');
	this.populate('lineUp');
	this.populate('ownerId');
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate);
	

	module.exports = mongoose.model('Squad',schema);