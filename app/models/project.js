var models = require('./models'),
	Schema = models.Schema;

var projectSchema = Schema({
	title	 : 'string', //50 caracteres max
	brief	 : 'string', //140 caracteres max
	content  : 'string',
	pledge	 : 'number', //8 digitos maximo
	username : 'string', //maxima longitud de twitter o facebook
	mainImage: 'string', 
	location : 'string', //relacionado a google maps

	created  : 'date', //fecha de creacion
	updated	 : 'date', //fecha de ultima actualizacion
	user     : 'string', //por ahora es un string pero deberia ser un objeto User
	backers  : 'string', //por ahora es un string pero deberia ser una coleccion de User
	collected: 'number', //8 digitos maximo
});

var Project = models.model('project', projectSchema);

module.exports = Project;