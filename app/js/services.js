'use strict';

/* Services */

var mecenasServices = angular.module('mecenasServices', ['ngResource']);

mecenasServices.factory('Project', ['$resource',
		function($resource){
			return $resource('projects/:projectId', {}, {
			query: {method:'GET', params:{projectId:'lasts'}, isArray:true}
		});
	}]);
