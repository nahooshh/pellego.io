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
      .when('/search', {
        templateUrl: '/views/search.html',
        controller: 'SrchCtrl'
      })
      .when('/comparisongraph', {
        templateUrl: 'views/graph.html',
        controller: 'GrphCtrl'
      })
      .when('/specscomparison', {
        templateUrl: 'views/specscomparison.html',
        controller: 'SpcCtrl'
      })
      .when('/userreviews', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/price', {
        templateUrl: 'views/price.html',
        controller: 'PriceCtrl'
      })
      .when('/mobile', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      /*.when('/revBattery', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/revBody', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/revCamera', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/revHardware', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/revPerformance', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })
      .when('/revOverall', {
        templateUrl: 'views/reviews.html',
        controller: 'RevCtrl'
      })*/
      .otherwise({
        redirectTo: '/'
      });
  });
