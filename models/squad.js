var mongoose = require('mongoose');

module.exports = mongoose.model('Squad',{
	id: String,
	players :{ type: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }], default: [] },
	lineUp :{ type: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }], default: [] },
	money :{ type: Number, default: 40000000 },
	ownerId : {type: mongoose.Schema.ObjectId, ref: 'Profile' , required:true},
	updated: { type: Date, default: Date.now }
});