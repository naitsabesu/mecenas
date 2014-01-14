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

	//LOGIN/SIGNUP PAGE
	server.get('/entrance', function(req,res){
		res.render('entrance');
	});

	//SIGNUP
	//TODO: Este deberia ir en "controller/user.js"
	server.post('/entrance/signup', nameExists, function(req, res){
		//levantar datos del formulario
		var fullName = req.body.usr_fullname,
			email	 = req.body.usr_mail_a,
			pass	 = req.body.usr_pass_a;

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
				res.send(500, err);
			}

			//guardo el usuario en sesion y redirecciono a /
			req.session.user = user;
			res.redirect('/');
		});
	});
	
	server.post('/entrance/login', function(req, res){
		// lavantar datos
		var email = req.body.usr_mail,
			pass  = req.body.usr_pass,
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
					//guardo el usuario en sesion y redirecciona al root
					req.session.user = user;
					res.redirect('/');
				}
			}
			//si el password no es correcto se muestra la vista entrance con error
			res.render('entrance',{ err : 'login' });
		});
	});

	server.get('/entrance/logout', function(req, res){
		req.session.destroy();
		res.redirect('/');
	});
};

module.exports = entranceController;