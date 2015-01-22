'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('TmpCtrl',['$rootScope','$scope','localStorageService', function ($rootScope, $scope, localStorageService) {
		//localStorageService.clearAll();
		$rootScope.tab=false;
		$scope.enter=0;
		console.log(2);
		console.log($scope);
		console.log($rootScope);
		$scope.pgtp=2;

		var nameInStore = localStorageService.get('name');
		$scope.name = nameInStore || [];
		$scope.$watch('name', function () {
  		localStorageService.set('name', $scope.name);
		}, true);
  }]);
