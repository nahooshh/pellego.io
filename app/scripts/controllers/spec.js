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
		$rootScope.sbar=false;

		var month={'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'}

		var mvp = document.getElementById('myViewport');
		mvp.setAttribute('content','width=1000');

		reload();
		$('.selectpicker').selectpicker();

		$rootScope.$on('SLEvent', function(event, specid) {
			console.log('spec received SLEvent');
			reload();
		});

		$("#specmodel0").change(function() {
			var newval = $("#specmodel0").val();
			var oldidx = Dataservice.spec_col.indexOf(newval);
			if (oldidx != -1) {Dataservice.spec_col[oldidx]=0;}
			Dataservice.spec_col[0]  = newval;
			reload();
		});
		$("#specmodel1").change(function() {
			var newval = $("#specmodel1").val();
			var oldidx = Dataservice.spec_col.indexOf(newval);
			if (oldidx != -1) {Dataservice.spec_col[oldidx]=0;}
			Dataservice.spec_col[1]  = newval;
			reload();
		});
		$("#specmodel2").change(function() {
			var newval = $("#specmodel2").val();
			var oldidx = Dataservice.spec_col.indexOf(newval);
			if (oldidx != -1) {Dataservice.spec_col[oldidx]=0;}
			Dataservice.spec_col[2]  = newval;
			reload();
		});
		$("#specmodel3").change(function() {
			var newval = $("#specmodel3").val();
			var oldidx = Dataservice.spec_col.indexOf(newval);
			if (oldidx != -1) {Dataservice.spec_col[oldidx]=0;}
			Dataservice.spec_col[3]  = newval;
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
			$(".specdata").remove();
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
				"<div class=\"shortlist-text\">", "<div class=\"shortlist-model\">", label, "</div>",
				"<div class=\"points-details\">","<p>points:",points[0],"</p><p>hardware points:",points[1],"</p>",
				"<p>display points:",points[2],"</p><p>camera points:",points[3],"</p>","</div>",
				"</div></div>");
				$("#specov".concat(j)).append(entry);
			}
		
			
			var specs=[];
			var q=[];
			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i] ==0) continue;
				var this_spec = Dataservice.get_specs(Dataservice.spec_col[i]);
				if (this_spec == false) { q.push(Dataservice.spec_col[i]); }
				else {specs[i] = this_spec;console.log("got specs for ",Dataservice.spec_col[i]);}
			}
			if (q.length) {
				var query="http://192.168.1.2/pellego/php/specs.php?specid=".concat(q.join());
				console.log(query);
				$http.get(query).success(function(response) {
					for (var specid in response) {
						Dataservice.specs[specid]=response[specid];
						var indx = Dataservice.spec_col.indexOf(specid);
						specs[indx] = response[specid];
					}
					fillbody(specs);
				});
			} else {
					fillbody(specs);
			}
		}
		
		function add_header(hdr) {
			//var row0="<tr class=\"specdata specheader\"><td class=\"colhdr\">".concat(hdr,"</td><td class=\"colodd\"></td><td class=\"coleven\"></td><td class=\"colodd\"></td><td class=\"coleven\"></td></tr>");
			var row0="<tr class=\"specdata\" style=\"height:10px;\"><td></td><td></td><td></td><td></td></tr>"

			var row="<tr class=\"specdata specheader\"><td class=\"colhdr\">".concat(hdr,"</td>");
			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i] == 0) row=row.concat("<td></td>");
				else {
					if (i%2) row=row.concat("<td  class=\"coleven\"></td>");
					else row=row.concat("<td  class=\"colodd\"></td>");
				}
			}
			row=row.concat("</tr>");

			$("#spectable tbody").append(row0);
			$("#spectable tbody").append(row);
		}
		function add_row(fea,r) {
			var cont=false;
			for (var i = 0; i < 4; i++) {
					if (r[i] != '') {cont=true;break;}
			}
			if (cont == false) return;

			var row="<tr class=\"specdata specrow\"><td class=\"colhdr\">".concat(fea,"</td>");
			for (var i = 0; i < 4; i++) {
				if (Dataservice.spec_col[i] == 0) row=row.concat("<td></td>");
				else {
					if (i%2) row=row.concat("<td  class=\"coleven\">",r[i],"</td>");
					else row=row.concat("<td  class=\"colodd\">",r[i],"</td>");
				}
			}
			row=row.concat("</tr>");
			$("#spectable tbody").append(row);
		}

		function fillbody(specs) {
			var l = Object.keys(specs).length;
			console.log('specs:',specs,'l:',l);
			if (l == 0)  return;


			add_header('GENERAL');
		
			//RELEASED	
			var released=[];
			for (var i=0;i<4;i++){
				if (specs[i] && (specs[i]['RELEASED'] != '')) {
					var d=specs[i]['RELEASED'];
					d=d.split('-');
					var s=d[0].concat(', ',month[d[1]]);
					released.push(s);
				}
				else released.push('');
			}
			add_row('Released',released);
	
			//SIM
			var sim=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var sno = specs[i]['SIMNO'];
					var smo = specs[i]['SIMMOD'];
					if (smo) {sno=sno.concat(', ',smo);}
					sim.push(sno);
				} else sim.push('');
			}
			add_row('Sim',sim);

			//SIMSIZE
			var simsize=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					simsize.push(specs[i]['SIMSIZE']);
				} else simsize.push('');
			}
			add_row('Sim Size',simsize);

			//Network
			var nwk=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var net=[];	
					if (specs[i]['2G'] == '1') {net.push('2G');}
					if (specs[i]['3G'] == '1') {net.push('3G');}
					if (specs[i]['4G'] == '1') {net.push('4G');}
					nwk.push(net.join(', '));
				} else nwk.push('');
			}
			add_row('Network',nwk);

			//OS
			var os=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=specs[i]['OS'];
					var s1=specs[i]['OS_VER'];
					var s2=specs[i]['OS_UPG'];
					if (s1 != '') {s=s.concat(', ', s1);}
					if (s2 != '') {s=s.concat(', Upgradable to ', s2);}
					os.push(s);
				} else os.push('');
			}
			add_row('OS',os);
	
			add_header('BODY');
			//DIEMNSIONS
			var dm=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var l= specs[i]['LENGTH'];
					var h= specs[i]['HEIGHT'];
					var t= specs[i]['THICKNESS'];
					s='';
					if ((l != '') && (h != '') && (t != '')) {s=s.concat(l,'mm x ',h,'mm x',t,'mm');}
					dm.push(s);
				} else dm.push('');
			}
			add_row('Dimensions',dm);

			//WEIGHT
			var wt=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var w=specs[i]['WEIGHT'];
					if (w != '') {w=w.concat('g');}
					wt.push(w);
				} else wt.push('');
			}
			add_row('Weight',wt);

			//EXTRA
			var ex=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var k = specs[i]['KEYBOARD'];
					var w = specs[i]['WTRDSTPRF'];
					s='';
					if (k!='') {s=s.concat(k,' ',' Keyboard.');}
					if (w!=0) {s=s.concat(' Water and Dust Proof.');}
					ex.push(s);
				} else ex.push('');
			}
			add_row('Extra',ex);
					
		
			add_header('DISPLAY');
			//DISSIZE
			var sz=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s = specs[i]['DISSIZE'];
					if (s != '') {s=s.concat(' \'\'');}
					sz.push(s);
				} else sz.push('');
			}
			add_row('Display Size',sz);
		
			//DISTYPE
			var tp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s = specs[i]['DISTYPE'];
					tp.push(s);
				} else tp.push('');
			}
			add_row('Technology',tp);

			//DISRESO
			var re=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s = specs[i]['DISRESO'];
					re.push(s);
				} else re.push('');
			}
			add_row('Resolution',re);
			
			//DISPPI
			var pp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s = specs[i]['DISPPI'];
					if (s!='') {pp.push('~'.concat(s));}
					else pp.push('');
				} else pp.push('');
			}
			add_row('PPI',pp);

			//DISPROT
			var pr=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					pr.push(specs[i]['DISPROT']);
				} else pr.push('');
			}
			add_row('Protection',pr);
					

			add_header('CAMERA');
			//RESO
			var cm=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					s=specs[i]['RESO'];
					if (s!='0') {s=s.concat(' MP');}
					else s='';
					cm.push(s);
				} else cm.push('');
			}
			add_row('Camera Resolution',cm);
			//VIDRESFPS
			var vd=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					s=specs[i]['VIDRESFPS'];
					if (s!='0') {s=s.concat(' @30fps');}
					else s='';
					vd.push(s);
				} else vd.push('');
			}
			add_row('Video',vd);
			//Flash
			var fl=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					fl.push(specs[i]['FLASH']);
				} else fl.push('');
			}
			add_row('Flash',fl);
			//SEC
			var sc=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s='';
					var r=specs[i]['SECRES'];
					var v=specs[i]['SECVIDRESFPS'];
					if (r=='0') s='No';
					else {
						s=s.concat(r,' MP');
						if (v!='0') {s=s.concat(', ',v,' @30fps');}
					}
					sc.push(s);
				} else sc.push('');
			}
			add_row('Secondary',sc);
			//SENS,PIXL
			var sp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s='';
					var p=specs[i]['PIXL'];
					var r=specs[i]['SENS'];
					if (r!='') {r = r.replace(/i/g, ""); s=s.concat(r.trim(),'\'\' Sensor Size. ');}
					if (p!='0') {s=s.concat(p,'micrometre Pixel Size.');}
					sp.push(s);
				} else sp.push('');
			}
			add_row('Camera Specs',sp);
			//CAMFEA
			var fe=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['AUTOFO'] == '1') {s.push('Autofocus');}
					if (specs[i]['TOUCHFO'] == '1') {s.push('Touchfocus');}
					if (specs[i]['OPTSTAB'] == '1') {s.push('Optical Image Stabilization');}
					if (specs[i]['GEOTAG'] == '1') {s.push('Geotagging');}
					if (specs[i]['FACE'] == '1') {s.push('Face/Smile detection');}
					if (specs[i]['PAN'] == '1') {s.push('Panorama');}
					if (specs[i]['SIM_VID_IMG'] == '1') {s.push('Simultaneous Snapshot and Video');}
					if (specs[i]['HDR'] == '1') {s.push('HD Recording');}
					if (s.length) {fe.push(s.join(', '));}
					else fe.push('');
				} else fe.push('');
			}
			add_row('Features',fe);
		
			
			add_header('HARDWARE');
			//CHIP
			var cp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					cp.push(specs[i]['CHIP']);
				} else cp.push('');
			}
			add_row('Chipset',cp);
			//CPU
			var cp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var det=[];
					var cr=specs[i]['CPUCOR'];
					var fr=specs[i]['CPUFRE'];
					var fm=specs[i]['CPUFAM'];
					if (cr != '') det.push(cr);
					if (fr != '') det.push(fr.concat('GHz'));
					if (fm != '') det.push(fm);
					if (det.length) cp.push(det.join(', '));
					else cp.push('');
				}else cp.push('');
			}
			add_row('CPU',cp);
			//GPU
			var gp=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					gp.push(specs[i]['GPU']);
				} else gp.push('');
			}
			add_row('GPU',gp);
			//RAM
			var rm=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var r = specs[i]['RAM'];
					if (r!='0') {rm.push(r.concat(' GB'));}
					else rm.push('');
				} else rm.push('');
			}
			add_row('RAM',rm);
			//INTR
			var ir=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var r = specs[i]['INTR'];
					if (r!='0') {ir.push(r.concat(' GB'));}
					else ir.push('');
				} else ir.push('');
			}
			add_row('Internal Memory',ir);
			//CARD
			var cd=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var c=specs[i]['CARD'];
					if (c!='0') {cd.push('Upto '.concat(c,' GB'));}
					else {cd.push('No');}
				} else cd.push('');
			}
			add_row('Card',cd);
			//SENSORS
			var sn=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['ACC'] == '1') {s.push('Accelerometer');}
					if (specs[i]['GYR'] == '1') {s.push('Gyroscope');}
					if (specs[i]['PROX'] == '1') {s.push('Proximity Sens');}
					if (specs[i]['COMP'] == '1') {s.push('Compass');}
					if (specs[i]['BARO'] == '1') {s.push('Barometer');}
					if (specs[i]['TEMP'] == '1') {s.push('Temperature Sens');}
					if (specs[i]['HUMI'] == '1') {s.push('Humidity Sens');}
					if (specs[i]['GEST'] == '1') {s.push('Gesture Recg');}
					if (specs[i]['HRT'] == '1') {s.push('HeartRate Monitor');}
					if (specs[i]['FNGPR'] == '1') {s.push('Fingerprint Sens');}
					if (specs[i]['SPO2'] == '1') {s.push('SpO2 (Blood Oxygen Sens)');}
					if (specs[i]['UV'] == '1') {s.push('UV');}
					if (s.length) sn.push(s.join(', '));
					else sn.push('');
				} else sn.push('');
			}
			add_row('Sensors',sn);
			//LOCATION
			var lc=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['GPS'] == '1') {s.push('GPS');}
					if (specs[i]['AGPS'] == '1') {s.push('AGPS');}
					if (specs[i]['GLON'] == '1') {s.push('GLONASS');}
					if (specs[i]['BEIDOU'] == '1') {s.push('BEIDOU');}
					if (s.length) lc.push(s.join(', '));
					else lc.push('');
				} else lc.push('');
			}
			add_row('Location',lc);


			add_header('CONNECTIVITY');
			//WLAN
			var wl=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					wl.push(specs[i]['WLAN']);
				} else wl.push('');
			}
			add_row('WLAN',wl);
			//WLAN FEA
			var wl=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['WLANDB'] == '1') {s.push('Dualband');}
					if (specs[i]['WIFIDIR'] == '1') {s.push('Wifi Direct');}
					if (specs[i]['WIFIHOT'] == '1') {s.push('Wifi Hotspot');}
					if (specs[i]['DLNA'] == '1') {s.push('DLNA');}
					if (s.length) wl.push(s.join(', '));
					else wl.push('');
				} else wl.push('');
			}
			add_row('WIFI FEATURES',wl);
			//BT
			var bt=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var b=specs[i]['BTVER'];
					if (b != '0') bt.push('v'.concat(b));
					else bt.push('');
				} else bt.push('');
			}
			add_row('BLUETOOTH',bt);
			//BT FEA
			var bt=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['BTA2DP'] == '1') {s.push('A2DP');}
					if (specs[i]['BTEDR'] == '1') {s.push('EDR');}
					if (specs[i]['BTLE'] == '1') {s.push('LE');}
					if (s.length) bt.push(s.join(', '));
					else bt.push('');
				} else bt.push('');
			}
			add_row('BT FEATURES',bt);
			//USB
			var us=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var u=specs[i]['USBVER'];
					if (u != '0') us.push('v'.concat(u));
					else us.push('');
				} else us.push('');
			}
			add_row('USB',us);
			//USB FEATURES
			var us=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					var s=[];
					if (specs[i]['USBMHL'] == '1') {s.push('MHL');}
					if (specs[i]['USBOTG'] == '1') {s.push('OTG');}
					if (specs[i]['USBHOST'] == '1') {s.push('USB Host');}
					if (s.length) us.push(s.join(', '));
					else us.push('');
				} else us.push('');
			}
			add_row('USB FEATURES',us);
			//NFC
			var nf=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					if (specs[i]['NFC'] == '1') nf.push('Yes');
					else nf.push('No');
				} else nf.push('');
			}
			add_row('NFC',nf);
			//IRPORT
			var nf=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					if (specs[i]['IRPORT'] == '1') nf.push('Yes');
					else nf.push('No');
				} else nf.push('');
			}
			add_row('IR PORT',nf);
			//NFC
			var nf=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					if (specs[i]['RADIO'] == '1') nf.push('Yes');
					else nf.push('No');
				} else nf.push('');
			}
			add_row('RADIO',nf);
	

			add_header('SOUND');
			//3.5MM
			var nf=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					if (specs[i]['3_5MM'] == '1') nf.push('Yes');
					else nf.push('');
				} else nf.push('');
			}
			add_row('3.5mm Jack',nf);
			var nf=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					if (specs[i]['LOUDSP'] == '1') nf.push('Yes');
					else nf.push('');
				} else nf.push('');
			}
			add_row('Loudspeaker',nf);
	
	
			add_header('BATTERY');
			//DETAILS
			var bt=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					s="";
					var nr=specs[i]['NONREM'];
					var t=specs[i]['BATTYPE'];
					var r=specs[i]['BATPOW'];
					if (r!='0') {s=s.concat(r,' mAh');}
					if (t!='') if (r!='0')	{s=s.concat(', ',t,' battery ');} else {s=s.concat(t,' battery ');}
					if (nr=='1') {s=s.concat('(Non-Removable)');}
					bt.push(s);			
				} else bt.push('');
			}
			add_row('Battery',bt);
			//TIME
			var tm=[];
			for (var i=0;i<4;i++){
				if (specs[i]) {
					s="";
					var tt=specs[i]['BATTT'];
					var sb=specs[i]['BATSB'];
					if (tt!='0') {s=s.concat('~',tt,' Hrs talktime. ');}
					if (sb!='0') {s=s.concat('~',sb,' Hrs standby.');}
					tm.push(s);
				} else tm.push('');
			}
			add_row('Endurance',tm);
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
