'use strict';

/* App Module */

var mecenasApp = angular.module('mecenasApp', [
	'ngSanitize',
	'ngRoute',
	'ngCookies',
  	'mecenasControllers',
  	'mecenasFilters',
  	'mecenasServices',
  	'angularFileUpload'
]);

mecenasApp.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		// $locationProvider.html5Mode(true);

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
			.when('/project/create',
				{ 
					templateUrl: 'partials/project-new.html', 
					controller: 'ProjectNewCtrl'	
				})
			.otherwise(
				{
					redirectTo: '/' 
				})
			;
	}]);
