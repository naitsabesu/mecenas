var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/schemas').User;

var twitterConnection = function(server){
	console.log('twitterConnection cargado');
	passport.use(new TwitterStrategy({
		consumerKey    : '4y6dsZnthLUm9HwhiDVQ',
		consumerSecret : 'ORjW1lo2K7KK4eGvZFoIh4LXaisnYwMMIAU0T9a5aSM',
		callbackUrl    : '127.0.0.1:3000/auth/twitter/callback'

	}, function(token, tokenSecret, profile, done){
		var user = new User({
			username : profile.username,
			twitter  : profile
		});
		user.save(function(err){
			if(err){
				done(err, null); //no guarda nada en la session del usuario
				return;
			}
			done(null, user.profile); //guarda el perfil en session
		});
	}));

	server.get('/auth/twitter', passport.authenticate('twitter'), function(){});
	server.get('/auth/twitter/callback', passport.authenticate('twitter',{ failureRedirect : '/?error=algo-fallo'},
		function(req, res){
			res.redirect('/app');
		}
	));
}

module.exports = twitterConnection;