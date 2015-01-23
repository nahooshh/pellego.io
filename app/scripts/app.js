'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngResource',
    'ngRoute',
		'LocalStorageModule'
  ])
	.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  	localStorageServiceProvider.setPrefix('ls');
	}])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
      })
      .when('/quicksearch', {
        templateUrl: '/views/quicksearch.html',
        controller: 'TmpCtrl'
      })
      .when('/specssearch', {
        templateUrl: 'views/specssearch.html',
        controller: 'TmpCtrl'
      })
      .when('/comparisongraph', {
        templateUrl: 'views/quicksearch.html',
        controller: 'TmpCtrl'
      })
      .when('/specscomparison', {
        templateUrl: 'views/specscomparison.html',
        controller: 'TmpCtrl'
      })
      .when('/userreviews', {
        templateUrl: 'views/userreviews.html',
        controller: 'TmpCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
