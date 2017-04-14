var http = require('http'),
	fs = require('fs'),
	formidable = require("formidable"),
	qs = require('querystring'),
	async = require('async'),
	express = require('express'),
	app = express(),
	util = require('util');

//RESTful services
var services = function(request, response) {
	console.log("Services loaded");
	
}

var home = function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname + "/app/" + "index.html");
}

var list_schools = function (req, res) {
   console.log("Got a GET request for /list_schools");
   //reload page, jQuery Ajax is handling data display.
   res.redirect('back');
}

var add_school = function (req, res) {
   debugger;
   console.log("Got a POST request to add a school");
   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   let count = Object.keys(data).length;
	   data["school" + (count + 1)] = req.body.school;
       //console.log( data );
	   data = JSON.stringify(data);
       fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			if(err) {
			return console.log(err);
		}
	   })
	   res.redirect('back');
   });
}

var delete_school = function (req, res) {
   //function that recompiles json on delete
   function concat(data, count){
	   let max = Object.keys(data).length;
	   for(i=count; i < max; i++){
		   data["school" + i] = data["school" + (i + 1)];
	   }
	   delete data["school" + max];
	   data = JSON.stringify(data)
	   fs.writeFile("./app//public/json/" + "data.json", data, function (err){
			if(err) {
				return console.log(err);
			}
		})
   }
   console.log("Got a DELETE request for /del_school");
   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   let id = req.body.name;
	   let found = false;
	   let count = 1;
	   for(var key in data) 
	   {
			if(data[key].name === id)
			{
				console.log(count)
				concat(data, count);
				found = true;
				break;
			}
			count++;
	   }
	   if(!found){
			console.log("No school with that name was found.")
	   } else {
		   res.redirect('back');
	   }
	   
   });
}

var edit_schools = function(req, res) {
   serviceQ.push({req: req, res: res })
   //res.redirect('/');
}

//scaffold for edit service
//This is the queue task for async
var editHandler = function(task, callback) {
	
	var req = task.req;
	var res = task.res;
	
	   console.log(req.params.id);
	   console.log(req.body);
	   //wrapped in a setTimeout to prevent a race condition

			fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
			   data = JSON.parse( data );
			   data[req.params.id] = req.body.school;
			   //console.log( data );
			    fs.writeFile("./app//public/json/" + "data.json", JSON.stringify(data), 'utf8', function (err){
					setTimeout(function(){
						if(err) {
							return console.log(err);
						}
						callback();
					}, 500)
					
			    })
			   if(err) {
				return console.log(err);
			   }
			})

	
};

//Make a queue for the services
var serviceQ = async.queue(editHandler, 1);

//All done with the queue
serviceQ.drain = function() {
    console.log('all services have been processed');
	
}


module.exports = {services, home, add_school, delete_school, edit_schools, list_schools};