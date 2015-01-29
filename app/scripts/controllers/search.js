'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('SrchCtrl',['$rootScope','$scope','$http','localStorageService', 'Dataservice', function ($rootScope, $scope, $http, localStorageService, Dataservice) {
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
		data_request();
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
		
	$('#overall0').attr('checked', Dataservice.overall[0]);
	$('#overall1').attr('checked', Dataservice.overall[1]);
	$('#overall2').attr('checked', Dataservice.overall[2]);
	$('#overall3').attr('checked', Dataservice.overall[3]);
	$('.overall').change(function() {
		Dataservice.overall=[$('#overall0').prop('checked'),$('#overall1').prop('checked'),$('#overall2').prop('checked'),$('#overall3').prop('checked')];
	});
	
	$('#hardware0').attr('checked', Dataservice.hardware[0]);
	$('#hardware1').attr('checked', Dataservice.hardware[1]);
	$('#hardware2').attr('checked', Dataservice.hardware[2]);
	$('#hardware3').attr('checked', Dataservice.hardware[3]);
	$('.hardware').change(function() {
		Dataservice.hardware=[$('#hardware0').prop('checked'),$('#hardware1').prop('checked'),$('#hardware2').prop('checked'),$('#hardware3').prop('checked')];
	});
	
	$('#display0').attr('checked', Dataservice.display[0]);
	$('#display1').attr('checked', Dataservice.display[1]);
	$('#display2').attr('checked', Dataservice.display[2]);
	$('#display3').attr('checked', Dataservice.display[3]);
	$('.display').change(function() {
		Dataservice.display=[$('#display0').prop('checked'),$('#display1').prop('checked'),$('#display2').prop('checked'),$('#display3').prop('checked')];
	});

	$('#camera0').attr('checked', Dataservice.camera[0]);
	$('#camera1').attr('checked', Dataservice.camera[1]);
	$('#camera2').attr('checked', Dataservice.camera[2]);
	$('#camera3').attr('checked', Dataservice.camera[3]);
	$('.camera').change(function() {
		Dataservice.camera=[$('#camera0').prop('checked'),$('#camera1').prop('checked'),$('#camera2').prop('checked'),$('#camera3').prop('checked')];
	});

		
	$('#similar0').attr('value',Dataservice.similar0[0][0]);
	$('#soverall0').attr('checked', Dataservice.similar0[1][0]);
	$('#shardware0').attr('checked', Dataservice.similar0[1][1]);
	$('#sdisplay0').attr('checked', Dataservice.similar0[1][2]);
	$('#scamera0').attr('checked', Dataservice.similar0[1][3]);
	$( "#similar0" ).autocomplete({
		source: "http://192.168.1.2/autocomplete.php",
		delay: 500,
		minLength: 2,
		select: function( event, ui ) {
			Dataservice.similar0=[[ui.item.label,0,0,0],[false,false,false,false]];
			$('#soverall0').attr('checked', Dataservice.similar0[1][0]);
			$('#shardware0').attr('checked', Dataservice.similar0[1][1]);
			$('#sdisplay0').attr('checked', Dataservice.similar0[1][2]);
			$('#scamera0').attr('checked', Dataservice.similar0[1][3]);
			handle_select(ui.item.label,0);
		}
	});
	$('#soverall0, #shardware0, #sdisplay0, #scamera0, #similar0').change(function() {
		Dataservice.similar0=[Dataservice.similar0[0], [$('#soverall0').prop('checked'),$('#shardware0').prop('checked'),$('#sdisplay0').prop('checked'),$('#scamera0').prop('checked')]];
	});

	$('#similar1').attr('value',Dataservice.similar1[0][0]);
	$('#soverall1').attr('checked', Dataservice.similar1[1][0]);
	$('#shardware1').attr('checked', Dataservice.similar1[1][1]);
	$('#sdisplay1').attr('checked', Dataservice.similar1[1][2]);
	$('#scamera1').attr('checked', Dataservice.similar1[1][3]);
	$( "#similar1" ).autocomplete({
		source: "http://192.168.1.2/autocomplete.php",
		delay: 500,
		minLength: 2,
		select: function( event, ui ) {
			Dataservice.similar1=[[ui.item.label,0,0,0],[false,false,false,false]];
			$('#soverall1').attr('checked', Dataservice.similar1[1][0]);
			$('#shardware1').attr('checked', Dataservice.similar1[1][1]);
			$('#sdisplay1').attr('checked', Dataservice.similar1[1][2]);
			$('#scamera1').attr('checked', Dataservice.similar1[1][3]);
			handle_select(ui.item.label,1);
		}
	});
	$('#soverall1, #shardware1, #sdisplay1, #scamera1, #similar1').change(function() {
		Dataservice.similar1=[Dataservice.similar1[0], [$('#soverall1').prop('checked'),$('#shardware1').prop('checked'),$('#sdisplay1').prop('checked'),$('#scamera1').prop('checked')]];
	});


	$('#similar2').attr('value',Dataservice.similar2[0][0]);
	$('#soverall2').attr('checked', Dataservice.similar2[1][0]);
	$('#shardware2').attr('checked', Dataservice.similar2[1][1]);
	$('#sdisplay2').attr('checked', Dataservice.similar2[1][2]);
	$('#scamera2').attr('checked', Dataservice.similar2[1][3]);
	$( "#similar2" ).autocomplete({
		source: "http://192.168.1.2/autocomplete.php",
		delay: 500,
		minLength: 2,
		select: function( event, ui ) {
			Dataservice.similar2=[[ui.item.label,0,0,0],[false,false,false,false]];
			$('#soverall2').attr('checked', Dataservice.similar2[1][0]);
			$('#shardware2').attr('checked', Dataservice.similar2[1][1]);
			$('#sdisplay2').attr('checked', Dataservice.similar2[1][2]);
			$('#scamera2').attr('checked', Dataservice.similar2[1][3]);
			handle_select(ui.item.label,2);
		}
	});
	$('#soverall2, #shardware2, #sdisplay2, #scamera2, #similar2').change(function() {
		Dataservice.similar2=[Dataservice.similar2[0], [$('#soverall2').prop('checked'),$('#shardware2').prop('checked'),$('#sdisplay2').prop('checked'),$('#scamera2').prop('checked')]];
	});


	$('#similar3').attr('value',Dataservice.similar3[0][0]);
	$('#soverall3').attr('checked', Dataservice.similar3[1][0]);
	$('#shardware3').attr('checked', Dataservice.similar3[1][1]);
	$('#sdisplay3').attr('checked', Dataservice.similar3[1][2]);
	$('#scamera3').attr('checked', Dataservice.similar3[1][3]);
	$( "#similar3" ).autocomplete({
		source: "http://192.168.1.2/autocomplete.php",
		delay: 500,
		minLength: 2,
		select: function( event, ui ) {
			Dataservice.similar3=[[ui.item.label,0,0,0],[false,false,false,false]];
			$('#soverall3').attr('checked', Dataservice.similar3[1][0]);
			$('#shardware3').attr('checked', Dataservice.similar3[1][1]);
			$('#sdisplay3').attr('checked', Dataservice.similar3[1][2]);
			$('#scamera3').attr('checked', Dataservice.similar3[1][3]);
			handle_select(ui.item.label,3);
		}
	});
	$('#soverall3, #shardware3, #sdisplay3, #scamera3, #similar3').change(function() {
		Dataservice.similar3=[Dataservice.similar3[0], [$('#soverall3').prop('checked'),$('#shardware3').prop('checked'),$('#sdisplay3').prop('checked'),$('#scamera3').prop('checked')]];
	});


	function handle_select(label,id) {
		var i = label.indexOf(" ");
		var j = label.indexOf("(");
		var l = label.length;

		var make = label.substring(0,i);
		var model = '';
		var type = '';
		if (j == -1) {
			model = label.substring(i+1,l);
		} else {
			model = label.substring(i+1,j-1);
			type = label.substring(j,l);
		}
		
		if (type=='') {
			var qs="http://192.168.1.2/getdata.php".concat("?make=",make,"&model=",model);
		}
		else {
			var qs="http://192.168.1.2/getdata.php".concat("?make=",make,"&model=",model,"&type=",type);
		}
		$http.get(qs).success(function(response) {
			if (id == 0) {get_points0(response);}
			else if (id == 1) {get_points1(response);}
			else if (id == 2) {get_points2(response);}
			else if (id == 3) {get_points3(response);}
		});
	}
	function get_points0(response) {
		Dataservice.similar0[0]=[Dataservice.similar0[0][0]].concat(response.slice(2,response.length));
	}
	function get_points1(response) {
		Dataservice.similar1[0]=[Dataservice.similar1[0][0]].concat(response.slice(2,response.length));
	}
	function get_points2(response) {
		Dataservice.similar2[0]=[Dataservice.similar2[0][0]].concat(response.slice(2,response.length));
	}
	function get_points3(response) {
		Dataservice.similar3[0]=[Dataservice.similar3[0][0]].concat(response.slice(2,response.length));
	}







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

	function data_request() {
		var qs="http://192.168.1.2/getdata2.php".concat("?pricelo=",Dataservice.price['lo'],"&pricehi=",Dataservice.price['hi']);
		console.log(qs);
		$http.get(qs).success(function(response) {
			for (var i=1;i<response.length;i++) {
				Dataservice.add(response[i]);
				Dataservice.add_sel(response[i][0]);
			}
			console.log(Dataservice.all);
		});
	}

  }]);
