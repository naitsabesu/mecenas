var User = require('../models/schemas').User;

var userController = function(server){
	console.log('userController esta cargado...');

	//MIDDLEWARES

	//ROUTES
	server.get('/user/:id', function(req, res){
		//res.send('user ' + req.params.id);
	});
	server.get('/user', function(req, res){
		debugger;
		if(req.session.user){
			res.render('user', {user : req.session.user});	
		}
		
	});
	server.post('/user/update', function(req, res){
		var _user =  req.session.user;
		if(_user){
			debugger;
			//buscar usuario en la base
			User.findOne({
				_id : _user.id
			})
			.exec(function(err, user){
				if(err){				
					console.log(err);
					return;
				}
				if(user){
					user.fullname = req.body.fullname;
					user.country  = req.body.country;
					user.language = req.body.language;
					user.born     = req.body.born;
					user.avatar   = '';
					user.bio      = req.body.bio;
					user.twitter  = req.body.twitter;

					user.save(function(err){
						if(err){
							res.send(500, err);
						}
						req.session.user = user.toJSON();
						res.render('user', {user : user});
					});
				}
			});
		}
	});
};

module.exports = userController;
