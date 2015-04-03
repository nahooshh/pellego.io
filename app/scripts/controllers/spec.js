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
		$rootScope.sbar=true;

		var month={'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'}


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
				"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
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
			var row="<tr class=\"specdata\"><td>".concat(hdr,"</td><td></td><td></td><td></td><td></td></tr>");
			$("#spectable tbody").append(row);
		}
		function add_row(fea,r) {
			var cont=false;
			for (var i = 0; i < 4; i++) {
					if (r[i] != '') {cont=true;break;}
			}
			if (cont == false) return;

			var row="<tr class=\"specdata\"><td>".concat(fea,"</td>");
			for (var i = 0; i < 4; i++) {
				row=row.concat("<td>",r[i],"</td>");
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
