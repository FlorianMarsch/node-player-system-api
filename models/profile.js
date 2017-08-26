var mongoose = require('mongoose');

module.exports = mongoose.model('Profile',{
	id: String,
	name: String,
	imageUrl: String,
	archivments: { type: [String], default: [] },
	twitterName: String,
	hashTag: String,
	updated: { type: Date, default: Date.now },
	npc: { type: Boolean, default: false}
});