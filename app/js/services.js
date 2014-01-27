'use strict';

/* Services */

var mecenasServices = angular.module('mecenasServices', []);


mecenasServices.factory('Project', 
	function($http){
		return {
			query : function(projectID){
				return $http.get('/projects/'+ projectID);
			}
		};
});

mecenasServices.factory('SessionService', 
	function($http, $cookieStore){
		var _user;
		var _authorized;

		return {
			login : function(inputs){
				return $http.post('/entrance', inputs)
				.success(function(resp){
					_authorized = resp.authorized;
					if(_authorized){
						$cookieStore.put('user', resp.user);	
					}else{
						$cookieStore.remove('user');
						_authorized = false;
					}
				});
			},
			logout : function(){
				return $http.get('/logout').success(function(resp){
					_user = null;
					_authorized = false;
					$cookieStore.remove('user');
				});
			},
			register : function(inputs){
				debugger;
				return $http.post('/entrance/register', inputs);
			},
			getUser : function(){
				if(this.isAuthorized())
					return _user;
				else
					return null;
			},
			isAuthorized : function(){				
				if(_user == null){
					_user = $cookieStore.get('user');
				}
				_authorized = !(_user == null);
			
				return	_authorized;
			}
		};
});

/*
	function($resource){
		var service = $resource('/entrance', {}, {
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
	}]);*/