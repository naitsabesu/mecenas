Crowdfunding.Views.AppView = Backbone.View.extend({
	el : $('body'),
	initialize : function(){
		var self = this;

		window.app.routers.base = new Crowdfunding.Routers.BaseRouter();
		window.app.collections.lastProjects = new Crowdfunding.Collections.Projects();
		this.listenTo(window.app.collections.lastProjects, 'add', this.appendItem);
	
		var xhr = $.get('/projects/lasts');
		xhr.done(function(resp){
			 // levanta los datos recibidos en resp - JSON 
			if(resp.status === 'OK'){
				resp.data.forEach(function(item){
					window.app.collections.lastProjects.add(item);
				});
			}
		});

		Backbone.history.start({ pushState: true });		
	},
	render : function(){},
	appendItem : function(item){
		var it = new Crowdfunding.Views.Project({ model : item });
		it.render();
	}
});

Crowdfunding.App = Crowdfunding.Views.AppView;