$(document).ready(function(){
	console.log('Starting crowdfunding 0.2 ');
	var self = this;

	window.app.routers.base = new Crowdfunding.Routers.BaseRouter();
	window.app.collections.lastProjects = new Crowdfunding.Collections.Projects();
	window.app.collections.lastProjects.on('add', function(item){
		var it = new Crowdfunding.Views.Project({ model : item });
		it.render();
		$('#content').append(it.el);
	});

	var xhr = $.get('/projects/lasts');
	xhr.done(function(resp){
		 // levanta los datos recibidos en resp - JSON 
		if(resp.status === 'OK'){
			resp.data.forEach(function(item){
				window.app.collections.lastProjects.add(item);
			});
		}
	});

});