var Project = require('../models/project');

var appController = function(server, users){
	console.log('appController esta cargador');

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
		debugger;
		var createdDate = new Date(getDateNow());
		var projectPost = new Project({
			title	: req.body.title,
			brief	: req.body.brief,
			pledge	: req.body.pledge,
			content : req.body.content,
			mainImage : 'string', //subir una imagen al servidor o a S3 
			// username : 'string', //maxima longitud de twitter o facebook
			// mainImage: 'string', 
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


	//auxiliar
	var getDateNow = function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd < 10){
			dd = '0' + dd;
		} 
		if(mm < 10){
			mm ='0'+ mm;
		} 
		today = yyyy +'/'+ mm +'/'+ dd;
		return today;
	}

};

module.exports = appController;