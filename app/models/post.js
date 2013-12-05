var models = require('./models'),
	user   = require('./user'),
	Schema = models.Schema;

var userSchema = Schema({
	content : 'string',
	user  : {
		type : Schema.Types.ObjectId,
		ref : user
	}
});

var Post = models.model('post', userSchema);

module.exports = Post;