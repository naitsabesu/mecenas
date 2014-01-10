var Projects = Backbone.Collection.extend({
	model : Crowdfunding.Models.Project,
    getOne : function(id){
        var projects = this.filter(function(data) {
            return data.get("_id") == id;
        });

        if(projects.length){
            return projects[0];
        }else{
            return null;
        }
    },	
});
Crowdfunding.Collections.Projects = Projects;