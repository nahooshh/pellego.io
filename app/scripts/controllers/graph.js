'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('GrphCtrl',['$rootScope','$scope', 'Dataservice','$compile', function ($rootScope, $scope, Dataservice, $compile) {

		if (Dataservice.selected.length > 0) {$rootScope.nav=false;$rootScope.sbar=false;}
		else {$rootScope.nav=true;$rootScope.sbar=true;}
		$rootScope.navsearch=true;
		$rootScope.navmodelsearch=false;

		
		$('.selectpicker').selectpicker();
		var data=Dataservice.all_data();
		$('#SortBy').change(function () {
			display_result();
		});
		display_result();
		
		function display_result() {
			console.log("indisplay result; all:",Dataservice.all);
			data=Dataservice.all_data();

			$("#SearchResults").empty();		
			var sortby=$('#SortBy').val();
			
			switch (sortby) {
				case "1":
					data.sort(function(a,b) {	return a[1].localeCompare(b[1]) } );
					break;
				case "2":
					data.sort(function(a,b) {	return parseFloat(b[2]) - parseFloat(a[2]) } );
					break;
				case "3":
					data.sort(function(a,b) {	return parseFloat(b[3]) - parseFloat(a[3]) } );
					break;
				case "4":
					data.sort(function(a,b) {	return parseFloat(b[4]) - parseFloat(a[4]) } );
					break;
				case "5":
					data.sort(function(a,b) {	return parseFloat(b[5]) - parseFloat(a[5]) } );
					break;
				case "6":
					data.sort(function(a,b) {	return parseFloat(b[6]) - parseFloat(a[6]) } );
					break;
				default:
						console.log("here");
						break;
			}
			
			for (var j = 0; j < data.length; j++) {
				var specid=data[j][0];
				var label=Dataservice.get_label(specid);
				var points=Dataservice.get_points(specid);
				var response=Dataservice.get_colors(specid);
				//var colors=[];
				var links=[];
				//var listopt="";
	
				
				for (var i = 0; i < response.length; i++) {
					//var color=response[i].replace("_", " ");
					var link="".concat("images/phonepics2/",specid,"/",specid,"_",response[i],"-small_pellego.jpeg");
					//colors.push(color);
					links.push(link);
					
					//listopt=listopt.concat("<li id=\"2_", specid, "_", response[i], "\" val=\"", link, "\" ");
					//listopt=listopt.concat("ng-click=\"getcolorpic(",specid,"\,\'",link,"\'",")\" style=\"cursor:pointer;\">",color,"</li>");
				}

				var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel2_", specid, "\"><div class=\"thumbnail\">", 
			"<img id=\"pic2_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div>",
			"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
			"<div class=\"points-details\">","<p>points:",points[0],"</p><p>hardware points:",points[1],"</p>",
			"<p>display points:",points[2],"</p><p>camera points:",points[3],"</p>","</div>",
		//"<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" style=\"position:absolute;bottom:27px;left:0px;\">Shortlist</button>",
			//"<div class=\"btn-group\" style=\"position:absolute;bottom:5px;left:0px;\">",
			//"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
			"</div>",
			//"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div>",
			"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" >X</button>",
			"<input type=\"checkbox\" class=\"checkbox\" style=\"margin-top:20px;\" id=\"check_",specid,"\"/>",
			"</div></div>");

				//console.log(entry);
				$("#SearchResults").append($compile(entry)($scope));
				check(specid);
			}
			$('.checkbox').change(function(event) {
				var add = $('#'.concat(event.target.id)).prop('checked');
				var specid=event.target.id.split("check_")[1];
				var id2="#".concat("sel2_",specid);
				if (add) {
					Dataservice.add_sel(specid);
					$(id2).css("background-color", "rgb(245, 247, 222)");
					$rootScope.$emit('SLAddEvent', specid);
				} else {
					Dataservice.rem_sel(specid);
					$(id2).css("background-color", "white");
					$rootScope.$emit('SLRemEvent', specid);
				}
				highlight();
			});
			}

		/*
		$scope.getcolorpic=function(specid,val) {
			var id="#pic2_".concat(specid);
			$(id).attr('src',val);
		}*/
		$scope.remove=function(specid) {
			if (Dataservice.selected.indexOf(specid) != -1) {
				Dataservice.rem_sel(specid);
				check(specid);
				$rootScope.$emit('SLRemEvent', specid);			
			}
			Dataservice.rem_label(String(specid));
			Dataservice.query_alt=1;
			$("#sel2_".concat(specid)).remove();
			reload();
		}

		function check (specid) {
			var id="#".concat("check_",specid);
			var id2="#".concat("sel2_",specid);
			if (Dataservice.selected.indexOf(specid) != -1) {
				$(id2).css("background-color", "rgb(245, 247, 222)");
				$(id).attr('checked', true);
			} else {
				$(id2).css("background-color", "white");
				$(id).attr('checked', false);
			}
		}

		$rootScope.$on('ReloadGraphEvent', function(event, args) { 
			console.log('received ReloadGraphEvent');
			display_result();
			reload();
		});

		$rootScope.$on('SLEvent', function(event, specid) {
			console.log('received SLEvent');
			check(specid);
			highlight();
		});

		$rootScope.$on('someEvent', function(event, args) { reload(); });

		$("#A12sel" ).val(Dataservice.graph_sel);
		
		reload();
		$("#A12sel" ).change(function() {
			Dataservice.graph_sel=$("#A12sel option:selected").val();
			reload();
		});

		
		
		function highlight() {	
			//console.log('in highlight, sid:',Dataservice.sid,'selected',Dataservice.selected);
			for (var j = 0; j < Dataservice.sid.length; j++) {
				var index=Dataservice.selected.indexOf(Dataservice.sid[j]);
				if (index != -1) {
					Dataservice.plot.highlight(Dataservice.series[0],Dataservice.plotdata[j]);
				} else {
					Dataservice.plot.unhighlight(Dataservice.series[0],Dataservice.plotdata[j]);
				}
			}
		}
		function reload() {
			var options = {points: {show: true},
				grid: {hoverable: true,clickable: true},
				xaxis: {transform:  function(v) {return v < 0 ?  0: Math.sqrt(v);},
					inverseTransform: function (v) {return Math.pow(v,2);}},
				yaxis: {zoomRange: [100, 100], panRange: [0, 100], min:0,max:100},
				zoom: {interactive: true},
				pan: {interactive: true},
			}

			Dataservice.plotdata=[];
			Dataservice.price1=[];
			Dataservice.nam=[];
			Dataservice.sid=[];

			var id = 0;
			var opt=Dataservice.graph_sel;
			switch(opt) {
				case 'ov':
					id = 2;
					break;
				case 'hw':
					id = 3;
					break;
				case 'dis':
					id = 4;
					break;
				case 'cam':
					id = 5;
					break;
			}
			
			for (var key in Dataservice.all) {
  			if (Dataservice.all.hasOwnProperty(key)) {
    			//console.log(key + " -> " + Dataservice.all[key]);
					var pr=Dataservice.all[key][0][1];
					var ov=Dataservice.all[key][0][id];
					Dataservice.plotdata.push([pr,ov]);
					Dataservice.price1.push(pr);
					Dataservice.nam.push(Dataservice.all[key][0][0]);
					Dataservice.sid.push(key);
  			}
			}
			options.xaxis.panRange = [1000, Math.max.apply(Math, Dataservice.price1)+5000];
			options.xaxis.zoomRange = [5000, Math.max.apply(Math, Dataservice.price1)+5000];
			/*if ((Dataservice.xmin==0) && (Dataservice.xmax==0) && (plotdata.length > 0)) {
				Dataservice.xmin = 1000;
				Dataservice.xmax = Math.max.apply(Math, price)+5000;
			}
			options.xaxis.min = Dataservice.xmin;
			options.xaxis.max = Dataservice.xmax;*/
			options.xaxis.min = Math.min.apply(Math, Dataservice.price1)-1000;
			options.xaxis.max = Math.max.apply(Math, Dataservice.price1)+5000;
			Dataservice.plot = $.plot("#A12plot", [{ data: Dataservice.plotdata}], options);
			Dataservice.series=Dataservice.plot.getData();
			highlight();
	
			/*function highlight() {	
				for (var j = 0; j < sid.length; j++) {
					var index=Dataservice.selected.indexOf(sid[j]);
					if (index != -1) {
						plot.highlight(series[0],plotdata[j]);
					} else {
						plot.unhighlight(series[0],plotdata[j]);
					}
				}
			}*/
			$("#A12plot").bind("plothover", function (event, pos, item) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
					$("#A12tt").html(Dataservice.nam[item.dataIndex])
						.css({'top': item.pageY+5-$(window).scrollTop() +'px',
						'left': item.pageX+5+'px'}).fadeIn(200);
				} else {
					$("#A12tt").hide();
				} 
			});
			$("#A12plot").bind("plotclick", function (event, pos, item) {
				if (item) {
					var specid=Dataservice.sid[item.dataIndex];
					console.log("specid",specid);
					var index=Dataservice.selected.indexOf(specid);
					if (index != -1) {
						Dataservice.rem_sel(specid);
						check(specid);
						$rootScope.$emit('SLRemEvent', specid);
					} else {
						Dataservice.add_sel(specid);
						check(specid);
						$rootScope.$emit('SLAddEvent', specid);
					}
					highlight();
				}
			});
			$("#A12plot").bind("plotzoom", function (event, plot) {
				var axes = Dataservice.plot.getAxes();
				Dataservice.xmin = axes.xaxis.min.toFixed(2);
				Dataservice.xmax = axes.xaxis.max.toFixed(2);
			});
			$("#A12plot").bind("plotpan", function (event, plot) {
				var axes = Dataservice.plot.getAxes();
				Dataservice.xmin = axes.xaxis.min.toFixed(2);
				Dataservice.xmax = axes.xaxis.max.toFixed(2);
			});

		}	

  }]);
