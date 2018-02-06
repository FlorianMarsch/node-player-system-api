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

  var autoReduce = function(next) {
    if(this.players){
		this.players = this.players.map(function(element){return element._id});
	}
	if(this.lineUp){
		this.lineUp = this.lineUp.map(function(element){return element._id});
	}
	
    
    next();
  };
  
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('findOneAndUpdate', autoPopulate).
	pre('save', autoReduce);
	

	module.exports = mongoose.model('Squad',schema);