var express  = require('express.io'), //webserver (con socket.io)
	swig     = require('swig'), //lib de templates
	cons     = require('consolidate'),
	_		 = require('underscore'),	
	passport = require('passport');

var RedisStore = require('connect-redis')(express); // servidor de sessiones

//var RedisStore = require('connect-redis')(express);
var server = express();
//server.http().io(); //express y socket.io corriendo a la vez

// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

//Carga de archivos estaticos
server.use(express.static('./public')); //define la ruta de los archivos estaticos, esto hace que "oculte" la ruta de la carpeta en el servidor
 
swig.setDefaults({
	cache : false
});

//Agregamos post, cookies y sesiones --> solo para debug??
server.configure(function(){
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());

	// server.use(express.session({
	// 	secret : 'lolcatz',
	// 	cookie : {maxAge : 60000},
	// 	store  : new MongoStore({db : 'sessionstore'})
	// }));
	server.use(express.session({
		secret : 'lolcatz',
		store  : new RedisStore({})
	}));

	// passport se pone despues de la inicializacion del modulo de sesion
	server.use(passport.initialize());
	server.use(passport.session());
});

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(obj, done){
	done(null, obj);
});

// Controllers
var homeController = require('./app/controllers/home')(server);
var projectController  = require('./app/controllers/project')(server);
var entranceController = require('./app/controllers/entrance')(server);
var userController = require('./app/controllers/user')(server);

// Connections
var twitterConnection = require('./app/connections/twitter')(server);

//inicia el servidor
var port = process.env.PORT || 3000;
server.listen(3000, function(){
	console.log('Server is running at port '+ port +'...');
});



/*
// socket.io
server.io.route('hello?', function(req){
	req.io.emit('saludo',{ 
		message : 'serverReady'
	});
});


server.get('/supervisor', function(req, res){
	debugger;
	res.send('supervisor');
});
server.get('/messages', function(req, res){
	responses.push(res);
});
server.get('/messages/:message', function(req, res){
	messages.push(req.params.message);
	responses.forEach(function(res){
		res.send(messages + '<script>window.location.reload();</script>');
	});
	res.send('tu mensaje es '+ req.params.message);	
});
*/

