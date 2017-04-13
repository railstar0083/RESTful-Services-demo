var http = require('http'),
	open = require('open'),
	fs = require('fs'),
	formidable = require('formidable'),
	util = require('util'),
	bodyParser = require('body-parser'),
	async = require('async'),
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

//This is the queue task for async
var editHandler = function(task, done) {
	
	var req = task.req;
	var res = task.res;
	
	   console.log(req.params.id);
	   console.log(req.body);
	   //wrapped in a setTimeout to prevent a race condition
		setTimeout(function(){
			fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
		   data = JSON.parse( data );
		   data[req.params.id] = req.body.school;
		   //console.log( data );
		   fs.writeFile("./app//public/json/" + "data.json", JSON.stringify(data), function (err){
			if(err) {
				return console.log(err);
		    }
	       })
		   res.redirect('/');
	    })
		},500);
		
};

//Make a queue for the services
var serviceQ = async.queue(editHandler, 20);

//All done with the queue
serviceQ.drain = function() {
    console.log('all services have been processed');
}

//EDIT service here.  Pushes tasks into the queue.
app.post('/edit_school/:id', function(req, res) {
   
   serviceQ.push({req: req, res: res })	

})

//Server
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})





