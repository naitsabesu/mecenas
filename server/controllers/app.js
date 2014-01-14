var Project = require('../models/schemas').Project;
var UploadFile = require('../util/upload');
var Globals = require('../util/globals');

var appController = function(server){
	console.log('appController esta cargado...');

	//middlewares
	var isNotLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	}	

	//routes
	// server.get('/app', isNotLoggedIn, function(req,res){
	server.get('/app', function(req,res){
		res.render('app',{});
	});

	server.post('/app/create-project', function(req, res){
		var createdDate = new Date(Globals.getDateNow());
		
		//sube archivo
		var fileNameToSave;
		if((req.files.name !== '')&&(req.files.size !== 0)){
			fileNameToSave = UploadFile.upload(req, res);
		}

		var projectPost = new Project({
			title	: req.body.title,
			brief	: req.body.brief,
			pledge	: req.body.pledge,
			content : req.body.content,
			mainImage : fileNameToSave, //subir una imagen al servidor o a S3 
			// username : 'string', //maxima longitud de twitter o facebook
			// location : 'string', //relacionado a google maps
			created  : createdDate, //fecha de creacion
			updated	 : createdDate, //fecha de ultima actualizacion
			// user     : 'string', //por ahora es un string pero deberia ser un objeto User
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

module.exports = appController;