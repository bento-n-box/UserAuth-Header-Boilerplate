var helpers = {}
var express = require('express');
app = express();

helpers.auth = function(req, res){
	var map = {};
	map.isAuthenticated = req.isAuthenticated;
	map.user = req.user;
	return map
	
	 console.log(map);
}
app.dynamicHelpers(helpers)