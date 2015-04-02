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

		reload();
		$('.selectpicker').selectpicker();

		$rootScope.$on('SLEvent', function(event, specid) {
			console.log('spec received SLEvent');
			reload();
		});

		function reload() {
			var d = Dataservice.selected_data();
			//console.log(d);
			for (var i = 0; i < 4; i++) {
				if (Dataservice.selected.indexOf(Dataservice.spec_col[i]) == -1) {Dataservice.spec_col[i]=0;}
			}
			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i] == 0) {
					for (var j = 0; j < d.length; j++) {
						var tmp_sid = d[j][0];
						var tmp_idx = Dataservice.spec_col.indexOf(tmp_sid);
						if (tmp_idx == -1) {
							Dataservice.spec_col[i]=tmp_sid;
							break;
						}
					}
				}
			}
			//console.log(Dataservice.spec_col);
			entry="";
			for (var i = 0; i < d.length; i++) {
				var entry =entry.concat("<option value=\"",d[i][0],"\">",d[i][1],"</option>");
			}
			$("#specmodel0").html(entry);
			$("#specmodel1").html(entry);
			$("#specmodel2").html(entry);
			$("#specmodel3").html(entry);
			$("#specmodel0").selectpicker('refresh');
			$("#specmodel1").selectpicker('refresh');
			$("#specmodel2").selectpicker('refresh');
			$("#specmodel3").selectpicker('refresh');
			$("#specmodel0").selectpicker('val', Dataservice.spec_col[0]);
			$("#specmodel1").selectpicker('val', Dataservice.spec_col[1]);
			$("#specmodel2").selectpicker('val', Dataservice.spec_col[2]);
			$("#specmodel3").selectpicker('val', Dataservice.spec_col[3]);
			

			

			
		}




		/*
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
		*/
  }]);
