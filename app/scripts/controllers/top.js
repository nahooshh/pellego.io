'use strict';


angular.module('frontendApp')
  .controller('SprCtrl',['$rootScope','$scope','Dataservice','$compile','$http', function ($rootScope, $scope, Dataservice, $compile, $http) {

	$rootScope.tab=true;
	$rootScope.$on('someEvent', function(event, args) { add(args); });
	function add(elem) {
		//var index=$scope.list.length;
		console.log('recvd event',elem[1]);
		var qs="http://192.168.1.2/pellego/php/getcolors.php".concat("?specid=",elem[0]);
		$http.get(qs).success(function(response) {

			console.log("response",response);
			var colors=[];
			var links=[];
			var listopt="";

			for (var i = 0; i < response.length; i++) {
				var color=response[i][0].replace("_", " ");
				var link="".concat("images/phonepics2/",elem[0],"/",elem[0],"_",response[i][0],"-small_pellego.jpeg");
				colors.push(color);
				links.push(link);
				
				listopt=listopt.concat("<li id=\"", elem[0], "_", response[i][0], "\" val=\"", link, "\" ");
				listopt=listopt.concat("onclick=\"getcolorpic(this)\" style=\"cursor:pointer;\">",color,"</li>");
			}
			//console.log(listopt);

			var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel", elem[0], "\"><div class=\"shortlist-pics\">", "<div class=\"thumbnail\">", 
		"<img id=\"pic_", elem[0], "\" src=\"",links[0],"\" alt=\"Image\"></div></div>",
		"<div class=\"shortlist-title\">", "<span class=\"shortlist-model\">", elem[1], "</span></div>",
		"<div class=\"shortlist-btns\">", "<button class=\"btn btn-danger btn-xs\" ng-click=\"remove(",elem[0],")\" style=\"float:right\">X</button>",
		"<div class=\"btn-group\" style=\"float:right;margin-top:20px;\">",
		"<button type=\"button\" class=\"btn btn-info dropdown-toggle btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">Colors</button>",
		"<ul class=\"dropdown-menu\" role=\"menu\">", listopt, "</ul></div></div></div>");

			//console.log(entry);
			$("#selected").append($compile(entry)($scope));
		});
		//$scope.$apply();
	}
	$scope.remove=function(setid) {
		console.log("remove",setid);
		Dataservice.rem_sel(String(setid));
		$("#sel".concat(setid)).remove();
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

