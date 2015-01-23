'use strict';

/**
 * @ngdoc service
 * @name frontendApp.dataService
 * @description
 * # dataService
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Dataservice', function Dataservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.selected = [];
		this.all={};
		this.add_sel = function(i) {
			if (this.selected.indexOf(i) == -1) {
				this.selected.push(i);
			}
		}
		this.rem_sel = function(i) {
			var index=this.selected.indexOf(i);
			if (index != -1) {
				this.selected.splice(index, 1);
			}
		}
		this.add = function(label,d) {
			if (this.all[d[0]]) {}
			else {
				this.all[d[0]]=[label].concat(d.slice(1,d.length));
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
    		ret = ret.concat([this.all[id][0]]);
			}
			return ret;	
		}

  });
