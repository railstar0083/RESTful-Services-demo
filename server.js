var http = require('http'),
	open = require('open'),
	fs = require('fs'),
	formidable = require('formidable'),
	util = require('util'),
	express = require('express'),
	app = express(),
	services = require('./services.js');

const _PATH = "/app/index.html";
const PORT = "8081";
	
//We need a function which handles requests and send response
function handleRequest(request, response){
	services(request);
    //response.end('It Works!! Path Hit: ' + request.url);
}

app.use(express.static('app/public'));
app.use(express.static('scripts'));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname + "/app/" + "index.html");
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_schools', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})





