'use strict';

/* App Module */

var contactApp = angular.module('contactApp', [
  'ngRoute',
  'ui.bootstrap.modal',
  'ui.bootstrap.transition',
  'contactServices',
  'contactControllers',
  'contactDirectives'
]);

contactApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'partials/contact-list.html',
        controller: 'contactListCtrl'
      }).
      otherwise({
        redirectTo: '/contacts'
      });
  }]);
