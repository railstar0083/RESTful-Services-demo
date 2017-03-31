var http = require('http'),
	open = require('open'),
	fs = require('fs'),
	app = require('./app/app.js'),
	services = require('./services.js');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	services();
    //response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
	//open('http://localhost:8080/app/index.html');
    console.log("Server listening on: http://localhost:%s", PORT);
	
	app();
});





