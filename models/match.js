var mongoose = require('mongoose');

module.exports = mongoose.model('Match',{
    id: String,
    matchday: {type: mongoose.Schema.ObjectId, ref: 'Matchday',required:true},
    guest: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
    home: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
	guestGoals: { type: Number, default: 0},
	homeGoals: { type: Number, default: 0}
});