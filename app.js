console.time('    0: setup complete');

/* Make an express! 
=========================================*/
console.info('          6: Setting up Express');
var express = require('express');
var app = express();
var router = express.Router();

/* GETTING the packages
=========================================*/
console.info('         5: Requiring modules');
var expressHbs  = require('express-handlebars'); //because moustach
var passport = require('passport'); //the authentication
var session = require('express-session');
var bodyParser   = require('body-parser'); //To read html forms
var cookieParser = require('cookie-parser'); //To read the cookies, om nom nom
var morgan = require('morgan'); //for better logging
var mongoose = require('mongoose'); //To talk to mongo!

/* CONFIGURING the packages
=========================================*/
console.info('        4: Configuring packages');
app.use(express.static('public')); //Setting the location for static files
app.set('views', './views'); //Setting the location for template files
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'layout.hbs'})); //Setting the template rendering engine
app.set('view engine', 'hbs');
app.use(bodyParser.json()); // Lets us get data from form submittion
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //Getting data from cookies
app.use(morgan('combined')); //Setting up the logging

/* Setting up authentication using Passport
=========================================*/
console.info('       3: Setting up suthentication');
app.use(session({secret: 'iloveme', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport); //Sets up our authentication strategies
var authCheck = {
	isLoggedIn : function(req, res, next) {
		/* for public routes - to define if they get logged in options */
	    console.log('do not know yet!');
	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated()) {
	        console.log('YEAY!!! LOGGED IN!!!');
	        return next();
	    }

	    // if they aren't redirect them to the home page
	    console.log('not logged in');
	    res.redirect('/');
	},
	hasAccess : function(req, res, next) {
		/* for private routes - to check if they are allowed access */
	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated()) {
	        console.log('YEAY!!! LOGGED IN!!!');
	        return next();
	    }

	    // if they aren't redirect them to the home page
	    console.log('not logged in');
	    res.redirect('/');
	}
};
/* DATABASE!!
==========================================*/
console.info('      2: Connecting to DB');
mongoose.connect('mongodb://localhost/wl-03-dev');


/* ROUTING - all the rout defenitions in routes.js
 * TODO: need to change to express.router
 * =========================================*/
console.info('     1: Setting up the routes');



/* Public routes */
app.get('/', function (req, res) {
	//is a user logged in?

	res.render('index', {
		loggedIn : isLoggedIn(req, res)
	});
});
/* private routes */
app.get('/private', authCheck.isLoggedIn, function (req, res) {
	//return this user's details
	console.log('loading profile:req: ', req.user);
	//console.log('loading profile:req: ', res.user);
	res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});

//require('./routes/routes.js')(app, passport);


/* RUN!
==========================================*/
console.timeEnd('    0: setup complete');

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

	console.log('        ______ ____   __');
	console.log('       / ____// __ \\ / /');
	console.log('      / / __ / / / // / ');
	console.log('     / /_/ // /_/ //_/  ');
	console.log('     \\____/ \\____/(_)   ');

});