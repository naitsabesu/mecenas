'use strict';

/* Filters */

angular.module('mecenasFilters', [])
	.filter('percent', function() {
		return function(_goal, _collected) {
  			if(_collected === 0) return 0;
  			return (Math.floor(_goal / _collected));
  		};
	}).
	filter('daysLeft', function(){
		return function(_date) {
			var today = new Date();
			var limit = new Date(_date);
			var r = (limit - today);
			if(r < 0) return 0;
			return r / 86400000;
		}
	});
