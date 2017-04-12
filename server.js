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
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname + "/app/" + "index.html");
})

// This responds a POST request 
app.post('/add_school', function (req, res) {
   console.log("Got a POST request to add a school");
   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   let count = Object.keys(data).length;
	   count = count + 1;
	   data["school" + count] = req.body.school;
       //console.log( data );
	   data = JSON.stringify(data)
       fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			if(err) {
			return console.log(err);
		}
	   })
	   res.redirect('back');
   });
})

// This responds a DELETE request for the /del_user page.
app.post('/delete_school', function (req, res) {
   console.log("Got a DELETE request for /del_school");
   fs.stat( "./app//public/json/" + "data.json", function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
		console.log("Error");
    } else {
        console.log('Some other error: ', err.code);
    }
   });
   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   let id = req.body.name;
	   let found = false;
	   for(var key in data) 
	   {
		    
			if(data[key].name === id)
			{
				delete data[key];
				found = true;
			}
			
	   }
	   if(!found){
			console.log("No school with that name was found.")
	   }
	   data = JSON.stringify(data)
       fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			if(err) {
			return console.log(err);
		}
	   })
	   res.redirect('back');
   });
})

// This responds a GET request for the /list_user page.
app.get('/list_schools', function (req, res) {
   console.log("Got a GET request for /list_schools");
   //reload page, jQuery Ajax is handling data display.
   res.redirect('back');
})

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





