process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Player = require('./models/player');

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


app.get("/ping", function(request, response) {
	response.header("Content-Type", "application/json");
	response.status(200).send("{'message': 'PONG'}");      
});
var  minutely =  parseInt((process.env.POLL_TIME || 60*1*1000));
var localhost = (process.env.LOCALHOST || "localhost:5000");
var keepAlive = function() {
	request("http://"+localhost+"/ping",function (error, response, body) {
		// do nothing;
	}).on('error', function(error){
		console.log(error);
	});
};
setInterval(keepAlive, minutely);

var redis = require("redis");
var subscriber  = redis.createClient(process.env.REDIS_URL);
subscriber.subscribe("currentPlayers");
subscriber.on("message", function(channel, message) {
	 if(channel==="currentPlayers"){
		  var payload = JSON.parse(message);
		  payload.map(function(element){
			  return  {
				  comunioId : element.id,
				  name: element.name,
				  imageUrl:element.picture,
				  profileUrl: element.url,
				  position:element.position,
				  points:element.points,
				  price:element.price
			  };
		  }).forEach(function(element) {
			  Player.findOneAndUpdate({comunioId: element.comunioId}, element,{upsert:true},
					  function(err) {
		         if(err){
		        	 	console.log("{'message': 'This is an error!'}");
		         }else{
		        	 	console.log("update :", element);
		         }
		     });
		  });
	 }
});

	app.get("/api/player", function(request, response) {
		response.header("Content-Type", "application/json");
		Player.find(function(err, player) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(news);
	         }
	     });
	});
	
	
	app.get("/api/player/:id", function(request, response) {
		 var id = request.params.id;
		response.header("Content-Type", "application/json");
		Player.findById(id, function(err, player) {
	         if(err){
	        	 	response.status(500).send("{'message': 'This is an error!'}");
	         }else{
	        	 	response.status(200).send(player);
	         }
	     });
	});
	
	

	
	var port =(process.env.PORT || 5000);
	
	app.listen(port, function() {
	  console.log('Node app is running on port', port);
	});


