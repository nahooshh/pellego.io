'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('SpcCtrl',['$rootScope','$scope','$http','localStorageService', 'Dataservice', '$compile', function ($rootScope, $scope, $http, localStorageService, Dataservice, $compile) {
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

		function testScroll(ev){
			if ( $(window).scrollTop() > 150 ) {
				$('#comp-header-fixed').show();
			} else {
				$('#comp-header-fixed').hide();  
			}
		}
      //$('#comp-header-fixed').fadeIn('slow');
    	//$('#comp-header-fixed').fadeOut('slow');  
			/*
    	if(window.pageYOffset>200) {
				$("#comp-header-fixed").css("display:block");
				console.log('appear');
			} else {
				$("#comp-header-fixed").css("display:none");
				console.log('hide');
			}
			*/
		window.onscroll=testScroll

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

			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i]) $("#spcscrollhdr".concat(i)).html(Dataservice.get_label(Dataservice.spec_col[i]));
			}
		

			for (var j = 0; j < 4; j++) {	
				$("#specov".concat(j)).empty();
				var specid = Dataservice.spec_col[j];
				if (specid == 0) {continue;}
				var label=Dataservice.get_label(specid);
				var points=Dataservice.get_points(specid);
				var response=Dataservice.get_colors(specid);
				var links=[];

				for (var i = 0; i < response.length; i++) {
					var link="".concat("images/phonepics2/",specid,"/",specid,"_",response[i],"-small_pellego.jpeg");
					links.push(link);
				}

				var entry="<div class=\"spec-elem\" ".concat("id=\"sel3_", specid, "\"><div class=\"thumbnail\">", 
				"<img id=\"pic3_", 2, "\" src=\"",links[0],"\" alt=\"Image\"></div>",
				"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
				"<div class=\"points-details\">","<p>points:",points[0],"</p><p>hardware points:",points[1],"</p>",
				"<p>display points:",points[2],"</p><p>camera points:",points[3],"</p>","</div>",
				"</div></div>");
				$("#specov".concat(j)).append(entry);
			}
		
			
			var specs=[];
			var q=[];
			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i] ==0) continue;
				var specs=Dataservice.get_specs(Dataservice.spec_col[i]);
				if (specs == false) { q.push(Dataservice.spec_col[i]); }
				else {specs[i] = specs;}
			}
			if (q.length) {
				var query="http://192.168.1.2/pellego/php/specs.php?specid=".concat(q.join());
				console.log(query);
				$http.get(query).success(function(response) {
					console.log(response);
				});
			}
		
			

			
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
