'use strict';

/* Controllers */
var mecenasControllers = angular.module('mecenasControllers', []);

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

mecenasControllers.controller('ProjectNewCtrl', ['$scope', '$location', '$upload', 'Project', 
    function($scope, $location, $upload, Project){
        $scope.selectedFile = null;
        $scope.onFileSelect = function($files){
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/fileupload', 
                    file: file,
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                    //formDataAppender: function(formData, key, val){} 
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                    $scope.selectedFile = data;
                    $scope.newproject.fileupload = '';
                    // debugger;
                });
            }
        },
        $scope.createproject = function(){
            debugger;
            Project.create(
                {
                    title : $scope.newproject.title,
                    brief : $scope.newproject.brief,
                    content : $scope.newproject.content,
                    goal  : $scope.newproject.goal,
                    file : $scope.selectedFile
                }
            )
            .success(function(resp){
                $location.path('/');
            });
        };

    }
]);

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
            // debugger;
            SessionService.login(
                { 
                    email : $scope.user.email,
                    password : $scope.user.password
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
            SessionService.register(
                {
                    fullname : $scope.newuser.fullname,
                    email    : $scope.newuser.email_b,
                    password : $scope.newuser.password_b
                })
            .success(function(resp){
                if(resp.registered){
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

