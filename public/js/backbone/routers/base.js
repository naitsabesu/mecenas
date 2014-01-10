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
		window.app.projectid = '';
	},
	displayExtended : function(id){
		console.log('router:displayExtended');
		window.app.state = 'displayExtended';
		window.app.projectid = id;
debugger;
		// $('#main-image').fadeOut();
		$('#layout-content').fadeOut(function(){
			$('#content').html('');
			$('#main-image').html('');
			$('#content').addClass('content-extended');
			$('#content').removeClass('content-min');			

			var model = window.app.collections.lastProjects.getOne(id);
			var view = new Crowdfunding.Views.ExtendedProjectView(model);
			view.render();

			$('#content').append(view.el);
			$('#layout-content').fadeIn();
		})

	}
});
Backbone.history.start({ pushState : true });