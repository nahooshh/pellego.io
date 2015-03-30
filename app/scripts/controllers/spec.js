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
		$rootScope.nav=false;
		$rootScope.navsearch=false;
		$rootScope.navmodelsearch=false;

		$rootScope.sbar=true;
		$scope.shortlist = Dataservice.getselected();
		var id=0;
		$(".shortlist-elem").each(function(){
				var cln = $(this).clone();
				var entry = "<th style=\"min-width:300px\" id=\"dis_sel".concat(id, "\"></th>");
				//var entry = "<th class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3\" id=\"dis_sel".concat(id, "\">RANDOM</th>");
				$('#tr0').append(entry);
				$('#dis_sel'.concat(id)).append($compile(cln)($scope));
				id=id+1;
    });

		$scope.remove=function(setid) {
			console.log("removing",setid);
		}
  }]);
