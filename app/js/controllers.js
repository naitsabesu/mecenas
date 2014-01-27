'use strict';

/* Controllers */
var mecenasControllers = angular.module('mecenasControllers', []);

mecenasControllers.controller('UserInfoCtrl', ['$scope', '$routeParams','SessionService',
	function($scope, $routeParams, SessionService) {

	}]);

mecenasControllers.controller('ProjectListCtrl', ['$scope', 'Project',
	function($scope, Project) {
        Project.query('lasts').success(function(resp){
            $scope.projects = resp;
        });	
	}]);

mecenasControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Project',
	function($scope, $routeParams, Project) {
        Project.query($routeParams.projectId).success(function(resp){
            $scope.project = resp;
        });
	}]);

mecenasControllers.controller('ProjectNewCtrl', ['$scope']);

mecenasControllers.controller('EntranceCtrl', ['$scope', '$location', '$routeParams','SessionService', 
	function($scope, $location, $routeParams, SessionService){
        

		//chequea cada vez q la aplicacion cambia de ruta si hubo modificaciones en la sesion
		$scope.$on('$routeChangeStart',function(){
            $scope.authorized = SessionService.isAuthorized();
			if($scope.authorized){
				$scope.user = SessionService.getUser();
			}else{
				delete $scope.user;
			}
		});

    	$scope.login = function() {
    		//SessionService.login($scope.user, loginHandler, errorHandler);
            SessionService.login(
                { 
                    email : 'flores.javier@gmail.com',
                    password : 'jsfYgyg11'
                })
            .success(function(resp){
                $location.path('/');
            });
    	};

        $scope.logout = function(){
            SessionService.logout().success(function(resp){
                $location.path('/#');
            });
        };

        $scope.register = function(){
            debugger;
            SessionService.register(
                {
                    fullname : $scope.newuser.fullname,
                    email    : $scope.newuser.email_b,
                    password : $scope.newuser.password_b
                })
            .success(function(resp){
                if(resp.registered === 'true'){
                    SessionService.login(
                        {
                            email: $scope.newuser.email_b,
                            password: $scope.newuser.password_b
                        })
                    .success(function(resp){
                        $location.path('/');
                    });
                }
                
            });
        }



	}
]);

