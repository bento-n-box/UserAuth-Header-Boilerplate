var UserModel = require('../models/usermodel');

AuthController = {
	
	login: function(req, res){
		res.render('login');
		
	},
	logout: function(req, res){
		req.logout();
		res.redirect('/login');
		
	},
	adduser: function(req, res){
		res.render('createaccount');
	
	},
	create: function(req, res){
		console.log('Create Controller Called');
		console.log(req.params.user);
		UserModel.create(req.body, function(err, user){
			//res.render(201, user);
		});	
	}
	
	
}
module.exports = AuthController;