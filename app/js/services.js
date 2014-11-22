'use strict';

/* Services */

var contactServices = angular.module('contactServices', ['ngResource']);

contactServices.factory('contactFactory', ['$resource',
  function($resource){
    return $resource('contacts/:contactId.json', {}, {
      getAllContacts: {method:'GET', params:{contactId:'contacts'}, isArray:true}
    });
  }]);
