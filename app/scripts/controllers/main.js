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
		if (Dataservice.selected.length > 0) {
			$rootScope.sbar=false;
			$rootScope.disgoto = false;
		} else {
			$rootScope.sbar=true;
			$rootScope.disgoto = true;
		}
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
			source: "http://mac/pellego/php/autocomplete.php",
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
				var qs="http://mac/pellego/php/getdata.php".concat("?make=",make,"&model=",model);
			}
			else {
				var qs="http://mac/pellego/php/getdata.php".concat("?make=",make,"&model=",model,"&type=",type);
			}
			//console.log(qs);
			$http.get(qs).success(function(response) {
				//console.log(response);
				var elem=[response[0],label];
				Dataservice.add_sel(elem);
				Dataservice.add_label(label, response);
				$rootScope.sbar=false;
				$rootScope.disgoto=false;
				//console.log($scope.list);
				//console.log(Dataservice.all);
				//console.log('sending event',elem);
				//$rootScope.$emit('someEvent', elem);
			});
		}

  }]);
