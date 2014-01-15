var _ = require('underscore'); //manejo de arreglos entre otras funcionalidades
var Project = require('../models/schemas').Project;
var UploadFile = require('../util/upload');
var Globals = require('../util/globals');
var ObjectId = require('mongoose').Types.ObjectId;


var projectController = function(server){
	console.log('projectController esta cargado...');

	//middlewares
	var isNotLoggedIn = function(req, res, next){
		if(!req.session.user){
			res.render('entrance',{ 
				msg : Globals._MSG_NOT_LOGGEDIN_NEWPROJECT,
				msg_type : 'alert-error',
				msg_title : 'Oops!',
				from : 'project'
			});
			return;
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

	server.post('/project/create', isNotLoggedIn, function(req, res){
		var createdDate = new Date(Globals.getDateNow());
		
		//sube archivo
		debugger;
		var fileNameToSave;
		if((req.files.name !== '')&&(req.files.size !== 0)){
			fileNameToSave = UploadFile.upload(req, res);
		}

		var projectPost = new Project({
			creator : req.session.user._id,    //por ahora es un string pero deberia ser un objeto User
			title	: req.body.title,
			brief	: req.body.brief,
			content : req.body.project-content,

			mainImage : fileNameToSave, //TODO: subir una imagen al servidor o a S3 
			goal	: req.body.pledge,			
			
			// location : 'string', //relacionado a google maps
			created  : createdDate, //fecha de creacion
			updated	 : createdDate, //fecha de ultima actualizacion
			
			// backers  : 'string', //por ahora es un string pero deberia ser una coleccion de User
			collected: 0, //8 digitos maximo
		});

		projectPost.save(function(err){
			if(err){
				res.send(500, err);
			}
			res.redirect('/');
		});
	});

};

module.exports = projectController;