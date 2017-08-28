var mongoose = require('mongoose');

module.exports = mongoose.model('Player',{
	id: String,
	comunioId : { type: Number, required:true , unique:true},
	name: { type: String, required:true, trim:true },
	imageUrl: { type: String, default: "http://dummyimage.com/400x400/fff/000" },
	profileUrl : String,
	position : { type: String, required:true, trim:true },
	points :{ type: Number, default: 0, min: 0 },
	price :{ type: Number, default: 160000, min: 160000 },
	owner : {
		id : { type: String, default: "59a18baddbe2ed1100b5e824" },
		name : { type: String, default: "Transfermarkt" }
	},
	updated: { type: Date, default: Date.now }
});