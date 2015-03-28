'use strict';


angular.module('frontendApp')
  .controller('SprCtrl',['$rootScope','$scope','Dataservice','$compile','$http', function ($rootScope, $scope, Dataservice, $compile, $http) {

	$rootScope.tab=true;

	$( ".modelsearch" ).autocomplete({
		source: "http://192.168.1.2/pellego/php/autocomplete.php",
		delay: 500,
		minLength: 2,
		select: function( event, ui ) {
			handle_select(ui.item.label);
		}
	});

	function handle_select(label) {
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
			var qs="http://192.168.1.2/pellego/php/getdata.php".concat("?make=",make,"&model=",model);
		}
		else {
			var qs="http://192.168.1.2/pellego/php/getdata.php".concat("?make=",make,"&model=",model,"&type=",type);
		}
		$http.get(qs).success(function(response) {
			console.log('response:',response);
			var newset = Dataservice.add_label(label, response);
			console.log("newset:",newset);
			if (newset) {
				$rootScope.$emit('ReloadGraphEvent',"");
				console.log('sending ReloadGraphEvent from top.js');
			}
			//var elem=[response[0],label];
			//var selset = Dataservice.add_sel(elem);
			var specid = response[0][0];
			var selset = Dataservice.add_sel(specid);
			if (selset) {
				add(specid);
				$rootScope.$emit('SLEvent', specid);
				$rootScope.sbar=false;
				$rootScope.disgoto=false;
			}
			//console.log("selected", Dataservice.selected);
		});
	}



	//$rootScope.$on('addEvent', function(event, args) { add(args); });
	$rootScope.$on('SLAddEvent', function(event, args) { 
		console.log('received SLAddEvent');
		add(args); 
	});
	$rootScope.$on('SLRemEvent', function(event, args) { 
		console.log('received SLRemEvent');
		remove2(args); 
	});
	function add(specid) {
		/*if (Dataservice.selected.length > 0) {
			$rootScope.sbar=false;
			$rootScope.disgoto=false;
		} else {
			$rootScope.sbar=true;
			$rootScope.disgoto=true;
		}*/
		var label=Dataservice.get_label(specid);
		var response=Dataservice.get_colors(specid);
		var colors=[];
		var links=[];
		var listopt="";

		for (var i = 0; i < response.length; i++) {
			var color=response[i].replace("_", " ");
			var link="".concat("images/phonepics2/",specid,"/",specid,"_",response[i],"-small_pellego.jpeg");
			colors.push(color);
			links.push(link);
			
			listopt=listopt.concat("<li id=\"", specid, "_", response[i], "\" val=\"", link, "\" ");
			listopt=listopt.concat("ng-click=\"getcolorpic(",specid,"\,\'",link,"\'",")\" style=\"cursor:pointer;\">",color,"</li>");
		}

		/*var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel", specid, "\"><div class=\"shortlist-pics\">", "<div class=\"thumbnail\">", 
	"<img id=\"pic_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div></div>",
	"<div class=\"shortlist-title\">", "<span class=\"shortlist-model\">", label, "</span></div>",
	"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" style=\"float:right\">X</button>",
	"<div class=\"btn-group\" style=\"float:right;margin-top:20px;\">",
	"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
	"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div></div>");*/

		var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel_", specid, "\"><div class=\"thumbnail\">", 
	"<img id=\"pic_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div>",
	"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
	"<div class=\"btn-group\" style=\"position:absolute;bottom:5px;left:0px;\">",
	"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
	"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div>",
	"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" >X</button>",
	"</div></div>");

		$("#selected").append($compile(entry)($scope));
		//$scope.$apply();
	}
	$scope.getcolorpic=function(specid,val) {
		var id="#pic_".concat(specid);
		$(id).attr('src',val);
	}
	$scope.remove=function(specid) {
		Dataservice.rem_sel(String(specid));
		$("#sel_".concat(specid)).remove();
		$rootScope.$emit('SLEvent', specid);
		/*if (Dataservice.selected.length > 0) {
			$rootScope.sbar=false;
			$rootScope.disgoto=false;
		} else {
			$rootScope.sbar=true;
			$rootScope.disgoto=true;
		}*/
	}
	function remove2(specid) {
		$("#sel_".concat(specid)).remove();
		if (Dataservice.selected.length > 0) {
			$rootScope.sbar=false;
			$rootScope.disgoto=false;
		} else {
			$rootScope.sbar=true;
			$rootScope.disgoto=true;
		}
	}
}
]);

