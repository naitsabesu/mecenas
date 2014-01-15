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

mecenasControllers.controller('EntranceCtrl', ['$scope']);





// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);
