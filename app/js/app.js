'use strict';

/* App Module */

var mecenasApp = angular.module('mecenasApp', [
	'ngRoute',
  	'mecenasControllers',
  	'mecenasServices'
]);

mecenasApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/project-list-item.html',
				controller: 'ProjectListCtrl'
			}).    
			when('/projects', {
				templateUrl: 'partials/project-list-item.html',
				controller: 'ProjectListCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);
