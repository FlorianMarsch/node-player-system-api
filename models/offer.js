var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	id: String,
	price :{ type: Number},
	status :{ type: String, default: "offen" , enum:["offen","akzeptiert","abgelehnt","widerrufen","vollzogen"]},
	to : {type: mongoose.Schema.ObjectId, ref: 'Profile' ,required:true},
	from : {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	player : {type: mongoose.Schema.ObjectId, ref: 'Player' ,required:true},
	players : {type:[{type: mongoose.Schema.ObjectId, ref: 'Player' }], default: [] },
	updated: { type: Date, default: Date.now }
});


var autoPopulate = function(next) {
	this.populate('to');
	this.populate('from');
	this.populate('player');
	this.populate('players');
    next();
  };

  var autoReduce = function(next) {
    if(this.players){
			this.players = this.players.map(function(element){return element._id});
		}
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('save', autoReduce);
	


	module.exports = mongoose.model('Offer',schema);