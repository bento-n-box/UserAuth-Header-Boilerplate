
/**
 * Module dependencies.
 */

var express = require('express')
  , route = require('./config/route')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , mongoose =  require('mongoose')
  ;
   
var app = express();

app.configure(function(req, res){

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize()); 	// Needed for Passport in this location
  app.use(passport.session());		// Needed for Passport in this location
  app.use(app.router);
  //app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.locals.title = "appName";
  app.use(function(req, res, next){
	    res.locals.user = req.user;
  });
  
  
});



app.configure('development', function(req, res){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/std_DEV');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var GoogleStrategy = require('passport-google').Strategy;
var UserModel = require('./models/usermodel');
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000'
  },
  function(identifier, profile, done) {
	 
	  profile.email = profile.emails[0].value;
	  UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done);
  }
));


TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: 'ConsumerKey',
    consumerSecret: 'XonsumerSecret',
    callbackURL: "http://localhost:3000"
  },
  function(token, tokenSecret, profile, done) {
   	  UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done);

  }
));

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 'clientID',
    clientSecret: 'clientSecret',
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
   	UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done)
  }
));

var BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(new BearerStrategy(
  function(token, done) {
   	UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done)
  }
));

route(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
