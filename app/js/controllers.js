'use strict';

/* Controllers */
var mecenasControllers = angular.module('mecenasControllers', []);

mecenasControllers.controller('UserInfoCtrl', ['$scope', '$routeParams','SessionService',
	function($scope, $routeParams, SessionService) {

	}]);


mecenasControllers.controller('ProjectListCtrl', ['$scope', 'Project', 'SessionService',
	function($scope, Project, SessionService) {
		$scope.projects = Project.query();
	}]);

mecenasControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Project',
	function($scope, $routeParams, Project) {
		$scope.project = Project.get({ projectId : $routeParams.projectId }, function(_project){

		});
	}]);

mecenasControllers.controller('ProjectNewCtrl', ['$scope']);

mecenasControllers.controller('EntranceCtrl', ['$scope', '$location', '$routeParams','SessionService', 
	function($scope, $location, $routeParams, SessionService){
    	$scope.user = SessionService.getUser();

		//chequea cada vez q la aplicacion cambia de ruta si hubo modificaciones en la sesion
		$scope.$on('$routeChangeSuccess',function(){
			$scope.authorized = SessionService.authorized();
			if($scope.authorized){
				$scope.user = SessionService.getUser();
			}else{
				delete $scope.user;
			}
		});
    	
    	$scope.login = function() {
    		SessionService.login($scope.user, loginHandler, errorHandler);
    	};

    	function loginHandler(res) {
    		if(SessionService.authorized()) {
    			$location.path('/'); //autorizado
    		} else {
    			$scope.message = "Invalid username or password!";
    		}
    	}


        $scope.logout = function() {
            SessionService.logout(logoutHandler, errorHandler);
        };

        function logoutHandler(res) {
        	debugger;
        	$location.path('/entrance');
        }

    	function errorHandler(err) {
        	$scope.message = "Error! " + err.data.error;
    	}



	}
]);





// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);
