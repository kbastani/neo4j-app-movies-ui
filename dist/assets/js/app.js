'use strict';

/* App Module */

var contentApp = angular.module('contentApp', [
  'ngRoute',
  'contentappControllers'
]);

contentApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'assets/partials/home.html',
        controller: 'MovieListCtrl'
      }).
      when('/movies/:movieId', {
        templateUrl: 'assets/partials/movie-detail.html',
        controller: 'MovieItemCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);