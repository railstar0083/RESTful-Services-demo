var http = require('http'),
	fs = require('fs'),
	formidable = require("formidable"),
	qs = require('querystring'),
	express = require('express'),
	app = express(),
	util = require('util');

//RESTful services
var services = function(request, response) {
	console.log("Services loaded");
	
}



module.exports = services;