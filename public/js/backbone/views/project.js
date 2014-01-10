Crowdfunding.Views.ProjectView = Backbone.View.extend({
	model : Crowdfunding.Models.Project,
	tagName   : 'div',
	className : 'project-box',
	events : {
		'click .project-box-title' : 'displayExtended'
	},
	template : _.template($('#project-item-min').html()),
	initialize : function(model){
		var self = this;
		this.model = model;
		
		this.model.on('change', function(){
			self.render();
		});

		window.app.routers.base.on('route:root', function(){
			self.render();
		});

		// window.app.routers.base.on('route:displayExtended', function(){
		// 	self.render();
		// 	//este handler hace q salten el render en todos los views
		// });
		// $(this.el).attr('id', this.model.get('_id'));

	},
	render : function(){
		var self = this;
		var locals = self.model.toJSON();
		if(window.app.state === 'displayExtended'){                        
		        if(window.app.projectid !== this.model.get('_id')){
		                this.$el.html('');
		                this.$el.hide();                                
		        }else{
		                this.$el.html(this.extendedTemplate(locals));
		                this.$el.show();                                
		        }
		} else {
		        this.$el.html(this.template(locals));
		}
		return this;
	},
	displayExtended : function(){
		console.log('to:displayExtended '+ this.model.get('_id'));
		// var self = this;
		Backbone.history.navigate('project/' + this.model.get('_id'), { trigger: true });
		// this.render();
	},
	unrender : function(){
		$(this.el).remove(); //quita el elemento del DOM
	},
	remove : function(){
		this.model.destroy(); 
		//elimina el objeto de su coleccion -> esto borra el dato de la bd 
		//se usa el Backbone.sync para evitar esto (por el ejemplo)
	}
});

// Crowdfunding.Views.Project = Crowdfunding.Views.ProjectView;