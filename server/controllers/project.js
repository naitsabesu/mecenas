// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete


var _ = require('underscore'); //manejo de arreglos entre otras funcionalidades
var Project = require('../models/schemas').Project;
var Files = require('../util/upload');
var Globals = require('../util/globals');
var ObjectId = require('mongoose').Types.ObjectId;


var projectController = function(server){
	console.log('projectController esta cargado...');

	//middlewares
	var isNotLoggedIn = function(req, res, next){
		if(!req.session.user){
			res.send(200, { err : 'not_logged_in' } );
		}
		next();
		//twitter login
		// if(!req.session.passport.user){
		// 	res.redirect('/');
		// 	return;
		// }
		// next();
	}	

	//routes
	server.get('/project/new', isNotLoggedIn, function(req,res){
		res.render('project-new', {user : req.session.user});
	});

	/** devuelve los ultimos proyectos creados **/
	server.get('/projects/:projectId', function(req, res){
		var param = req.params.projectId;
		console.log('get:/projects/'+param);
		if(param === 'lasts'){
			Project.find({}) //busca todos los documentos del tipo Project
			.populate('creator') //llena el objeto usuario
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
				res.send(200, projectsAsJSON);
			});
		}else{
			Project.findOne({ _id : param })
			.populate('creator')
			.exec(function(err, project){
				if(err){
					console.log(err);
					return;
				}
				console.log(project.toJSON());
				res.send(200, project.toJSON());
			});
		}

	});

	server.post('/projects', isNotLoggedIn, function(req, res){
		var createdDate = new Date(Globals.getDateNow());
		var projectPost = new Project({
			creator : req.session.user._id,    //por ahora es un string pero deberia ser un objeto User
			title	: req.body.title,
			brief	: req.body.brief,
			content : req.body.content,

			mainImage : req.body.file, //TODO: subir una imagen al servidor o a S3 
			goal	: req.body.goal,			
			
			// location : 'string', //relacionado a google maps
			created  : createdDate, //fecha de creacion
			updated	 : createdDate, //fecha de ultima actualizacion
			
			// backers  : 'string', //por ahora es un string pero deberia ser una coleccion de User
			collected: 0, //8 digitos maximo
		});

		projectPost.save(function(err){
			if(err){
				res.send(500, { created : false, err : err });
			}
			//mover imagen
			// if(req.body.file !== ''){
			// 	Files.moveFile(req, req.body.file)
			// }
			
			res.send(200, { created : true });
		});
	});

	server.post('/fileupload', function(req, res){
		//sube archivo
		var fileNameToSave, resp;
		if((req.files.file.name !== '')&&(req.files.file.size !== 0)){
			resp = Files.upload(req, res);
			res.send(200, resp);
		}

	});

};

module.exports = projectController;