'use strict';

/* Services */

var mecenasServices = angular.module('mecenasServices', []);


mecenasServices.factory('Project', 
	function($http){
		return {
			query : function(projectID){
				return $http.get('/projects/'+ projectID);
			},
			create : function(inputs){
				return $http.post('/projects', inputs)
				.success(function(resp){});
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