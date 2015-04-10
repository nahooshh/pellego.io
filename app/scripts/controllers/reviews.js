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

		reload();
		$('.selectpicker').selectpicker();

		$rootScope.$on('SLEvent', function(event, specid) {
			console.log('rev received SLEvent');
			reload();
		});
		$("#revmodel").change(function() {
			Dataservice.rev_model=$("#revmodel").val();
			reload();
		});
		$("#revcol").change(function() {
			Dataservice.rev_col=$("#revcol").val();
			reload();
		});
		console.log($("#revcol").val());

		function reload() {
			$("#revBattery").empty();
			$("#revBody").empty();
			$("#revCamera").empty();
			$("#revDisplay").empty();
			$("#revPerformance").empty();
			$("#revSpecs").empty();
			$("#revOverall").empty();
			$("#revBattery").empty();

			var d = Dataservice.selected_data();
			entry="";
			for (var i = 0; i < d.length; i++) {
				var entry =entry.concat("<option value=\"",d[i][0],"\">",d[i][1],"</option>");
			}
			$("#revmodel").html(entry);
			$("#revmodel").selectpicker('refresh');
			$("#revmodel").selectpicker('val', Dataservice.rev_model);
		//	$("#revcol").selectpicker('val', Dataservice.rev_col);
		
			if (Dataservice.rev_model==0) {
				fillbody2([false]);
				return;
			}

			var rev;
			var do_q=false;
			var this_rev= Dataservice.get_rev(Dataservice.rev_model,Dataservice.rev_col);
			if (this_rev==false) do_q=true;
			else {
				rev=this_rev;
				console.log('got response from cache for: setid',Dataservice.rev_model);
			}
			if (do_q) {
				var qs="http://192.168.1.2/pellego/php/rev.php?setid=".concat(Dataservice.rev_model,"&col=",Dataservice.rev_col);
				console.log(qs);
				$http.get(qs).success(function(response) {
					console.log(response);
					if (Dataservice.revs.hasOwnProperty(Dataservice.rev_model)) {Dataservice.revs[Dataservice.rev_model][Dataservice.rev_col]=response;}
					else {
						Dataservice.revs[Dataservice.rev_model]={};
						Dataservice.revs[Dataservice.rev_model][Dataservice.rev_col]=response;
					}
					console.log('added to cache:',Dataservice.revs);
					fillbody2(response);
				});
			} else {
				fillbody2(rev);
			}
		}
					
		function fillbody2(response) {
				if (response.length == 0) {
					line="<p>No Data Found</p>";
					$("#revBattery").append(line);
					$("#revBody").append(line);
					$("#revCamera").append(line);
					$("#revDisplay").append(line);
					$("#revPerformance").append(line);
					$("#revSpecs").append(line);
					$("#revOverall").append(line);
					return;
				}
				if (response[0]==false) {
					line="<p>Please Select a Model</p>";
					$("#revBattery").append(line);
					$("#revBody").append(line);
					$("#revCamera").append(line);
					$("#revDisplay").append(line);
					$("#revPerformance").append(line);
					$("#revSpecs").append(line);
					$("#revOverall").append(line);
					return;
				}
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
		}

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

