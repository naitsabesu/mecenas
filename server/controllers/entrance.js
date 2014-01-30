var passwordHash = require('password-hash'),
	guid = require('node-uuid'),
	User = require('../models/schemas').User,
	Globals = require('../util/globals');

var entranceController = function(server){
	console.log('entranceController esta cargado...');

	//MIDDLEWARES
	var nameExists = function(req, res, next){
		//TODO: chequear en base si req.body.usr_mail_a existe
		next();
	}
	var isLoggedIn = function(req, res, next){
		if(req.session.user){
			res.redirect('/');
		}
		next();
	}


	//SIGNUP
	//TODO: Este deberia ir en "controller/user.js"
	server.post('/entrance/register', nameExists, function(req, res){
		//levantar datos del formulario
		var fullName = req.body.fullname,
			email	 = req.body.email,
			pass	 = req.body.password;

		//validar datos

		//guardar datos
		var user = new User({
			//requeridos
			id		 : guid.v1(),
			fullname : fullName,
			password : passwordHash.generate(pass), //cifrado
			email    : email, //max 256 caracteres

			//datos personales
			country	 : '', //Lista de paises
			language : '', //SPA / ENG
			born     : '', //fecha
			avatar   : '', //imagen
			bio      : '', //biografia de la persona
			video	 : '', //video presentacion / youtube

			//redes sociales
			twitter  : '', // Schema.Types.Mixed,

			//seguridad
			verifiedMail : 'N', // S / N
			created : new Date(Globals.getDateNow())			
		});

		user.save(function(err){
			if(err){
				res.send(500, { registered : false , err : err });
			}
			res.send(200, { registered : true });
		});
	});
	
	server.post('/entrance', function(req, res){
		console.log('POST: /entrance');
		// lavantar datos
		var email = req.body.email,
			pass  = req.body.password,
			hashedPass = passwordHash.generate(pass);

		//buscar usuario en la base
		User.findOne({
			email : email
		})
		.exec(function(err, user){
			if(err){				
				console.log(err);
				return;
			}
			if(user){
				if(passwordHash.verify(pass, user.toJSON().password)){
					var _user = new User();

					//guardo el usuario en sesion
					user.password = null;
					console.log('user: '+user);

					req.session.user = user;
					req.session.authorized = true;
					res.send(200, { authorized : true, user : user });
					return;
				}
			}
			req.session.user = null;
			req.session.authorized = false;
			res.send(200, { authorized : false, msg : 'Usuario y/o contraseña invalidos.' });
		});
	});

	server.get('/logout', function(req, res){
		console.log('get: '+ req.session);
		req.session.destroy();
		res.send(200, { authorized : false });
	});
};

module.exports = entranceController;