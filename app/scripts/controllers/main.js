'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl',['$rootScope','$scope','localStorageService', function ($rootScope, $scope, localStorageService) {
		//localStorageService.clearAll();
		$rootScope.tab=true;
		console.log(1);
		console.log($scope);
		console.log($rootScope);
		//$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
		$scope.firstName="John";
    $scope.lastName="Doe";
		$scope.pgtp=1;

		var nameInStore = localStorageService.get('name');
		$scope.name = nameInStore || [];
		$scope.$watch('name', function () {
  		localStorageService.set('name', $scope.name);
		}, true);
  }]);
