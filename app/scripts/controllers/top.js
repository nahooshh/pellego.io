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
		//console.log(qs);
		$http.get(qs).success(function(response) {
			console.log('response:',response);
			var elem=[response[0],label];
			Dataservice.add_sel(elem);
			Dataservice.add_label(label, response);
			$rootScope.sbar=false;
			$rootScope.disgoto=false;
			//console.log($scope.list);
			console.log("selected", Dataservice.selected);
			//console.log('sending event',elem);
			//$rootScope.$emit('someEvent', elem);
		});
	}



	$rootScope.$on('addEvent', function(event, args) { add(args); });
	function add(specid) {
		//var index=$scope.list.length;
		console.log('recvd event',specid);
		//var qs="http://192.168.1.2/pellego/php/getcolors.php".concat("?specid=",elem[0]);
		//$http.get(qs).success(function(response) {
			var label=Dataservice.get_label(specid);
			var response=Dataservice.get_colors(specid);
			console.log("response",response);
			var colors=[];
			var links=[];
			var listopt="";

			for (var i = 0; i < response.length; i++) {
				var color=response[i].replace("_", " ");
				var link="".concat("images/phonepics2/",specid,"/",specid,"_",response[i],"-small_pellego.jpeg");
				colors.push(color);
				links.push(link);
				
				listopt=listopt.concat("<li id=\"", specid, "_", response[i], "\" val=\"", link, "\" ");
				listopt=listopt.concat("onclick=\"getcolorpic(this)\" style=\"cursor:pointer;\">",color,"</li>");
			}
			//console.log(listopt);

			/*var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel", specid, "\"><div class=\"shortlist-pics\">", "<div class=\"thumbnail\">", 
		"<img id=\"pic_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div></div>",
		"<div class=\"shortlist-title\">", "<span class=\"shortlist-model\">", label, "</span></div>",
		"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" style=\"float:right\">X</button>",
		"<div class=\"btn-group\" style=\"float:right;margin-top:20px;\">",
		"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
		"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div></div>");*/

			var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel", specid, "\"><div class=\"thumbnail\">", 
		"<img id=\"pic_", specid, "\" src=\"",links[0],"\" alt=\"Image\"></div>",
		"<div class=\"shortlist-text\">", "<span class=\"shortlist-model\">", label, "</span>",
		"<div class=\"btn-group\" style=\"position:absolute;bottom:5px;left:0px;\">",
		"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
		"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div>",
		"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",specid,")\" >X</button>",
		"</div></div>");

			//console.log(entry);
			$("#selected").append($compile(entry)($scope));
		//});
		//$scope.$apply();
	}
	$scope.remove=function(specid) {
		console.log("remove",specid);
		Dataservice.rem_sel(String(specid));
		$("#sel".concat(specid)).remove();
		console.log(Dataservice.selected);
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

