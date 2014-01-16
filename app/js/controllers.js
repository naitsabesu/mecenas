'use strict';

/* Controllers */
var mecenasControllers = angular.module('mecenasControllers', []);

mecenasControllers.controller('ProjectListCtrl', ['$scope', 'Project',
	function($scope, Project) {
		$scope.projects = Project.query();
	}]);

mecenasControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Project',
	function($scope, $routeParams, Project) {
		$scope.project = Project.get({ projectId : $routeParams.projectId }, function(_project){

		});
	}]);

mecenasControllers.controller('ProjectNewCtrl', ['$scope']);

mecenasControllers.controller('EntranceCtrl', ['$scope', '$location', 'SessionService', 
	function($scope,$location,SessionService){
    	$scope.user = SessionService.getUser();
    	
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
