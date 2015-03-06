'use strict';


angular.module('frontendApp')
  .controller('SprCtrl',['$rootScope','$scope','Dataservice','$compile','$http', function ($rootScope, $scope, Dataservice, $compile, $http) {

	$rootScope.tab=true;
	$rootScope.$on('someEvent', function(event, args) { add(args); });
	function add(elem) {
		//var index=$scope.list.length;
		console.log('recvd event',elem[1]);
		var qs="http://mac/pellego/php/getcolors.php".concat("?setid=",elem[0]);
		$http.get(qs).success(function(response) {
			console.log("response",response);
			var listopt=""
			for (var i = 0; i < response.length; i++) {
				listopt=listopt.concat("<li id=\"",elem[0],"_",response[i][0],"\" val=\"images/", elem[0], "/", response[i][1], "\" ");
				listopt=listopt.concat("onclick=\"getcolorpic(this)\" style=\"cursor:pointer;\">",response[i][0],"</li>");
			}
			//console.log(listopt);

			var entry="<div class=\"shortlist-elem\" ".concat("id=\"sel", elem[0], "\"><div class=\"shortlist-pics\">", "<div class=\"thumbnail\">", 
		"<img id=\"pic_", elem[0], "\" src=\"images/", elem[0], "/", response[0][1],"\" alt=\"Image\"></div></div>",
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
	}
}
]);

