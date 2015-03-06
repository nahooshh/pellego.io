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
		this.add_sel = function(elem) {
			var i = elem[0];
			if (this.selected.indexOf(i) == -1) {
				this.selected.push(i);
				console.log('sending event',elem);
				$rootScope.$emit('someEvent', elem);
			}
			console.log("added",i,"to selected");
			//console.log(i);
		}
		this.rem_sel = function(i) {
			var index=this.selected.indexOf(i);
			if (index != -1) {
				this.selected.splice(index, 1);
				console.log("removed",i);
			}
		}
		this.add_label = function(label,d) {
			if (this.all[d[0]]) {}
			else {
				this.all[d[0]]=[label].concat(d.slice(1,d.length));
			}
			console.log("all:",this.all);
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

		this.price={'min':1000,'max':100000,'lo':1000,'hi':100000};
		this.brand=[];
		this.facesize=[false,false,false];
		this.thickness=[false,false,false];
		this.weight=[false,false,false];
		this.os=1;
		this.os_curr=[];
		this.os_upgr=[];
		this.overall=[false,false,false,false]
		this.hardware=[false,false,false,false]
		this.display=[false,false,false,false]
		this.camera=[false,false,false,false]
		this.similar0=[['',0,0,0,0],[false.false,false,false]]
		this.similar1=[['',0,0,0,0],[false.false,false,false]]
		this.similar2=[['',0,0,0,0],[false.false,false,false]]
		this.similar3=[['',0,0,0,0],[false.false,false,false]]

		this.xmin=0;
		this.xmax=0;
		this.graph_sel='ov';

  });
