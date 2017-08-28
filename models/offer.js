var mongoose = require('mongoose');

module.exports = mongoose.model('Offer',{
	id: String,
	price :{ type: Number},
	status :{ type: String, default: "offen" , enum:["offen","akzeptiert","abgelehnt","widerrufen","vollzogen"]},
	to : {
		id : { type: String },
		name : { type: String }
	},
	from : {
		id : { type: String },
		name : { type: String }
	},
	player : {
		id : { type: String },
		name : { type: String }
	},
	updated: { type: Date, default: Date.now }
});