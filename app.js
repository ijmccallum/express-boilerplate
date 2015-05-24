/* Make an express! 
=========================================*/
console.time('0: setup complete');
console.info('     5: Setting up Express');
var express = require('express');
var app = express();

/* GETTING the packages
=========================================*/
console.info('    4: Requiring modules');
var expressHbs  = require('express-handlebars'); //because moustach
var passport = require('passport'); //the authentication
var session = require('express-session');
var bodyParser   = require('body-parser'); //To read html forms
var cookieParser = require('cookie-parser'); //To read the cookies, om nom nom
var morgan = require('morgan'); //for better logging
var mongoose = require('mongoose'); //To talk to mongo!

/* CONFIGURING the packages
=========================================*/
console.info('   3: Configuring packages');
/* Setting the location for static files */
app.use(express.static('public'));

/* Setting the location for template files */
app.set('views', './views');

/* Setting the template rendering engine */
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'layout.hbs'}));
app.set('view engine', 'hbs');

/* Lets us get data from form submittion */
 app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));

/* Getting data from cookies */
app.use(cookieParser());

/* Setting up the logging */
app.use(morgan('combined'));

/* Setting up authentication using Passport */
app.use(session({secret: 'iloveme', 
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());

/* DATABASE!!
==========================================*/
console.info('  2: Connecting to DB');
mongoose.connect('mongodb://localhost/wl-03-dev');


/* ROUTING - all the rout defenitions moved to routes.js
=========================================*/
require('./routes/passport')(passport);
require('./routes/routes.js')(app, passport);


/* RUN!
==========================================*/
console.timeEnd('0: setup complete');

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

	console.log('        ______ ____   __');
	console.log('       / ____// __ \\ / /');
	console.log('      / / __ / / / // / ');
	console.log('     / /_/ // /_/ //_/  ');
	console.log('     \\____/ \\____/(_)   ');

});