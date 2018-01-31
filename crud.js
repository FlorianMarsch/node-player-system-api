

module.exports = function(app, type, root){

	console.log("register : "+root);

	app.get("/api/"+root, function(request, response) {
		response.header("Content-Type", "application/json");
        type.find(function(err, news) {
	         if(err){
	        	 	response.status(500).send({"message": "This is an error!"});
	         }else{
	        	 	response.status(200).send(news);
	         }
	     });
	});
	
	app.get("/api/"+root+"/:id", function(request, response) {
		 var id = request.params.id;
		response.header("Content-Type", "application/json");
        type.findById(id, function(err, profile) {
	         if(err){
	        	 	response.status(500).send({"message": "This is an error!"});
	         }else{
	        	 	response.status(200).send(profile);
	         }
	     });
	});
	
	app.post("/api/"+root+"/", function(request, response) {
		
		response.header("Content-Type", "application/json");
		if(!request.body){
			response.status(400).send({"message": "Bad Request"});
			return;
		}
		
		var payload = request.body;
		new type(payload).save(function(err) {
	         if(err){
	        	 	response.status(500).send({"message": "This is an error!"});
	         }else{
	        	 	response.status(200).send(payload);
	         }
	     });
	});
	
	app.post("/api/"+root+"/:id", function(request, response) {
		var id = request.params.id;
		response.header("Content-Type", "application/json");
		if(!request.body){
			response.status(400).send({"message": "Bad Request"});
			return;
		}
		
		var payload = request.body;
		type.findByIdAndUpdate(id, payload,function(err) {
	         if(err){
	        	 	response.status(500).send({"message": "This is an error!"});
	         }else{
	        	 	response.status(200).send(payload);
	         }
	     });
	});
	
	app.delete("/api/"+root+"/:id", function(request, response) {
		var id = request.params.id;
		response.header("Content-Type", "application/json");
		type.findByIdAndRemove(id, payload,function(err) {
	         if(err){
	        	 	response.status(500).send({"message": "This is an error!"});
	         }else{
	        	 	response.status(200).send({"message": "Done"});
	         }
	     });
    });
    
};