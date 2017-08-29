var mongoose = require('mongoose');

module.exports = mongoose.model('Squad',{
	id: String,
	players :{ type: [mongoose.Schema.Types.ObjectId],ref: 'Player', default: [] },
	money :{ type: Number, default: 40000000 },
	ownerId : String,
	updated: { type: Date, default: Date.now }
});