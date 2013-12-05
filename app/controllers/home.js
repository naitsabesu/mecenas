var _ = require('underscore'); //manejo de arreglos entre otras funcionalidades
var Project = require('../models/project');

var homeController = function(server, users){
	console.log('homeController esta cargado');

	//middlewares
	var isLoggedIn = function(req, res, next){
		if(req.session.passport.user){
			res.redirect('/app');
			return;
		}
		next();
	}

	// routes
	//server.get('/', isLoggedIn, function(req, res){
	server.get('/', function(req, res){		
		Project.find({}) //busca todos los documentos del tipo Project
		.exec(function(err, projects){
			if(err){
				console.log(err);
				return;
			}

			var projectsAsJSON = _.map(projects, function(project){
				// esta funcion itera por todos los proyectos y los devuelve en un arreglo json
				console.log(project.toJSON());
				return project.toJSON();
			});

			res.render('home', {
				user     : '',
				projects : projectsAsJSON
			});
		});
	});

	server.post('/log-in', function(req, res){
		var name = req.body.username;
		users.push(name);
		req.session.user = name;

		// trasmite a TODOS los usuarios conectados el mensaje de login de un usuario
		server.io.broadcast('log-in',{
			username : name
		});

		res.redirect('/app'); 
	});

	server.get('/log-out', function(req, res){
		users = _.without(users, req.session.user); //saca el usuario que cierra sesion de la coleccion de users

		// trasmite a TODOS los usuarios conectados el mensaje de logout de un usuario
		server.io.broadcast('log-out',{
			username : req.session.user
		});

		req.session.destroy();
		res.redirect('/');
	}); 

	//rutas de prueba
	server.post('/create-element', function(req, res){
		console.log('create-element');
		debugger;
		var projectPost = new Project({
			title	: req.body.title,
			brief	: req.body.brief,
			pledge	: req.body.pledge,
			content : req.body.content,
			mainImage : 'string' //subir una imagen al servidor o a S3 
		});
		projectPost.save(function(err){
			if(err){
				res.send(500, err);
			}
			res.redirect('/');
		});
	});
};

module.exports = homeController;