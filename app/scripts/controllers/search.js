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
	
		if (Dataservice.selected.length > 0) {$rootScope.nav=false; $rootScope.sbar=false;}
    else {$rootScope.nav=true;$rootScope.sbar=true;}
		
		$rootScope.navsearch=true;
		$rootScope.navmodelsearch=false;

		var mvp = document.getElementById('myViewport');
		if (screen.width < 480) {
			mvp.setAttribute('content','width=480');
		} else {
			mvp.setAttribute('content','width=device-width');
		}
		//mvp.setAttribute('content','width=device-width');

		if (Dataservice.last_result) {$scope.disablesubmit=false;}
		else {$scope.disablesubmit=true;}
		$("#submit_button").text(String (Dataservice.last_result).concat(" models in consideration"));
		
		$scope.list = Dataservice.getsel();
		$scope.x = 1;

		$scope.testfunc = function () {
			var x = document.getElementById("test");
			Dataservice.add_sel($scope.x);
			console.log($scope.list);
		};

	var q = [1];

	$('.selectpicker').selectpicker();
	//reload();

	//function reload() {

	$scope.price=Dataservice.price;
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
	$("#priceSlider").on('slide',  function() { //Dataservice.price = $scope.price;
		$scope.price['lo']=$('#plv').val();
		$scope.price['hi']=$('#phv').val();
		Dataservice.price['lo'] = $scope.price['lo'];
		Dataservice.price['hi'] = $scope.price['hi'];
		$scope.test();
		//data_request();
	});
	$("#priceSlider").Link('lower').to($('#plv'));
	$("#priceSlider").Link('upper').to($('#phv'));

	$('#sBrand').selectpicker('val', Dataservice.brand);
	$("#sBrand").change(function(){
		Dataservice.brand=$("#sBrand").val();
		if (Dataservice.brand == null) {Dataservice.brand=[];}
		$scope.test();
	});

	$('#facesize0').attr('checked', Dataservice.facesize[0]);
	$('#facesize1').attr('checked', Dataservice.facesize[1]);
	$('#facesize2').attr('checked', Dataservice.facesize[2]);
	$('.facesize').change(function() {
		Dataservice.facesize=[$('#facesize0').prop('checked'),$('#facesize1').prop('checked'),$('#facesize2').prop('checked')];
		$scope.test();
	});

	$('#thickness0').attr('checked', Dataservice.thickness[0]);
	$('#thickness1').attr('checked', Dataservice.thickness[1]);
	$('#thickness2').attr('checked', Dataservice.thickness[2]);
	$('.thickness').change(function() {
		Dataservice.thickness=[$('#thickness0').prop('checked'),$('#thickness1').prop('checked'),$('#thickness2').prop('checked')];
		$scope.test();
	});

	$('#weight0').attr('checked', Dataservice.weight[0]);
	$('#weight1').attr('checked', Dataservice.weight[1]);
	$('#weight2').attr('checked', Dataservice.weight[2]);
	$('.weight').change(function() {
		Dataservice.weight=[$('#weight0').prop('checked'),$('#weight1').prop('checked'),$('#weight2').prop('checked')];
		$scope.test();
	});
	
	if (Dataservice.os != -1) {
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
		$scope.test();
	});
	function populate_os_details() {
		var oses={"android":"1","blackberry os":"2", "ios":"3", "windows phone":"4", "nokia asha":"5"};
		for (var j in oses) {
			var i = oses[j];
			if (i==Dataservice.os) {continue;}
			$("#sCurOS .".concat(i)).show();
			$("#sCurOS .".concat(i)).hide();
			$("#sFutOS .".concat(i)).show();
			$("#sFutOS .".concat(i)).hide();
		}
		$("#sCurOS .".concat(oses[Dataservice.os])).show();
		$('#sCurOS').selectpicker('refresh');
		$("#sFutOS .".concat(oses[Dataservice.os])).show();
		$('#sFutOS').selectpicker('refresh');
	}
	$("#sCurOS").change(function(){
		Dataservice.os_curr=$("#sCurOS").val();
		if (Dataservice.os_curr==null) {Dataservice.os_curr=[];}
		$scope.test();
	});
	$("#sFutOS").change(function(){
		Dataservice.os_upgr=$("#sFutOS").val();
		if (Dataservice.os_upgr==null) {Dataservice.os_upgr=[];}
		$scope.test();
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

	$('#sSimsize').selectpicker('val', Dataservice.simsize);
	$("#sSimsize").change(function(){
		Dataservice.simsize=$("#sSimsize").val();
		if (Dataservice.simsize==null) {Dataservice.simsize=[];}
		$scope.test();
	});

	$('#sSimno').selectpicker('val', Dataservice.simno);
	$("#sSimno").change(function(){
		Dataservice.simno=$("#sSimno").val();
		if (Dataservice.simno==null) {Dataservice.simno=[];}
		$scope.test();
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





	$('#sChipset').selectpicker('val', Dataservice.chipset);
	$('#sChipset').change(function(){
		Dataservice.chipset=$('#sChipset').val();
		if (Dataservice.chipset==null) {Dataservice.chipset=[];}
		$scope.test();
	});
	
	$('#sCpuFam').selectpicker('val', Dataservice.cpufam);
	$('#sCpuFam').change(function(){
		Dataservice.cpufam=$('#sCpuFam').val();
		if (Dataservice.cpufam==null) {Dataservice.cpufam=[];}
		$scope.test();
	});

	$('#sGpu').selectpicker('val', Dataservice.gpu);
	$('#sGpu').change(function(){
		Dataservice.gpu=$('#sGpu').val();
		$scope.test();
	});

	$scope.cpufre=Dataservice.cpufre;
	$("#cpufreqSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.cpufre['lo'],Dataservice.cpufre['hi']],
		format: wNumb({
			decimals: 1
		}),
		range: {
			 'min': [ .5, .1 ],
			'max': [ 3 ]
		} 
	});
	$("#cpufreqSlider").on('slide', function() {
		$scope.cpufre['lo']=$('#frelv').val();
		$scope.cpufre['hi']=$('#frehv').val();
		Dataservice.cpufre['lo']=$scope.cpufre['lo'];
		Dataservice.cpufre['hi']=$scope.cpufre['hi'];
		$scope.test();
	});
	$("#cpufreqSlider").Link('lower').to($('#frelv'));
	$("#cpufreqSlider").Link('upper').to($('#frehv'));

	$('#sCpuCor').selectpicker('val', Dataservice.cpucor);
	$('#sCpuCor').change(function(){
		Dataservice.cpucor=$('#sCpuCor').val();
		if (Dataservice.cpucor==null) {Dataservice.cpucor=[];}
		$scope.test();
	});

	$scope.ram=Dataservice.ram;
	$("#ramSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [Dataservice.ram['lo'],Dataservice.ram['hi']],
		format: wNumb({
			decimals: 3
		}),
		range: {
			'min': [ .128, .128 ],
			'max': [ 3 ]
		}
	});
	$("#ramSlider").on('slide', function() {
		$scope.ram['lo']=$('#ramlv').val();
		$scope.ram['hi']=$('#ramhv').val();
		Dataservice.ram['lo']=$scope.ram['lo'];
		Dataservice.ram['hi']=$scope.ram['hi'];
		$scope.test();
	});
	$("#ramSlider").Link('lower').to($('#ramlv'));
	$("#ramSlider").Link('upper').to($('#ramhv'));

	$scope.intr=Dataservice.intr;
	$("#intrSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.intr['lo'],Dataservice.intr['hi']],
		format: wNumb({
			decimals: 1
		}),
		range: {
			'min': [ 0, 1 ],
			'max': [ 128 ]
		}
	});
	$("#intrSlider").on('slide', function() {
		$scope.intr['lo']=$('#intrlv').val();
		$scope.intr['hi']=$('#intrhv').val();
		Dataservice.intr['lo']=$scope.intr['lo'];
		Dataservice.intr['hi']=$scope.intr['hi'];
		$scope.test();
	});
	$("#intrSlider").Link('lower').to($('#intrlv'));
	$("#intrSlider").Link('upper').to($('#intrhv'));

	$scope.card=Dataservice.card;
	$("#cardSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.card['lo'],Dataservice.card['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 16, 16 ],
			'max': [ 128 ]
		}
	});
	$("#cardSlider").on('slide', function() {
		$scope.card['lo']=$('#cardlv').val();
		$scope.card['hi']=$('#cardhv').val();
		Dataservice.card['lo']=$scope.card['lo'];
		Dataservice.card['hi']=$scope.card['hi'];
		$scope.test();
	});
	$("#cardSlider").Link('lower').to($('#cardlv'));
	$("#cardSlider").Link('upper').to($('#cardhv'));

	$scope.batt=Dataservice.batt;
	$("#battSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.batt['lo'],Dataservice.batt['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 1000, 500 ],
			'max': [ 5500 ]
		}
	});
	$("#battSlider").on('slide', function() {
		$scope.batt['lo']=$('#battlv').val();
		$scope.batt['hi']=$('#batthv').val();
		Dataservice.batt['lo']=$scope.batt['lo'];
		Dataservice.batt['hi']=$scope.batt['hi'];
		$scope.test();
	});
	$("#battSlider").Link('lower').to($('#battlv'));
	$("#battSlider").Link('upper').to($('#batthv'));

	$('#sSensors').selectpicker('val', Dataservice.snsr);
	$('#sSensors').change(function(){
		Dataservice.snsr=$('#sSensors').val();
		if (Dataservice.snsr==null) {Dataservice.snsr=[];}
		$scope.test();
	});

	$('#sLocation').selectpicker('val', Dataservice.loc);
	$('#sLocation').change(function(){
		Dataservice.loc=$('#sLocation').val();
		if (Dataservice.loc==null) {Dataservice.loc=[];}
		$scope.test();
	});
	


	$scope.scr=Dataservice.scr;
	$("#scrSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.scr['lo'],Dataservice.scr['hi']],
		format: wNumb({
			decimals: 1
		}),
		range: {
			'min': [ 2, .1 ],
			'max': [ 7 ]
		}
	});
	$("#scrSlider").on('slide', function() {
		$scope.scr['lo']=$('#scrlv').val();
		$scope.scr['hi']=$('#scrhv').val();
		Dataservice.scr['lo'] = $scope.scr['lo'];
		Dataservice.scr['hi'] = $scope.scr['hi'];
		$scope.test();
	});
	$("#scrSlider").Link('lower').to($('#scrlv'));
	$("#scrSlider").Link('upper').to($('#scrhv'));


	$('#sDisTech').selectpicker('val', Dataservice.distech);
	$("#sDisTech").change(function(){
		Dataservice.distech=$("#sDisTech").val();
		if (Dataservice.distech==null) {Dataservice.distech=[];}
		$scope.test();
	});

	$('#sDisReso').selectpicker('val', Dataservice.disreso);
	$("#sDisReso").change(function(){
		Dataservice.disreso=$("#sDisReso").val();
		if (Dataservice.disreso==null) {Dataservice.disreso=[];}
		$scope.test();
	});


	$scope.disden=Dataservice.disden;
	$("#disdenSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.disden['lo'],Dataservice.disden['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 100, 50 ],
			'max': [ 600 ]
		}
	});
	$("#disdenSlider").on('slide', function () {
		$scope.disden['lo']=$('#disdenlv').val();
		$scope.disden['hi']=$('#disdenhv').val();
		Dataservice.disden['lo'] = $scope.disden['lo'];
		Dataservice.disden['hi'] = $scope.disden['hi'];
		$scope.test();
	});
	$("#disdenSlider").Link('lower').to($('#disdenlv'));
	$("#disdenSlider").Link('upper').to($('#disdenhv'));

	$('#sDisProt').selectpicker('val', Dataservice.disprot);
	$("#sDisProt").change(function(){
		Dataservice.disprot=$("#sDisProt").val();
		if (Dataservice.disprot==null) {Dataservice.disprot=[];}
		$scope.test();
	});


	
	$scope.pricam=Dataservice.pricam;
	$("#pricamSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.pricam['lo'],Dataservice.pricam['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 1, 1 ],
			'max': [ 41 ]
		}
	});
	$("#pricamSlider").on('slide', function () {
		$scope.pricam['lo']=$('#pricamlv').val();
		$scope.pricam['hi']=$('#pricamhv').val();
		Dataservice.pricam['lo'] = $scope.pricam['lo'];
		Dataservice.pricam['hi'] = $scope.pricam['hi'];
		$scope.test();
	});
	$("#pricamSlider").Link('lower').to($('#pricamlv'));
	$("#pricamSlider").Link('upper').to($('#pricamhv'));

	$scope.privid=Dataservice.privid;
	$("#prividSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [Dataservice.privid['lo'],Dataservice.privid['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 200, 100 ],
			'max': [ 2200 ]
		}
	});
	$("#prividSlider").on('slide', function() {
		$scope.privid['lo']=$('#prividlv').val();
		$scope.privid['hi']=$('#prividhv').val();
		Dataservice.privid['lo'] = $scope.privid['lo'];
		Dataservice.privid['hi'] = $scope.privid['hi'];
		$scope.test();
	});
	$("#prividSlider").Link('lower').to($('#prividlv'));
	$("#prividSlider").Link('upper').to($('#prividhv'));


	$scope.seccam=Dataservice.seccam;
	$("#seccamSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.seccam['lo'],Dataservice.seccam['hi']],
		format: wNumb({
			decimals: 1
		}),
		range: {
			'min': [ .3, .1 ],
			'max': [ 15 ]
		}
	});
	$("#seccamSlider").on('slide', function() {
		$scope.seccam['lo']=$('#seccamlv').val();
		$scope.seccam['hi']=$('#seccamhv').val();
		Dataservice.seccam['lo'] = $scope.seccam['lo'];
		Dataservice.seccam['hi'] = $scope.seccam['hi'];
		$scope.test();
	});
	$("#seccamSlider").Link('lower').to($('#seccamlv'));
	$("#seccamSlider").Link('upper').to($('#seccamhv'));

	$scope.secvid=Dataservice.secvid;
	$("#secvidSlider").noUiSlider({
		connect: true,
		behaviour: 'tap-drag',
		start: [ Dataservice.secvid['lo'],Dataservice.secvid['hi']],
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': [ 200, 100],
			'max': [ 1500 ]
		}
	});
	$("#secvidSlider").on('slide', function() {
		$scope.secvid['lo']=$('#secvidlv').val();
		$scope.secvid['hi']=$('#secvidhv').val();
		Dataservice.secvid['lo'] = $scope.secvid['lo'];
		Dataservice.secvid['hi'] = $scope.secvid['hi'];
		$scope.test();
	});
	$("#secvidSlider").Link('lower').to($('#secvidlv'));
	$("#secvidSlider").Link('upper').to($('#secvidhv'));

	$('#sFlash').selectpicker('val', Dataservice.flash);
	$("#sFlash").change(function(){
		Dataservice.flash=$("#sFlash").val();
		if (Dataservice.flash==null) {Dataservice.flash=[];}
		$scope.test();
	});

	$('#sCamFea').selectpicker('val', Dataservice.camfea);
	$("#sCamFea").change(function(){
		Dataservice.camfea=$("#sCamFea").val();
		if (Dataservice.camfea==null) {Dataservice.camfea=[];}
		$scope.test();
	});



	$('#sData').selectpicker('val', Dataservice.data);
	$("#sData").change(function(){
		Dataservice.data=$("#sData").val();
		if (Dataservice.data==null) {Dataservice.data=[];}
		$scope.test();
	});

	$('#sWifi').selectpicker('val', Dataservice.wifi);
	$("#sWifi").change(function(){
		Dataservice.wifi=$("#sWifi").val();
		if (Dataservice.wifi==null) {Dataservice.wifi=[];}
		$scope.test();
	});

	$('#sBT').selectpicker('val', Dataservice.bt);
	$("#sBT").change(function(){
		Dataservice.bt=$("#sBT").val();
		if (Dataservice.bt==null) {Dataservice.bt=[];}
		$scope.test();
	});

	$('#sUSB').selectpicker('val', Dataservice.usb);
	$("#sUSB").change(function(){
		Dataservice.usb=$("#sUSB").val();
		if (Dataservice.usb==null) {Dataservice.usb=[];}
		$scope.test();
	});

	$('#sNFC').attr('checked', Dataservice.nfc);
	$('#sIR').attr('checked', Dataservice.ir);
	$('#sFM').attr('checked', Dataservice.fm);
	$('#sNFC').change(function() {
		Dataservice.nfc=$('#sNFC').prop('checked');
		$scope.test();
	});
	$('#sIR').change(function() {
		Dataservice.ir=$('#sIR').prop('checked');
		$scope.test();
	});
	$('#sFM').change(function() {
		Dataservice.fm=$('#sFM').prop('checked');
		$scope.test();
	});
	//}

	




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

	$scope.query = function (redir) {
		console.log('scopequery',redir);
		var query=Dataservice.form_query();
		//if (query) {
		if ((query=="http://192.168.1.2/pellego/php/results.php?all=1") && !redir) {
			$scope.disablesubmit=true;
			$("#submit_button").text("Search");
			Dataservice.last_result=0;
			Dataservice.query_alt=0;
			Dataservice.prune_label();
		}
		if ((query!="http://192.168.1.2/pellego/php/results.php?all=1") || (redir)) {
			console.log('querying',query);
			//if (redir) {$(".se-pre-con").show();}
			$http.get(query).success(function(response) {
				//if (redir) {$(".se-pre-con").fadeOut("slow");}
				if (response.length) { $scope.disablesubmit=false; }
				else {$scope.disablesubmit=true;}
				$("#submit_button").text("Found ".concat(response.length, " models"));
				Dataservice.last_result=response.length;
				Dataservice.query_alt=0;
				//console.log("query response:",response);
				Dataservice.prune_label();
				for (var i = 0; i < response.length; i++) {
					var specid=response[i][0][0];
					var label=response[i][0][1];
					var d=[ [specid].concat(response[i][0].slice(2,response[i][0].length)),response[i][1]];
					Dataservice.add_label(label, d);
				}
				setTimeout(function(){
					if (redir && Dataservice.last_result) {
						$(location).attr('href',"#/comparisongraph");
					}
				}, 1000);
			});
			
		}
	}

	$scope.clear =function () {
		console.log('clear search');
		Dataservice.price['lo'] = Dataservice.price['min'];
		Dataservice.price['hi'] = Dataservice.price['max'];
		$("#priceSlider").val([Dataservice.price['lo'], Dataservice.price['hi']]);
		Dataservice.brand=[];
		$('#sBrand').selectpicker('val', Dataservice.brand);
		Dataservice.facesize=[false,false,false];
		$('#facesize0').attr('checked', Dataservice.facesize[0]);
		$('#facesize1').attr('checked', Dataservice.facesize[1]);
		$('#facesize2').attr('checked', Dataservice.facesize[2]);
		Dataservice.thickness=[false,false,false];
		$('#thickness0').attr('checked', Dataservice.thickness[0]);
		$('#thickness1').attr('checked', Dataservice.thickness[1]);
		$('#thickness2').attr('checked', Dataservice.thickness[2]);
		Dataservice.weight=[false,false,false];
		$('#weight0').attr('checked', Dataservice.weight[0]);
		$('#weight1').attr('checked', Dataservice.weight[1]);
		$('#weight2').attr('checked', Dataservice.weight[2]);
		Dataservice.os=0;
    Dataservice.os_curr=[];
    Dataservice.os_upgr=[];
		$('#sOS').selectpicker('val', Dataservice.os);
		populate_os_details();
		$('#sCurOS').selectpicker('val', Dataservice.os_curr);
		$('#sFutOS').selectpicker('val', Dataservice.os_upgr);
		Dataservice.simsize=[];
		Dataservice.simno=[];
		$('#sSimsize').selectpicker('val', Dataservice.simsize);
		$('#sSimno').selectpicker('val', Dataservice.simno);
		Dataservice.chipset=[];
		$('#sChipset').selectpicker('val', Dataservice.chipset);
		Dataservice.cpufam=[];
		$('#sCpuFam').selectpicker('val', Dataservice.cpufam);
		Dataservice.gpu=[];
		$('#sGpu').selectpicker('val', Dataservice.gpu);
		Dataservice.cpufre['lo'] = Dataservice.cpufre['min'];
		Dataservice.cpufre['hi'] = Dataservice.cpufre['max'];
		$("#cpufreqSlider").val([Dataservice.cpufre['lo'], Dataservice.cpufre['hi']]);
		Dataservice.cpucor=[];
		$('#sCpuCor').selectpicker('val', Dataservice.cpucor);
		Dataservice.ram['lo'] = Dataservice.ram['min'];
		Dataservice.ram['hi'] = Dataservice.ram['max'];
		$("#ramSlider").val([Dataservice.ram['lo'], Dataservice.ram['hi']]);
		Dataservice.intr['lo'] = Dataservice.intr['min'];
		Dataservice.intr['hi'] = Dataservice.intr['max'];
		$("#intrSlider").val([Dataservice.intr['lo'], Dataservice.intr['hi']]);
		Dataservice.card['lo'] = Dataservice.card['min'];
		Dataservice.card['hi'] = Dataservice.card['max'];
		$("#cardSlider").val([Dataservice.card['lo'], Dataservice.card['hi']]);
		Dataservice.batt['lo'] = Dataservice.batt['min'];
		Dataservice.batt['hi'] = Dataservice.batt['max'];
		$("#battSlider").val([Dataservice.batt['lo'], Dataservice.batt['hi']]);
		Dataservice.snsr=[];
		$('#sSensors').selectpicker('val', Dataservice.snsr);
		Dataservice.loc=[];
		$('#sLocation').selectpicker('val', Dataservice.loc);
		Dataservice.scr['lo'] = Dataservice.scr['min'];
		Dataservice.scr['hi'] = Dataservice.scr['max'];
		$("#scrSlider").val([Dataservice.scr['lo'], Dataservice.scr['hi']]);
		Dataservice.distech=[];
		$('#sDisTech').selectpicker('val', Dataservice.distech);
		Dataservice.disreso=[];
		$('#sDisReso').selectpicker('val', Dataservice.disreso);
		Dataservice.disden['lo'] = Dataservice.disden['min'];
		Dataservice.disden['hi'] = Dataservice.disden['max'];
		$("#disdenSlider").val([Dataservice.disden['lo'], Dataservice.disden['hi']]);
		Dataservice.disprot=[];
		$('#sDisProt').selectpicker('val', Dataservice.disprot);
		Dataservice.pricam['lo'] = Dataservice.pricam['min'];
		Dataservice.pricam['hi'] = Dataservice.pricam['max'];
		$("#pricamSlider").val([Dataservice.pricam['lo'], Dataservice.pricam['hi']]);
		Dataservice.privid['lo'] = Dataservice.privid['min'];
		Dataservice.privid['hi'] = Dataservice.privid['max'];
		$("#prividSlider").val([Dataservice.privid['lo'], Dataservice.privid['hi']]);
		Dataservice.seccam['lo'] = Dataservice.seccam['min'];
		Dataservice.seccam['hi'] = Dataservice.seccam['max'];
		$("#seccamSlider").val([Dataservice.seccam['lo'], Dataservice.seccam['hi']]);
		Dataservice.secvid['lo'] = Dataservice.secvid['min'];
		Dataservice.secvid['hi'] = Dataservice.secvid['max'];
		$("#secvidSlider").val([Dataservice.secvid['lo'], Dataservice.secvid['hi']]);
		Dataservice.flash=[];
		$('#sFlash').selectpicker('val', Dataservice.flash);
		Dataservice.camfea=[];
		$('#sCamFea').selectpicker('val', Dataservice.camfea);
		Dataservice.data=[];
		$('#sData').selectpicker('val', Dataservice.data);
		Dataservice.wifi=[];
		$('#sWifi').selectpicker('val', Dataservice.wifi);
		Dataservice.bt=[];
		$('#sBT').selectpicker('val', Dataservice.bt);
		Dataservice.usb=[];
		$('#sUSB').selectpicker('val', Dataservice.usb);
		Dataservice.nfc=false;
		Dataservice.ir=false;
		Dataservice.fm=false;
		$('#sNFC').attr('checked', Dataservice.nfc);
		$('#sIR').attr('checked', Dataservice.ir);
		$('#sFM').attr('checked', Dataservice.fm);
		
		q.push(1);

		$scope.disablesubmit=true;
		$("#submit_button").text("Search");
		Dataservice.last_result=0;
		Dataservice.query_alt=0;
		Dataservice.prune_label();
	}

	$scope.test = function () {
		console.log('test');
		q.push(1);
	}

	$scope.search_redirect = function () {
		console.log('search_redirect','q.length',q.length,'Dataservice.query_alt',Dataservice.query_alt,'Dataservice.last_result',Dataservice.last_result);
		if ((q.length == 0) && (Dataservice.query_alt==0)) {
			if (Dataservice.last_result) {
				$(location).attr('href',"#/comparisongraph");
			} else {
				q=[];
				$scope.query(true);
			}
		} else {
			q=[];
			$scope.query(true);
		}
	}

	setInterval(function() {
		if (q.length) {$scope.query(false);}
		q=[];
	}, 5000);
	
  }]);




var main = function(){
	var banner = $('#banner')
	
	$(document).scroll(function(){
		//console.log($(this).scrollTop() + $(window).height(), $('.footer').offset().top, $('#sConnectivity').offset().top, $(searchpage).height());
		//if ( $(this).scrollTop() >= $(window).height() - banner.height() ){
		if ( ($(this).scrollTop() + $(window).height()) >= $('.footer').offset().top ){
			$('#banner').removeClass('fix').addClass('rel');
			//console.log("here");
		} else {
			$('#banner').removeClass('rel').addClass('fix');
		}
	})
}
$(document).ready(main);
