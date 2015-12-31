'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).

config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginCtrl'
    })
    .when('/bug', {
      templateUrl: 'partials/bug',
      controller: 'bugCtrl'
    })
    .when('/record', {
      templateUrl: 'partials/record',
      controller: 'recordCtrl'
    }).
    when('/invoice', {
      templateUrl: 'partials/invoice',
      controller: 'invoiceCtrl'
    });


  $locationProvider.html5Mode(true);
});
