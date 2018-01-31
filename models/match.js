var mongoose = require('mongoose');

 var schema = mongoose.model('Match',{
    id: String,
    matchday: {type: mongoose.Schema.ObjectId, ref: 'Matchday',required:true},
    guest: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
    home: {type: mongoose.Schema.ObjectId, ref: 'Profile',required:true},
	guestGoals: { type: Number, default: 0},
	homeGoals: { type: Number, default: 0}
});


var autoPopulate = function(next) {
    this.populate('matchday');
    this.populate('guest');
    this.populate('home');
    next();
  };
  
schema.schema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);


module.exports = schema;