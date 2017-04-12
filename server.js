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
	
//We need a function which handles requests and send response
function handleRequest(request, response){
	services(request);
    //response.end('It Works!! Path Hit: ' + request.url);
}

app.use(express.static('app/public'));


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Make a queue for the services
var serviceQ = async.priorityQueue(function (task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 1);

serviceQ.drain = function(data) {
	
    console.log('all services have been processed');
}

//File write queue

// var writeQ = async.queue(function (task, callback) {
    // console.log('hello ' + task.name);
    // callback();
// }, 30);

// writeQ.drain = function(data) {
	
    // console.log('all services have been processed');
// }



// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname + "/app/" + "index.html");
})

// This responds a POST request for the homepage
app.post('/add_school', function (req, res) {
   console.log("Got a POST request to add a school");
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


app.post('/edit_school/:id', function(req, res) {
   var priority = parseInt(req.params.id, 10);
   serviceQ.push({name: "edit-post-data"}, priority, function(err){
	   console.log("Got a EDIT request for /edit_school");
	   fs.stat( "./app//public/json/" + "data.json", function(err, stat) {
		if(err == null) {
			console.log('File exists');
		} else if(err.code == 'ENOENT') {
			console.log("Error");
		} else {
			console.log('Some other error: ', err.code);
		}
	   });
	   console.log(req.params.id);
	   console.log(req.body);
	   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
		   data = JSON.parse( data );
		   data[req.params.id] = req.body.school;
		   //console.log( data );
		   data = JSON.stringify(data)
		   fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			if(err) {
			return console.log(err);
		     }
	       })
		   //res.redirect('/');
	   });
   })	
   // console.log("Got a EDIT request for /edit_school");
   // fs.stat( "./app//public/json/" + "data.json", function(err, stat) {
    // if(err == null) {
        // console.log('File exists');
    // } else if(err.code == 'ENOENT') {
		// console.log("Error");
    // } else {
        // console.log('Some other error: ', err.code);
    // }
   // });
   // console.log(req.params.id);
   // console.log(req.body);
   // fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       // data = JSON.parse( data );
	   // data[req.params.id] = req.body.school;
       // console.log( data );
	   // data = JSON.stringify(data)
       // fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			// if(err) {
			// return console.log(err);
		// }
	   // })
   // });
   //res.redirect('back');
})

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})





