'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('SpcCtrl',['$rootScope','$scope','localStorageService', 'Dataservice', '$compile', function ($rootScope, $scope, localStorageService, Dataservice, $compile) {
		$rootScope.tab=false;
		$rootScope.sbar=true;
		$scope.shortlist = Dataservice.getselected();
		var id=0;
		$(".shortlist-elem").each(function(){
				var cln = $(this).clone();
				var entry = "<div id=\"dis_sel".concat(id, "\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3\"></div>");
				$('#speccomparison').append(entry);
				$('#dis_sel'.concat(id)).append($compile(cln)($scope));
				id=id+1;
    });

		$scope.remove=function(setid) {
			console.log("removing",setid);
		}
  }]);
