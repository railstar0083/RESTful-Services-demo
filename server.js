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

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname + "/app/" + "index.html");
})

// This responds a POST request for the homepage
app.post('/add_school', function (req, res) {
   console.log("Got a POST request to add a school");
   console.log( "./app/public/json/" + "data.json");
   fs.stat( "./app//public/json/" + "data.json", function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
		console.log("Error");
        // file does not exist
        //fs.writeFile('log.txt', 'Some log\n');
    } else {
        console.log('Some other error: ', err.code);
    }
   });
   fs.readFile( "./app//public/json/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   let count = Object.keys(data).length;
	   count = count + 1;
	   data["school" + count] = req.body.school;
       console.log( data );
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
app.delete('/del_school', function (req, res) {
   console.log("Got a DELETE request for /del_school");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_schools', function (req, res) {
   console.log("Got a GET request for /list_schools");
   //reload page, jQuery Ajax is handling data display.
   res.redirect('back');
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





