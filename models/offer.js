var mongoose = require('mongoose');

module.exports = mongoose.model('Offer',{
	id: String,
	price :{ type: Number},
	status :{ type: String, default: "offen" , enum:["offen","akzeptiert","abgelehnt","widerrufen","vollzogen"]},
	to : {type: mongoose.Schema.ObjectId, ref: 'Profile' ,required:true},
	from : {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	player : {type: mongoose.Schema.ObjectId, ref: 'Player' ,required:true},
	updated: { type: Date, default: Date.now }
});