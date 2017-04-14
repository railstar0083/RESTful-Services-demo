var http = require('http'),
	open = require('open'),
	fs = require('fs'),
	formidable = require('formidable'),
	util = require('util'),
	bodyParser = require('body-parser'),
	express = require('express'),
	app = express(),
	services = require('./services.js');

const _PATH = "/app/index.html";
const PORT = "8081";

//Public route
app.use(express.static('app/public'));

//BodyParser setup
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//We need a function which handles requests and send response
function handleRequest(request, response){
	services(request);
    //response.end('It Works!! Path Hit: ' + request.url);
}

// Home
app.get('/', services.home)

// This responds a POST request to add a school 
app.post('/add_school', services.add_school)

// This responds a POST request to delete a school
app.post('/delete_school', services.delete_school)

// This responds a GET request to refresh the list.
app.get('/list_schools', services.list_schools)

//EDIT service here.  Pushes tasks into the queue.
app.post('/edit_school/:id', services.edit_schools)

//Server
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})





