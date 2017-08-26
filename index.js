process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Profile = require('./models/profile');

var config = {'url' : 'mongodb://localhost/test'};
if(process.env.MONGODB_URI){
	config.url = process.env.MONGODB_URI;
}
var mongoose = require('mongoose');
mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
	console.log("connected");
});
	app.get("/api/profile", function(request, response) {
		response.header("Content-Type", "application/json");
		 Profile.find(function(err, news) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(news);
	         }
	     });
	});
	
	app.get("/api/profile/:id", function(request, response) {
		 var id = request.params.id;
		response.header("Content-Type", "application/json");
		 Profile.findById(id, function(err, profile) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(profile);
	         }
	     });
	});
	
	app.post("/api/profile/", function(request, response) {
		
		response.header("Content-Type", "application/json");
		if(!request.body){
			response.status(400).send("{'message': 'Bad Request'}");
			return;
		}
		
		var payload = request.body;
		new Profile(payload).save(function(err) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(payload);
	         }
	     });
	});
	
	app.post("/api/profile/:id", function(request, response) {
		var id = request.params.id;
		response.header("Content-Type", "application/json");
		if(!request.body){
			response.status(400).send("{'message': 'Bad Request'}");
			return;
		}
		
		var payload = request.body;
		Profile.findByIdAndUpdate(id, payload,function(err) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(payload);
	         }
	     });
	});
	
	app.delete("/api/profile/:id", function(request, response) {
		var id = request.params.id;
		response.header("Content-Type", "application/json");
		Profile.findByIdAndRemove(id, payload,function(err) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send("{'message': 'Done'}");
	         }
	     });
	});
	
	
	var port =(process.env.PORT || 5000);
	
	app.listen(port, function() {
	  console.log('Node app is running on port', port);
	});


