var models = require('./models'),
	Schema = models.Schema;

var userSchema = Schema({
	//requeridos
	id       : String, //guid
	fullname : String,
	password : String, //cifrar
	email    : String, //max 256 caracteres

	//datos personales
	country	 : String, //Lista de paises
	language : String, //SPA / ENG
	born     : String, //fecha
	avatar   : String, //imagen
	bio      : String, //biografia de la persona
	video	 : String, //video presentacion / youtube

	//redes sociales
	twitter  : String, //Schema.Types.Mixed,

	//seguridad
	verifiedMail : String, // S / N
	created : Date
});

var projectSchema = Schema({
	creator : { type : Schema.Types.ObjectId, ref : 'User' },
	title	 : String, //50 caracteres max
	brief	 : String, //140 caracteres max
	content  : String,

	goal	 : Number, //8 digitos maximo
	mainImage: String, 
	location : String, //relacionado a google maps

	created  : Date, //fecha de creacion
	updated	 : Date, //fecha de ultima actualizacion

	backers  : String, //por ahora es un string pero deberia ser una coleccion de User
	collected: Number, //8 digitos maximo
	// goal     : Number
});

var User = models.model('User', userSchema);
var Project = models.model('Project', projectSchema);

exports.User = User;
exports.Project = Project;