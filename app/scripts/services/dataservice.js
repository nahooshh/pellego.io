'use strict';

/**
 * @ngdoc service
 * @name frontendApp.dataService
 * @description
 * # dataService
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Dataservice', function Dataservice($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.selected = [];
		this.all={};
		this.add_sel = function(specid) {
			if (this.selected.indexOf(specid) == -1) {
				this.selected.push(specid);
				var sl=this.selected.length;
				$("#sl-strip").text("SHORTLIST(".concat(sl,")"));
				if (sl > 0) {$rootScope.nav=false; $(".nvbr").removeClass("ng-hide");$rootScope.sbar=false;$(".sl").removeClass("ng-hide");}
    		else {$rootScope.nav=true; $(".nvbr").addClass("ng-hide");$rootScope.sbar=true;$(".sl").addClass("ng-hide");}
				return true;
				//$rootScope.$emit('addEvent', specid);
			} else {
				return false;
			}
		}
		this.rem_sel = function(specid) {
			var index=this.selected.indexOf(specid);
			if (index != -1) {
				this.selected.splice(index, 1);
				var sl=this.selected.length;
				$("#sl-strip").text("SHORTLIST(".concat(sl,")"));
				if (sl > 0) {$rootScope.nav=false; $(".nvbr").removeClass("ng-hide");$rootScope.sbar=false;$(".sl").removeClass("ng-hide");}
    		else {$rootScope.nav=true; $(".nvbr").addClass("ng-hide");$rootScope.sbar=true;$(".sl").addClass("ng-hide");}
			}
		}
		this.add_label = function(label,d) {
			//if (this.all[d[0][0]]) {return false;}
			if (this.all.hasOwnProperty(d[0][0])) {return false;}
			else {
				this.all[d[0][0]]=[[label].concat(d[0].slice(1,d[0].length)),d[1]];
				return true;
			}
		}
		this.rem_label = function(specid) {
			delete this.all[specid];
		}
		this.prune_label = function() {
			for (var key in this.all) {
				if (this.selected.indexOf(key) == -1) {
					delete this.all[key];
				}
			}
		}

		this.get_label = function (specid) {
			return this.all[specid][0][0];
		}
		this.get_colors = function (specid) {
			return this.all[specid][1];
		}
		this.get_points = function (specid) {
			return this.all[specid][0].slice(2,this.all[specid][0].length);
		}
		this.all_data = function () {
			var ret=[];
			for (var specid in this.all) {
				var obj=this.all[specid];
				ret.push([specid].concat(obj[0]));
			}
			return ret;
		}
		this.selected_data = function () {
			var ret=[];
			for (var i = 0; i < this.selected.length; i++) {
				var specid = this.selected[i];
				var obj=this.all[specid];
				ret.push([specid].concat(obj[0]));
			}
			ret.sort(function(a,b) { return a[1].localeCompare(b[1]) } );
			return ret;
		}
	

		this.add = function(d) {
			if (this.all[d[0]]) {}
			else {
				this.all[d[0]]=d.slice(1,d.length);
			}
		}
		//for qa
		this.getsel = function() {
			return this.selected;
		}
		this.getall = function() {
			return this.all;
		}
		this.getselected = function() {
			var ret=[];
			var i = 0;
			for (i = 0; i < this.selected.length; i++) {
				var id = this.selected[i];
    		ret.push([id, this.all[id][0]]);
			}
			return ret;	
		}

		this.last_result=0;
		this.query_alt=0;
		this.price={'min':1000,'max':100000,'lo':1000,'hi':100000};
		this.brand=[];
		this.facesize=[false,false,false];
		this.thickness=[false,false,false];
		this.weight=[false,false,false];
		this.os=0;
		this.os_curr=[];
		this.os_upgr=[];
		this.simsize=[];
		this.simno=[];

		this.overall=[false,false,false,false]
		this.hardware=[false,false,false,false]
		this.display=[false,false,false,false]
		this.camera=[false,false,false,false]
		this.similar0=[['',0,0,0,0],[false.false,false,false]]
		this.similar1=[['',0,0,0,0],[false.false,false,false]]
		this.similar2=[['',0,0,0,0],[false.false,false,false]]
		this.similar3=[['',0,0,0,0],[false.false,false,false]]


		this.chipset=[];
		this.cpufam=[];
		this.gpu=[];
		this.cpufre={'min':.5,'max':3,'lo':.5,'hi':3};
		this.cpucor=[];
		this.ram={'min':.128,'max':3,'lo':.128,'hi':3};
		this.intr={'min':1,'max':128,'lo':1,'hi':128};
		this.card={'min':16,'max':128,'lo':16,'hi':128};
		this.batt={'min':1000,'max':5500,'lo':1000,'hi':5500};
		this.snsr=[];
		this.loc=[];

	
		this.scr={'min':2,'max':7,'lo':2,'hi':7};
		this.distech=[];
		this.disreso=[];
		this.disden={'min':100,'max':600,'lo':100,'hi':600};
		this.disprot=[];
		
		
		this.pricam={'min':1,'max':41,'lo':1,'hi':41};
		this.privid={'min':200,'max':2200,'lo':200,'hi':2200};
		this.seccam={'min':.3,'max':15,'lo':.3,'hi':15};
		this.secvid={'min':200,'max':1500,'lo':200,'hi':1500};
		this.flash=[];
		this.camfea=[];

		this.data=[];
		this.wifi=[];
		this.bt=[];
		this.usb=[];
		this.nfc=false;
		this.ir=false;
		this.fm=false;


		this.xmin=0;
		this.xmax=0;
		this.graph_sel='ov';
		this.plotdata=[];
		this.price1=[];
		this.nam=[];
		this.sid=[];
		this.plot;
		this.series;


		this.form_query = function () {
			var q=[];
			if (this.price.lo != this.price.min) {q.push(['pricelo',this.price.lo]);}
			if (this.price.hi != this.price.max) {q.push(['pricehi',this.price.hi]);}
			if (this.brand.length > 0) {q.push(['make',this.brand]);}
			if ((this.facesize.indexOf(true) != -1) && (this.facesize.indexOf(false) != -1)) {q.push(['fs',this.facesize]);}
			if ((this.thickness.indexOf(true) != -1) && (this.thickness.indexOf(false) != -1))  {q.push(['th',this.thickness]);}
			if ((this.weight.indexOf(true) != -1) && (this.weight.indexOf(false) != -1)) {q.push(['wt',this.weight]);}
			if (this.os != "0") {
				q.push(['os',this.os]);
				if (this.os_curr.length > 0) {q.push(['oscurr',this.os_curr]);}
				if (this.os_upgr.length > 0) {q.push(['osupgr',this.os_upgr]);}
			}
			if (this.simsize.length > 0) {q.push(['simsize',this.simsize]);}
			if (this.simno.length > 0) {q.push(['simno',this.simno]);}
			if (this.chipset.length > 0) {q.push(['chip',this.chipset]);}
			if (this.cpufam.length > 0) {q.push(['cpufam',this.cpufam]);}
			if (this.gpu.length > 0) {q.push(['gpu',this.gpu]);}
			if (this.cpufre.lo != this.cpufre.min) {q.push(['cpufrelo',this.cpufre.lo]);}
			if (this.cpufre.hi != this.cpufre.max) {q.push(['cpufrehi',this.cpufre.hi]);}
			if (this.cpucor.length > 0) {q.push(['cpucor',this.cpucor]);}
			if (this.ram.lo != this.ram.min) {q.push(['ramlo',this.ram.lo]);}
			if (this.ram.hi != this.ram.max) {q.push(['ramhi',this.ram.hi]);}
			if (this.intr.lo != this.intr.min) {q.push(['intrlo',this.intr.lo]);}
			if (this.intr.hi != this.intr.max) {q.push(['intrhi',this.intr.hi]);}
			if (this.card.lo != this.card.min) {q.push(['cardlo',this.card.lo]);}
			if (this.card.hi != this.card.max) {q.push(['cardhi',this.card.hi]);}
			if (this.batt.lo != this.batt.min) {q.push(['battlo',this.batt.lo]);}
			if (this.batt.hi != this.batt.max) {q.push(['batthi',this.batt.hi]);}
			if (this.snsr.length > 0) {q.push(['snsr',this.snsr]);}
			if (this.loc.length > 0) {q.push(['loc',this.loc]);}
			if (this.scr.lo != this.scr.min) {q.push(['scrlo',this.scr.lo]);}
			if (this.scr.hi != this.scr.max) {q.push(['scrhi',this.scr.hi]);}
			if (this.distech.length > 0) {q.push(['distech',this.distech]);}
			if (this.disreso.length > 0) {q.push(['disreso',this.disreso]);}
			if (this.disden.lo != this.disden.min) {q.push(['disdenlo',this.disden.lo]);}
			if (this.disden.hi != this.disden.max) {q.push(['disdenhi',this.disden.hi]);}
			if (this.disprot.length > 0) {q.push(['disprot',this.disprot]);}
			if (this.pricam.lo != this.pricam.min) {q.push(['pricamlo',this.pricam.lo]);}
			if (this.pricam.hi != this.pricam.max) {q.push(['pricamhi',this.pricam.hi]);}
			if (this.privid.lo != this.privid.min) {q.push(['prividlo',this.privid.lo]);}
			if (this.privid.hi != this.privid.max) {q.push(['prividhi',this.privid.hi]);}
			if (this.seccam.lo != this.seccam.min) {q.push(['seccamlo',this.seccam.lo]);}
			if (this.seccam.hi != this.seccam.max) {q.push(['seccamhi',this.seccam.hi]);}
			if (this.secvid.lo != this.secvid.min) {q.push(['secvidlo',this.secvid.lo]);}
			if (this.secvid.hi != this.secvid.max) {q.push(['secvidhi',this.secvid.hi]);}
			if (this.flash.length > 0) {q.push(['flash',this.flash]);}
			if (this.camfea.length > 0) {q.push(['camfea',this.camfea]);}
			if (this.data.length > 0) {q.push(['data',this.data]);}
			if (this.wifi.length > 0) {q.push(['wifi',this.wifi]);}
			if (this.bt.length > 0) {q.push(['bt',this.bt]);}
			if (this.usb.length > 0) {q.push(['usb',this.usb]);}
			if (this.nfc) {q.push(['nfc',true]);}
			if (this.ir) {q.push(['ir',true]);}
			if (this.fm) {q.push(['fm',true]);}
			
			
			if (q.length > 0) {
				var query="http://192.168.1.2/pellego/php/results.php?";
				for (var i = 0; i < q.length; i++) {
					var elem=q[i];
					if (i > 0) {query=query.concat('&')}
					if (elem.length == 2) {query=query.concat(elem[0],'=',elem[1]);} 
					else {query=query.concat(elem[0]);}
				}
			} else {
				query="http://192.168.1.2/pellego/php/results.php?all=1";
			}
			return query;
		}

		this.spec_col=[0,0,0,0];
		this.specs={};
		this.get_specs = function (specid) {
			if (this.specs.hasOwnProperty(specid)) {return this.specs[specid];}
			else {return false;}
		}

		this.rev_model=0;
		this.rev_col="rev";
		this.revs={};
		this.get_rev = function (specid,col) {
			if (this.revs.hasOwnProperty(specid)) {
				if (this.revs[specid].hasOwnProperty(col)) {return this.revs[specid][col];}
				else return false;
			}
      else {return false;}
		}

  });
