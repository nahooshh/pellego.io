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
		$rootScope.nav=false;
		$rootScope.navsearch=false;
		$rootScope.navmodelsearch=false;
		$rootScope.sbar=true;
	
		$('body').on('hidden.bs.modal', '.modal', function () {
      $(this).removeData('bs.modal');
		});

		//reload();
		//$('.selectpicker').selectpicker();

		var qs="http://192.168.1.2/pellego/php/rev.php?setid=468&col=revin"	
		$http.get(qs).success(function(response) {
			console.log(response);
			$("#revBattery").empty();
			$("#revBody").empty();
			$("#revCamera").empty();
			$("#revDisplay").empty();
			$("#revPerformance").empty();
			$("#revSpecs").empty();
			$("#revOverall").empty();
			$("#revBattery").empty();
			for (var i=0; i<response.length;i++) {
				var fea=response[i][0];
				if (fea=="SUMMARY_RC") {fea="recommendation";}
				if (fea=="SUMMARY_PRICE") {fea="price";}
				var line='<p>'.concat("<b>", fea.replace(/_/g," "), "</b>", ' : ');
				for (var j=1; j<response[i].length;j++) {
					var tone="black";
					var adj=response[i][j][0];
					if (adj.search("pos_") != -1) {
						adj=adj.replace("pos_","");
						if (adj=="data") {adj="positive";}
						tone="green";
					}
					if (adj.search("neg_") != -1)  {
						adj=adj.replace("neg_","");
						if (adj=="data") {adj="negative";}
						tone="red";
					}
					adj=adj.replace(/_/g," ");
			
					var dat=response[i][j][1].split(',');
					var num=dat[0];
					var href="revdata/revver_1/".concat(dat[1]);	
					adj=adj.concat('(', num,')');
					var add="<a href=\"".concat(href, "\" style=\"color:", tone, "\" data-toggle=\"modal\" data-target=\"#myModal\">  ", adj, "  </a>");
					line=line.concat(add);
				}
				line=line.concat('</p>');
				//console.log(line);

				if ((fea == "battery") || (fea == "battery_life")) {
					$("#revBattery").append(line);
				}
				else if ((fea == "camera") || (fea == "camera_resolution") || (fea == "camera_flash") || (fea == "picture_quality") || (fea == "video_quality") || (fea == "low_light_performance") || (fea == "secondary_camera") || (fea == "primary_camera") ) {
					$("#revCamera").append(line);
				}
				else if ((fea == "built_quality") || (fea == "body_covers") || (fea == "buttons")) {
					$("#revBody").append(line);
				}
				else if ((fea == "display") || (fea == "display_size") || (fea == "display_resolution") || (fea == "viewing_angle") || (fea == "touch_response")) {
					$("#revDisplay").append(line);
				}
				else if ((fea == "performance") || (fea == "apps") || (fea == "video") || (fea == "music") || (fea == "gaming") || (fea=="photography") || (fea == "sound_quality")) {
					$("#revPerformance").append(line);
				}
				else if ((fea == "headset") || (fea == "processor") || (fea == "gpu") || (fea == "ram") || (fea == "internal_memory")) {
					$("#revSpecs").append(line);
				}
				else if ((fea == "phone") || (fea == "recommendation") || (fea == "price")) {
					$("#revOverall").append(line);
				}
				else {console.log('ERROR');}
			}
		});
  }]);


			/*for (var i=0; i<response.length;i++) {
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
			}*/

