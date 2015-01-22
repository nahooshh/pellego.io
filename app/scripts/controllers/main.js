'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl',['$rootScope','$scope','$http','localStorageService', function ($rootScope, $scope, $http, localStorageService) {
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

		$( "#modelsearch" ).autocomplete({
			source: "http://192.168.1.2/autocomplete.php",
			select: function( event, ui ) {
				handle_select(ui.item.label);
			}
		});

		function handle_select(label) {
			var i = label.indexOf(" ");
			var j = label.indexOf("(");
			var l = label.length;

			var make = label.substring(0,i);
			var model = '';
			var type = '';
			if (j == -1) {
				model = label.substring(i+1,l);
			} else {
				model = label.substring(i+1,j-1);
				type = label.substring(j,l);
			}
			
			if (type=='') {
				var qs="http://192.168.1.2/getdata.php".concat("?make=",make,"&model=",model);
			}
			else {
				var qs="http://192.168.1.2/getdata.php".concat("?make=",make,"&model=",model,"&type=",type);
			}
			console.log(qs);
			$http.get(qs).success(function(response) {console.log(response);});
		}

  }]);
