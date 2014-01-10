Crowdfunding.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		'' :  'root',
		'/' : 'root',
		'project/:id' : 'displayExtended'
	},
	initialize : function(){
		//console.log('router');
	},
	root: function(){
		//console.log('root');
		window.app.state = "root";
	},
	displayExtended : function(id){
		console.log('router:displayExtended');
		window.app.state = 'displayExtended';
		window.app.projectid = id;
		// $('#content > div').html('');
		// $('#content > div').hide('');

	}
});
Backbone.history.start({ pushState : true });