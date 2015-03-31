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
				if (sl > 0) {$rootScope.nav=false; $(".nvbr").removeClass("ng-hide");}
    		else {$rootScope.nav=true; $(".nvbr").addClass("ng-hide");}
				console.log("$rootScope.nav",$rootScope.nav);
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
				if (sl > 0) {$rootScope.nav=false; $(".nvbr").removeClass("ng-hide");}
    		else {$rootScope.nav=true; $(".nvbr").addClass("ng-hide");}
				console.log("$rootScope.nav",$rootScope.nav);
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
		this.cpufre={'min':.5,'max':4,'lo':.5,'hi':4};
		this.cpucor=[];
		this.ram={'min':.128,'max':4,'lo':.128,'hi':4};
		this.intr={'min':1,'max':64,'lo':1,'hi':64};
		this.card={'min':1,'max':64,'lo':1,'hi':64};
		this.batt={'min':100,'max':5000,'lo':100,'hi':5000};
		this.snsr=[];
		this.loc=[];

	
		this.scr={'min':2,'max':7,'lo':2,'hi':7};
		this.distech=[];
		this.disreso=[];
		this.disden={'min':50,'max':500,'lo':50,'hi':500};
		this.disprot=[];
		
		
		this.pricam={'min':1,'max':50,'lo':1,'hi':50};
		this.privid={'min':.1,'max':20,'lo':.1,'hi':20};
		this.seccam={'min':.1,'max':20,'lo':.1,'hi':20};
		this.secvid={'min':.1,'max':20,'lo':.1,'hi':20};
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
			if (this.facesize.indexOf(true) != -1) {q.push(['fs',this.facesize]);}
			if (this.thickness.indexOf(true) != -1) {q.push(['th',this.thickness]);}
			if (this.weight.indexOf(true) != -1) {q.push(['wt',this.weight]);}
			if ((this.os > 0) || (this.os_curr.length > 0) || (this.os_upgr.length > 0)) {
				q.push(['os',this.os]);
				if (this.os_curr.length > 0) {q.push(['oscurr',this.os_curr]);}
				if (this.os_upgr.length > 0) {q.push(['osupgr',this.os_upgr]);}
			}
			if (q.length > 0) {
				var query="http://192.168.1.2/pellego/php/results.php?";
				for (var i = 0; i < q.length; i++) {
					var elem=q[i];
					if (i > 0) {query=query.concat('&')}
					if (elem.length == 2) {query=query.concat(elem[0],'=',elem[1]);} 
					else {query=query.concat(elem[0]);}
				}
			} else {
				query="";
			}
			return query;
		}

  });
