'use strict';

/* App Module */

var mecenasApp = angular.module('mecenasApp', [
	'ngSanitize',
	'ngRoute',
  	'mecenasControllers',
  	'mecenasFilters',
  	'mecenasServices'
]);

mecenasApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', 
				{ 
					templateUrl: 'partials/project-list-item.html', 
				  	controller: 'ProjectListCtrl' 
				})
			.when('/projects/:projectId',
				{
					templateUrl: 'partials/project-detail.html',
					controller: 'ProjectDetailCtrl'
				})
			.when('/entrance',
				{	
					templateUrl: 'partials/user-log.html', 
					controller: 'EntranceCtrl' 
				})
			.when('/project/new',
				{ 
					templateUrl: 'partials/project-new.html', 
					controller: 'ProjectCtrl'	
				})
			.otherwise(
				{
					redirectTo: '/' 
				})
			;
	}]);
