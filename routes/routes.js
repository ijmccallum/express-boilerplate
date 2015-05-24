module.exports = function(app, passport) {

/* Public Routes
=====================================================================*/
	app.get('/', function (req, res) {
		res.render('index');
	});

/* User authentication
=====================================================================*/
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/',
		passReqToCallback : true
		})
	);

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/',
		passReqToCallback : true
		})
	);

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

		

	//user profile
	app.get('/profile', isLoggedIn, function(req, res) {
		//return this user's details
		console.log('loading profile:req: ', req.user);
		//console.log('loading profile:req: ', res.user);
		res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
	});

	//change password
	app.post('/profile/user/reset-password', isLoggedIn, function(req, res) {
		//reset this user's password
	});

	//forgotton password
	app.get('/forgotton-password', function(req, res) {
		//reset to radom password
		//email user with new password - is this a good idea?
	});

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
/* Private Routes
=====================================================================*/
	app.get('/private', isLoggedIn, function (req, res) {
	  res.render('private');
	});

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
    	console.log('YEAY!!! LOGGED IN!!!');
        return next();
    }

    // if they aren't redirect them to the home page
    console.log('not logged in');
    res.redirect('/');
}