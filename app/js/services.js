'use strict';

/* Services */

var mecenasServices = angular.module('mecenasServices', ['ngResource']);

mecenasServices.factory('Project', ['$resource',
		function($resource){
			return $resource('projects/:projectId', {}, {
				query: {
					method : 'GET',
					params : { projectId:'lasts' },
					isArray:true
				}
		});
	}]);

mecenasServices.factory('SessionService', ['$resource',
	function($resource){
		var service = $resource('/entrance/:param', {}, {
			login: {
				method: 'POST'
			},
			logout: {
				method: 'DELETE'
			}
		});
		var _user = { authorized: false };
		
		function getUser() {
			return _user;
		};

		function authorized() {
			return _user.authorized === true;
		};

		function login(newUser, resultHandler, errorHandler) {
			service.login(
				newUser, function(res) {
					_user = (res.user || _user);
					_user.authorized = res.authorized;
					if (angular.isFunction(resultHandler)) {
						resultHandler(res);
					}
				}, 
				function(err) {
					if (angular.isFunction(errorHandler)) {
						errorHandler(err);
					}
				}
			);
		};

		function logout() {
			_user = {
				authorized: false
			};
		};

		return {
			login: login,
			logout: logout,
			authorized: authorized,
			getUser: getUser
		};
	}]);