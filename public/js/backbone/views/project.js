Crowdfunding.Views.ProjectView = Backbone.View.extend({
	el : $('body'),
	model : Crowdfunding.Models.Project,
	// tagName   : 'div',
	// className : 'project-box',
	//template  : _.template($('#project-item-min').html()),
	events : {
		'click .project-box .project-box-title > h4' : 'displayExtended'
	},
	initialize : function(){
		var self = this;
		this.template = _.template($('#project-item-min').html());
		this.extendedTemplate = _.template($('#project-item-detail').html()); 

		this.model.on('change', function(){
			self.render();
		});

		window.app.routers.base.on('route:root', function(){
			self.render();
		});

		window.app.routers.base.on('route:displayExtended', function(data){
			self.render();
		});
	},
	render : function(data){
		var self = this;
		var locals = self.model.toJSON();
		
		if(window.app.state === 'root'){
			$('#home-container').append(self.template(locals));
/*			$(self.el).html(self.template(locals));
			if( window.app.article !== this.model.get('id') ){
				this.$el.hide();
				this.$el.html('');
			}else{
				this.$el.show();
				this.$el.html(this.extendedTemplate({post:locals}));
			}
		}else{
			this.$el.show();
			this.$el.html(this.template({post:locals}));
*/
		}else if(window.app.state === 'displayExtended'){
			$('#project-container').html('');
			
			$('#home-container').fadeOut(function(){
				$('#project-container').append(self.extendedTemplate(locals));
				$('#project-container').fadeIn('fast');
			});
		}
		return this;
	},
	displayExtended : function(){
		// console.log('displayExtended '+ this.model.get('_id'));
		// var self = this;
		Backbone.history.navigate('project/' + this.model.get('_id'), { trigger: true });		
	},
	unrender : function(){
		$(this.el).remove(); //quita el elemento del DOM
	},
	swap : function(){},
	remove : function(){
		this.model.destroy(); 
		//elimina el objeto de su coleccion -> esto borra el dato de la bd 
		//se usa el Backbone.sync para evitar esto (por el ejemplo)
	}
});

Crowdfunding.Views.Project = Crowdfunding.Views.ProjectView;