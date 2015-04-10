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
		//console.log($("#revcol").val());

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

			if (Dataservice.selected.indexOf(Dataservice.rev_model) == -1) {Dataservice.rev_model=0;}
		
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
					var line="<p>No Data Found</p>";
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
					var line="<p>Please Select a Model</p>";
					$("#revBattery").append(line);
					$("#revBody").append(line);
					$("#revCamera").append(line);
					$("#revDisplay").append(line);
					$("#revPerformance").append(line);
					$("#revSpecs").append(line);
					$("#revOverall").append(line);
					return;
				}


				var revData={'batt':[[],[],0,0,0,'#revBattery','#batheading'],'body':[[],[],0,0,0,'#revBody','#bodheading'],'cam':[[],[],0,0,0,'#revCamera','#camheading'],'disp':[[],[],0,0,0,'#revDisplay','#disheading'],'perf':[[],[],0,0,0,'#revPerformance','#perheading'],'spec':[[],[],0,0,0,'#revSpecs','#spcheading'],'ovr':[[],[],0,0,0,'#revOverall','#ovrheading']}

				for (var i=0; i<response.length;i++) {
					var fea=response[i][0];
					if (fea=="SUMMARY_RC") {fea="recommendation";}
					if (fea=="SUMMARY_PRICE") {fea="price";}

					var section='';
					if ((fea == "battery") || (fea == "battery_life")) {
						section='batt';
					}
					else if ((fea == "camera") || (fea == "camera_resolution") || (fea == "camera_flash") || (fea == "picture_quality") || (fea == "video_quality") || (fea == "low_light_performance") || (fea == "secondary_camera") || (fea == "primary_camera") ) {
						section='cam';
					}
					else if ((fea == "built_quality") || (fea == "body_covers") || (fea == "buttons")) {
						section='body';
					}
					else if ((fea == "display") || (fea == "display_size") || (fea == "display_resolution") || (fea == "viewing_angle") || (fea == "touch_response")) {
						section='disp';
					}
					else if ((fea == "performance") || (fea == "apps") || (fea == "video") || (fea == "music") || (fea == "gaming") || (fea=="photography") || (fea == "sound_quality")) {
						section='perf';
					}
					else if ((fea == "headset") || (fea == "processor") || (fea == "gpu") || (fea == "ram") || (fea == "internal_memory")) {
						section='spec';
					}
					else if ((fea == "phone") || (fea == "recommendation") || (fea == "price")) {
						section='ovr';
					}
					else {continue;}


					var elems=[]
					for (var j=1; j<response[i].length;j++) {
						var tone="grey";
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
						var num=parseInt(dat[0]);
						var href="revdata/revver_1/".concat(dat[1]);
						elems.push([num,adj,href,tone]);
						revData[section][1].push(num);
						if (tone=="green") {revData[section][2]=revData[section][2]+num;}
						if (tone=="grey") {revData[section][3]=revData[section][3]+num;}
						if (tone=="red") {revData[section][4]=revData[section][4]+num;}
					}
					//elems.sort(function(a,b) {	return parseFloat(b[0]) - parseFloat(a[0]) } );
					elems.sort(function(a,b) {	return a[3].localeCompare(b[3]) } );
					revData[section][0].push([fea,elems]);
				}
				console.log('revData:',revData);

				for (var section in revData) {
   				if (revData.hasOwnProperty(section) ) {
		
						var secData=revData[section];
						//console.log(secData[2],secData[3],secData[4]);
						var g=secData[2];
						var m=secData[3];
						var b=secData[4];
						var t=g+m+b;
						var g1=Math.round(g*100/t);
						var m1=g1+Math.round(m*100/t);
						var b1=100;
						//$(secData[6]).css({"background-color": "yellow", "font-size": "200%"});
						$(secData[6]).css({"background-image": "linear-gradient(90deg, #70AB8F ".concat(g1,"%, #383127 ",g1 ,"%, #383127 ",m1 ,"%, #DC5B21 ",m1 ,"%, #DC5B21 100%)" )});

						var nums = secData[1];
						nums.sort(function(a,b) {  return parseFloat(b) - parseFloat(a) } );
						//li = get_font_list(num);
						//console.log(nums);

						var rows = secData[0];
						for (var i=0; i<rows.length;i++) {
							var fea=rows[i][0];
							//fea = fea.toUpperCase();
							var elems=rows[i][1];
							var line='<p style=\"padding-top:10px;font-size:18px;\">'.concat("<b>", fea.replace(/_/g," "), "</b>", " : </p> <p style=\"margin-top:-10px;\">");
							for (var j=0; j<elems.length;j++) {
								var elem=elems[j];
								var num=elem[0];
								//var fs = get_font(num,li);
								var fs = get_font(num);
								var adj=elem[1];
								var href=elem[2];
								var tone=elem[3];
								adj=adj.concat('(', num,')');
								var add="<a href=\"".concat(href, "\" style=\"color:", tone, ";font-size:", fs,  "px;\" data-toggle=\"modal\" data-target=\"#myModal\">  ", adj, "  </a>");
								line=line.concat(add);
							}
							line=line.concat('</p>');
							$(secData[5]).append(line);
							//console.log(line);
						}
   				}
				}

		}

		function get_font_list(num) {
			return [.5,2.5,4,5,6.9];
		}
		function get_font(n) {
			var num = Math.round(Math.log(n)*10);
			var idx=[Math.abs(num-5), Math.abs(num-25), Math.abs(num-40), Math.abs(num-50), Math.abs(num-69)];
			var i = idx.indexOf(Math.min.apply(Math, idx));
			return fsizes[i];
		}
		function mean(num) {
			var sum = num.reduce(function(a, b){return a+b;});
			return round(sum % num.length);
		}
		
		var fsizes=[13,16,18,20,22];

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

							/*if ((fea == "battery") || (fea == "battery_life")) {
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
							*/
