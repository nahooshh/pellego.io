'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RevCtrl',['$rootScope','$scope','$http','localStorageService','Dataservice',function ($rootScope, $scope, $http, localStorageService,Dataservice) {
		$rootScope.tab=false;
	
		var qs="http://192.168.1.2/rev.php"	
		$http.get(qs).success(function(response) {
			console.log(response);
			$("#revBattery .panel-body").empty();
			for (var i=0; i<response.length;i++) {
				var fea=response[i][0];
				var line='<p>'.concat(fea,' : ');
				for (var j=1; j<response[i].length;j++) {
					var adj=response[i][j][0];
					var dat=response[i][j][1].split(',');
					var num=dat[0];
					var href=dat[1];	
					adj=adj.concat('(', num,')');
					var add="<a href=\"".concat(href,'\">  ',adj,'  </a>');
					line=line.concat(add);
				}
				line=line.concat('</p>');
				console.log(line);
				$("#revBattery .panel-body").append(line);
			}
		});

  }]);
