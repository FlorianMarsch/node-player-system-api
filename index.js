process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

var express = require('express');
var app = express();


var News = require('./models/news');

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
	
	app.get("/api/news", function(request, response) {
		response.header("Content-Type", "application/json");
		 News.find(function(err, news) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(news);
	         }
	     });
	});
	
	app.post("/api/news", function(request, response) {
		
		response.header("Content-Type", "application/json");
		if(!request.body){
			response.status(400).send("{'message': 'Bad Request'}");
			return;
		}
		
		var payload = request.body;
		if(!payload.username || !payload.message){
			response.status(400).send("{'message': 'Bad Request'}");
			return;
		}
		payload.time = new Date().toISOString();
		
		new News(payload).save(function(err) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(news);
	         }
	     });
	});
	
	
	var port =(process.env.PORT || 5000);
	
	app.listen(port, function() {
	  console.log('Node app is running on port', port);
	});
});

