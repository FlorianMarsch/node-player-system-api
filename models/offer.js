var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	id: String,
	price :{ type: Number},
	status :{ type: String, default: "offen" , enum:["offen","akzeptiert","abgelehnt","widerrufen","vollzogen"]},
	to : {type: mongoose.Schema.ObjectId, ref: 'Profile' ,required:true},
	from : {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	player : {type: mongoose.Schema.ObjectId, ref: 'Player' ,required:true},
	updated: { type: Date, default: Date.now }
});


var autoPopulate = function(next) {
	this.populate('to');
	this.populate('from');
	this.populate('player');
    next();
  };

  var autoReduce = function(next) {
    if(this.to){
		this.to = this.to._id;
	}
	if(this.from){
		this.from = this.from._id;
	}
	if(this.player){
		this.player = this.player._id;
    }
    
    next();
  };
  
schema.
    pre('findOne', autoPopulate).
	pre('find', autoPopulate).
	pre('save', autoReduce);
	


	module.exports = mongoose.model('Offer',schema);