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
		$rootScope.tab=false;
		$rootScope.sbar=false;


		
		$('.selectpicker').selectpicker();
		var data=Dataservice.all_data();
		$('#SortBy').change(function () {
			display_result();
		});
		display_result();
		
		function display_result() {

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
				//var response=Dataservice.get_colors(specid);
				//var colors=[];
				var links=[];
				var listopt="";
	
				/*
				for (var i = 0; i < response.length; i++) {
					var color=response[i].replace("_", " ");
					var link="".concat("images/phonepics2/",specid,"/",specid,"_",response[i],"-small_pellego.jpeg");
					colors.push(color);
					links.push(link);
					
					listopt=listopt.concat("<li id=\"2_", specid, "_", response[i], "\" val=\"", link, "\" ");
					listopt=listopt.concat("ng-click=\"getcolorpic(",specid,"\,\'",link,"\'",")\" style=\"cursor:pointer;\">",color,"</li>");
				}*/

				var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel2_", specid, "\"><div class=\"thumbnail\">", 
			"<img id=\"pic2_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div>",
			"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
			"<div class=\"points-details\">","<p>points:",points[0],"</p><p>display points:",points[1],"</p>",
			"<p>camera points:",points[2],"</p><p>hardware points:",points[3],"</p>","</div>",
		//"<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" style=\"position:absolute;bottom:27px;left:0px;\">Shortlist</button>",
			//"<div class=\"btn-group\" style=\"position:absolute;bottom:5px;left:0px;\">",
			//"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
			"</div>",
			//"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div>",
			"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" >X</button>",
			"<input type=\"checkbox\" class=\"checkbox\" style=\"margin-top:20px;\"/>",
			"</div></div>");

				//console.log(entry);
				$("#SearchResults").append($compile(entry)($scope));
			}
		}
		/*
		$scope.getcolorpic=function(specid,val) {
			var id="#pic2_".concat(specid);
			$(id).attr('src',val);
		}*/
		$scope.remove=function(specid) {
			Dataservice.rem_all(String(specid));
			$("#sel2_".concat(specid)).remove();
		}
		//display_result();



		$rootScope.$on('someEvent', function(event, args) { reload(); });

		$("#A12sel" ).val(Dataservice.graph_sel);
		
		reload();
		$("#A12sel" ).change(function() {
			Dataservice.graph_sel=$("#A12sel option:selected").val();
			reload();
		});

		var xmin=0;
		var xmax=0;
		
		function reload() {
			var options = {points: {show: true},
				grid: {hoverable: true,clickable: true},
				xaxis: {transform:  function(v) {return v < 0 ?  0: Math.sqrt(v);},
					inverseTransform: function (v) {return Math.pow(v,2);}},
				yaxis: {zoomRange: [100, 100], panRange: [0, 100], min:0,max:100},
				zoom: {interactive: true},
				pan: {interactive: true},
			}

			var plotdata=[];
			var price=[];
			var nam=[];
			var sid=[];
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
					plotdata.push([pr,ov]);
					price.push(pr);
					nam.push(Dataservice.all[key][0][0]);
					sid.push(key);
  			}
			}
			options.xaxis.panRange = [1000, Math.max.apply(Math, price)+5000];
			options.xaxis.zoomRange = [5000, Math.max.apply(Math, price)+5000];
			if ((Dataservice.xmin==0) && (Dataservice.xmax==0) && (plotdata.length > 0)) {
				Dataservice.xmin = 1000;
				Dataservice.xmax = Math.max.apply(Math, price)+5000;
			}
			options.xaxis.min = Dataservice.xmin;
			options.xaxis.max = Dataservice.xmax;
			var plot = $.plot("#A12plot", [{ data: plotdata}], options);
			var series=plot.getData();
			highlight();
	
			function highlight() {	
				for (var j = 0; j < sid.length; j++) {
					var index=Dataservice.selected.indexOf(sid[j]);
					if (index != -1) {
						plot.highlight(series[0],plotdata[j]);
					} else {
						plot.unhighlight(series[0],plotdata[j]);
					}
				}
			}

			$("#A12plot").bind("plothover", function (event, pos, item) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
					$("#A12tt").html(nam[item.dataIndex])
						.css({'top': item.pageY+5-$(window).scrollTop() +'px',
						'left': item.pageX+5+'px'}).fadeIn(200);
				} else {
					$("#A12tt").hide();
				} 
			});
			$("#A12plot").bind("plotclick", function (event, pos, item) {
				if (item) {
					var setid=sid[item.dataIndex];
					var index=Dataservice.selected.indexOf(setid);
					if (index != -1) {
						Dataservice.rem_sel(setid)
					} else {
						Dataservice.add_sel(setid)
					}
					highlight();
				}
			});
			$("#A12plot").bind("plotzoom", function (event, plot) {
				var axes = plot.getAxes();
				Dataservice.xmin = axes.xaxis.min.toFixed(2);
				Dataservice.xmax = axes.xaxis.max.toFixed(2);
			});
			$("#A12plot").bind("plotpan", function (event, plot) {
				var axes = plot.getAxes();
				Dataservice.xmin = axes.xaxis.min.toFixed(2);
				Dataservice.xmax = axes.xaxis.max.toFixed(2);
			});

		}	

  }]);
