'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('SrchCtrl',['$rootScope','$scope','localStorageService', 'Dataservice', function ($rootScope, $scope, localStorageService, Dataservice) {
		$rootScope.tab=false;
		
		$scope.list = Dataservice.getsel();
		$scope.x = 1;

		$scope.testfunc = function () {
			var x = document.getElementById("test");
			Dataservice.add_sel($scope.x);
			console.log($scope.list);
		};


	$('.selectpicker').selectpicker();
	$("#priceSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [Dataservice.price['lo'],Dataservice.price['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 1000, 1000 ],
			'30%': [ 10000, 2000 ],
			'80%': [ 40000, 5000 ],
			'90%': [ 60000, 10000],
			'max': [ 100000 ]
		}
	});
	$("#priceSlider").on('slide',  function() {
		Dataservice.price['lo'] = $('#plv').val();
		Dataservice.price['hi'] = $('#phv').val();
	});
	$("#priceSlider").Link('lower').to($('#plv'));
	$("#priceSlider").Link('upper').to($('#phv'));

	$('#sBrand').selectpicker('val', Dataservice.brand);
	$("#sBrand").change(function(){
		Dataservice.brand=$("#sBrand").val();
	});

	$('#facesize0').attr('checked', Dataservice.facesize[0]);
	$('#facesize1').attr('checked', Dataservice.facesize[1]);
	$('#facesize2').attr('checked', Dataservice.facesize[2]);
	$('.facesize').change(function() {
		Dataservice.facesize=[$('#facesize0').prop('checked'),$('#facesize1').prop('checked'),$('#facesize2').prop('checked')];
	});

	$('#thickness0').attr('checked', Dataservice.thickness[0]);
	$('#thickness1').attr('checked', Dataservice.thickness[1]);
	$('#thickness2').attr('checked', Dataservice.thickness[2]);
	$('.thickness').change(function() {
		Dataservice.thickness=[$('#thickness0').prop('checked'),$('#thickness1').prop('checked'),$('#thickness2').prop('checked')];
	});

	$('#weight').attr('checked', Dataservice.weight[0]);
	$('#weight1').attr('checked', Dataservice.weight[1]);
	$('#weight2').attr('checked', Dataservice.weight[2]);
	$('.weight').change(function() {
		Dataservice.weight=[$('#weight0').prop('checked'),$('#weight1').prop('checked'),$('#weight2').prop('checked')];
	});
	
	if (Dataservice.os != 0) {
		$('#sOS').selectpicker('val', Dataservice.os);
		populate_os_details();
		$('#sCurOS').selectpicker('val', Dataservice.os_curr);
		$('#sFutOS').selectpicker('val', Dataservice.os_upgr);
	}
	$("#sOS").change(function(){
		Dataservice.os=$("#sOS").val();
		populate_os_details();
		Dataservice.os_curr=[];
		Dataservice.os_upgr=[];
		$('#sCurOS').selectpicker('val', Dataservice.os_curr);
		$('#sFutOS').selectpicker('val', Dataservice.os_upgr);
	});
	function populate_os_details() {
		for (var i=1;i<6;i++) {
			if (i==Dataservice.os) {continue;}
			$("#sCurOS ."+i ).show();
			$("#sCurOS ."+i).hide();
			$("#sFutOS ."+i ).show();
			$("#sFutOS ."+i).hide();
		}
		$("#sCurOS ."+Dataservice.os ).show();
		$('#sCurOS').selectpicker('refresh');
		$("#sFutOS ."+Dataservice.os ).show();
		$('#sFutOS').selectpicker('refresh');
	}
	$("#sCurOS").change(function(){
		Dataservice.os_curr=$("#sCurOS").val();
	});
	$("#sFutOS").change(function(){
		Dataservice.os_upgr=$("#sFutOS").val();
	});
		
	
	
	

	$("#cpufreqSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ .5,4],
		format: wNumb({
			decimals: 0
		}),
		range: {
			 'min': [ .5, .2 ],
			'max': [ 4 ]
		} 
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#cpufreqSlider").Link('lower').to($('#frelv'));
	$("#cpufreqSlider").Link('upper').to($('#frehv'));

	$("#ramSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ .512,1],
		format: wNumb({
			decimals: 3
		}),
		range: {
			'min': [ .128, .128 ],
			'max': [ 4 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#ramSlider").Link('lower').to($('#ramlv'));
	$("#ramSlider").Link('upper').to($('#ramhv'));

	$("#intrSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 2,8],
		format: wNumb({
			decimals: 1
		}),
		range: {
			'min': [ 0, 1 ],
			'max': [ 64 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#intrSlider").Link('lower').to($('#intrlv'));
	$("#intrSlider").Link('upper').to($('#intrhv'));


	$("#cardSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 0,0],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 0, 1 ],
			'max': [ 64 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#cardSlider").Link('lower').to($('#cardlv'));
	$("#cardSlider").Link('upper').to($('#cardhv'));


	$("#battSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 1000,1200],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 100, 100 ],
			'max': [ 5000 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#battSlider").Link('lower').to($('#battlv'));
	$("#battSlider").Link('upper').to($('#batthv'));

	$("#scrSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 3.5,4.5],
		format: wNumb({
			decimals: 1
		}),
		range: {
			'min': [ 2, .1 ],
			'max': [ 7 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#scrSlider").Link('lower').to($('#scrlv'));
	$("#scrSlider").Link('upper').to($('#scrhv'));

	$("#disdenSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 50,500],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 50, 50 ],
			'max': [ 500 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#disdenSlider").Link('lower').to($('#disdenlv'));
	$("#disdenSlider").Link('upper').to($('#disdenhv'));

	$("#pricamSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 50,500],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 50, 50 ],
			'max': [ 500 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#pricamSlider").Link('lower').to($('#pricamlv'));
	$("#pricamSlider").Link('upper').to($('#pricamhv'));

	$("#prividSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 50,500],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 50, 50 ],
			'max': [ 500 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#prividSlider").Link('lower').to($('#prividlv'));
	$("#prividSlider").Link('upper').to($('#prividhv'));


	$("#seccamSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 50,500],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 50, 50 ],
			'max': [ 500 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#seccamSlider").Link('lower').to($('#seccamlv'));
	$("#seccamSlider").Link('upper').to($('#seccamhv'));

	$("#secvidSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ 50,500],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 50, 50 ],
			'max': [ 500 ]
		}
	});
	//$("#cpufreqSlider").on('slide', dummy);
	$("#secvidSlider").Link('lower').to($('#secvidlv'));
	$("#secvidSlider").Link('upper').to($('#secvidhv'));


  }]);
