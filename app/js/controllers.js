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
        $scope.onFileSelect = function($files){
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/fileupload', 
                    //upload.php script, node.js route, or servlet url
                    // method: POST or PUT,
                    // headers: {'headerKey': 'headerValue'},
                    // withCredential: true,
                    data: {myObj: $scope.myModelObj},
                    file: file,
                    // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                    /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                    //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                    //formDataAppender: function(formData, key, val){} 
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
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
                    files : $scope.newproject.image
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

