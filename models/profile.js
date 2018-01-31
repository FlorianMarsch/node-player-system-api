var mongoose = require('mongoose');

module.exports = mongoose.model('Profile',{
	id: String,
	name: { type: String, default: null },
	imageUrl: { type: String, default: "http://dummyimage.com/400x400/fff/000" },
	archivments: { type: [String], default: [] },
	twitterName: { type: String, default: null },
	hashTag: { type: String, default: null , uppercase:true},
	updated: { type: Date, default: Date.now },
	npc: { type: Boolean, default: false}
});