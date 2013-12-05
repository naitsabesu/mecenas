var models = require('./models'),
	Schema = models.Schema;

var userSchema = Schema({
	username : 'string',
	password : 'string', //cifrar

	country	 : 'string',
	id       : 'string', //dni, cuit, rut, etc
	email    : 'string', //max 256 caracteres
	born     : 'string', //fecha

	twitter  : Schema.Types.Mixed,
	facebook : Schema.Types.Mixed
});

var User = models.model('user', userSchema);

module.exports = User;