var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use('local-login',new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			
			if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				console.log(user)
				//return done(null, user);
				return done(null, false, { message: 'Incorrect password.' });


			});
	}
));


router.post('/',
	passport.authenticate('local-login', { successRedirect: '/',
										failureRedirect: '/login',
		                                failureFlash: false })
	);


module.exports = router;

