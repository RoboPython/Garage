'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/record', {
      templateUrl: 'partials/record',
      controller: 'recordCtrl'
    }).
    when('/invoice', {
      templateUrl: 'partials/invoice',
      controller: 'invoiceCtrl'
    });
    //.otherwise({
    //  redirectTo: '/record'
    //});

  $locationProvider.html5Mode(true);
});
