'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('GrphCtrl',['$rootScope','$scope', 'Dataservice', function ($rootScope, $scope, Dataservice) {
		$rootScope.tab=false;

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
					var pr=Dataservice.all[key][1];
					var ov=Dataservice.all[key][id];
					plotdata.push([pr,ov]);
					price.push(pr);
					nam.push(Dataservice.all[key][0]);
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
