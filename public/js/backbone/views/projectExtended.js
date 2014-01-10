Crowdfunding.Views.ExtendedProjectView = Backbone.View.extend({
	model : Crowdfunding.Models.Project,
	tagName   : 'div',
	className : 'project-extended',
	template : _.template($('#project-item-extended').html()),
	events : {},
	initialize : function(model){
		this.model = model;
	},
	render : function(){
        this.$el.html(this.template(this.model.toJSON()));
		return this;
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