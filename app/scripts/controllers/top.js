'use strict';


angular.module('frontendApp')
  .controller('SprCtrl',['$rootScope','$scope','Dataservice',function ($rootScope, $scope, Dataservice) {

	//function SprCtrl($rootScope, $scope, Dataservice) {
	$rootScope.tab=true;
	$scope.list=Dataservice.getselected();
	$scope.reload=function() {
		$scope.list=Dataservice.getselected();
		console.log($scope.list);
	}
	$scope.remove=function(index) {
		Dataservice.rem_sel($scope.list[index][0]);
		$scope.list.splice(index, 1);
		console.log('remove elem');
		$rootScope.$emit('someEvent', [1,2,3]);
	}
}
]);

