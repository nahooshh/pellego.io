'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl',['$rootScope','$scope','$http','localStorageService','Dataservice',function ($rootScope, $scope, $http, localStorageService,Dataservice) {
		$rootScope.tab=true;
		$scope.disgoto = true;
		$scope.list = Dataservice.getsel();

		/*
		//localStorageService.clearAll();
		var selectedInStore = localStorageService.get('selected');
		$scope.selected = selectedInStore || [];
		$scope.$watch('selected', function () {
  		localStorageService.set('selected', $scope.selected);
		}, true);
		*/

		$( "#modelsearch" ).autocomplete({
			source: "http://192.168.1.2/autocomplete.php",
			delay: 500,
			minLength: 2,
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
			//console.log(qs);
			$http.get(qs).success(function(response) {
				Dataservice.add_sel(response[0]);
				Dataservice.add_label(label, response);
				//console.log($scope.list);
				$scope.disgoto=false;
				console.log(Dataservice.all);
			});
		}

  }]);
