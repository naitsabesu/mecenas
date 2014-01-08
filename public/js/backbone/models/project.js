Crowdfunding.Models.ProjectModel = Backbone.Model.extend({
	urlRoot:"",
	defaults:{
		// title     : '',
		// brief     : '',
		// content   : '',		
		
		// creator   : {},
		// mainImage : '',
		// location  : '',

		// created   : '',
		// updated   : '',
		// goalDate  : '',

		// backers   : '',
		// collected : '',
		// goal      : '',		
		collectedPercent : function(){
			var r = ((this.goal / this.collected)*100);
			if(isNaN(r)){
				return 0;
			} 	
			return r;
		}(),		
		daysLeft  : Math.round((new Date('2014-01-20') - new Date()) / 86400000)
	},
	prettyDate : function(date){
		if (!date || date === "0000-00-00 00:00:00") return "";
		var date = Date.parse(date);
		return date.toString("MMMM dd, yyyy");
	},
	parse : function(resp) {
		// the collection does not output same json format to models;
		if(resp.data){
			return resp.data;
		}else{
			return resp;
		}
	}
});
Crowdfunding.Models.Project = Crowdfunding.Models.ProjectModel;