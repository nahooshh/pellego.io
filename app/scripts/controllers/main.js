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
		if (Dataservice.selected.length > 0) {$rootScope.nav=false;$rootScope.sbar=false;}
    else {$rootScope.nav=true;$rootScope.sbar=true;}
		$rootScope.navsearch=true;
		$rootScope.navmodelsearch=true;

		$scope.list = Dataservice.getsel();

		var mvp = document.getElementById('myViewport');
		mvp.setAttribute('content','width=device-width');
		/*
		//localStorageService.clearAll();
		var selectedInStore = localStorageService.get('selected');
		$scope.selected = selectedInStore || [];
		$scope.$watch('selected', function () {
  		localStorageService.set('selected', $scope.selected);
		}, true);
		*/

		$( ".modelsearch" ).autocomplete({
			source: "http://192.168.1.2/pellego/php/autocomplete.php",
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
				var qs="http://192.168.1.2/pellego/php/getdata.php".concat("?make=",make,"&model=",model);
			}
			else {
				var qs="http://192.168.1.2/pellego/php/getdata.php".concat("?make=",make,"&model=",model,"&type=",type);
			}
			$http.get(qs).success(function(response) {
				console.log('response:',response);
				var newset = Dataservice.add_label(label, response);
				console.log("newset:",newset);
				if (newset) {
					$rootScope.$emit('ReloadGraphEvent',"");
					console.log('sending ReloadGraphEvent from top.js');
				}
				var specid = response[0][0];
				var selset = Dataservice.add_sel(specid);
				if (selset) {
					$rootScope.$emit('SLAddEvent', specid);
					$rootScope.$emit('SLEvent', specid);
				}
				//console.log("selected", Dataservice.selected);
			});
		}

  }]);
