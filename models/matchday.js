var mongoose = require('mongoose');

module.exports = mongoose.model('Matchday',{
	id: String,
	week: Number,
	processed: { type: Boolean, default: false },
	finals:  { type: Boolean, default: false },
	modus :{ type: String, default: "Divisional" , enum:["Divisional","Cup"]},
});

