'use strict';

/* Controllers */

var contactControllers = angular.module('contactControllers', []);

contactControllers.controller('contactListCtrl', ['$scope', 'contactFactory','$modal',
  function($scope, contactFactory, $modal) {
      $scope.contactList = contactFactory.getAllContacts();
      $scope.searchPerson = function (person){
          if(_.isUndefined($scope.query)) return true;
          if (person.firstName.toUpperCase().indexOf($scope.query.toUpperCase()) != -1
              || person.lastName.toUpperCase().indexOf($scope.query.toUpperCase()) != -1
              || (person.firstName.toUpperCase() + ' ' + person.lastName.toUpperCase()).indexOf($scope.query.toUpperCase()) != -1 ) {
              return true;
          }
          return false;
      };

      //For unit testing, let modalInstance can be faked
      $scope.modalInstance;

      $scope.deleteContact = function(id){
          $scope.modalInstance = $modal.open({
                  templateUrl: 'template/deleteContact.html',
                  controller: 'modal.deleteContact',
                  size: 'md',
                  resolve: {
                      data: function () {
                          return _.find($scope.contactList,{id: id});
                      }
                  }
           });
          $scope.modalInstance.result.then( function(response){
                if(response.status == 'ok'){
                    _.remove($scope.contactList, {id :id});
                }
          });
      };

      $scope.openAddress = function(id){
          $scope.modalInstance = $modal.open({
              templateUrl: 'template/address-details.html',
              controller: 'modal.openAddress',
              size: 'lg',
              resolve: {
                  data: function () {
                      return _.find($scope.contactList,{id: id});
                  }
              }
          });
          $scope.modalInstance.result.then( function(response){
              if(response.status == 'ok'){

                  if(!_.isUndefined(response.id)){
                      //edit a person
                      var person = _.find($scope.contactList, {id: response.id});
                      person.address = response.address;
                      person.city = response.city;
                      person.firstName = response.firstName;
                      person.lastName = response.lastName;
                      person.postal= response.postal;
                      person.province = response.province;
                      person.telephone= response.telephone;
                  }
                  else{
                      //add a person
                      //generate an id, simply add 1 to the maximum id in the array
                      if($scope.contactList.length == 0){
                          var id = 1;
                      }
                      else{
                          var id = $scope.contactList[$scope.contactList.length - 1].id + 1;
                      }
                      var person = new Object();
                      person.id = id;
                      person.address = response.address;
                      person.city = response.city;
                      person.firstName = response.firstName;
                      person.lastName = response.lastName;
                      person.postal= response.postal;
                      person.province = response.province;
                      person.telephone= response.telephone;
                      $scope.contactList.push(person);
                  }

              }

          });
      };

  }]);

 contactControllers.controller('modal.openAddress', [ '$modalInstance','$scope', 'data', function( $modalInstance, $scope, data) {
     $scope.provinceChoices = ['Alberta','British Columbia','Manitoba','New Brunswick',
         'Newfoundland and Labrador','Northwest Territories','Nova Scotia', 'Nunavut', 'Ontario','Prince Edward Island',
         'Quebec', 'Saskatchewan','Yukon (Territory)'];

     if(_.isUndefined(data)){
        $scope.person = {};
    }
    else{
        $scope.person = {
             "id" : data.id,
             "address": data.address,
             "city": data.city,
             "firstName" : data.firstName,
             "lastName" : data.lastName,
             "postal" : data.postal,
             "province": data.province,
             "telephone": data.telephone
         };
    }

     $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.ok = function (form) {
        form.submitted = true;
        if (form.$valid) {
            $modalInstance.close(_.assign($scope.person, {status: 'ok'}));
        }
    };
}]);

contactControllers.controller('modal.deleteContact', [ '$modalInstance','$scope', 'data', function( $modalInstance, $scope, data) {

    $scope.personDetail = data;

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.ok = function (form) {
        $modalInstance.close({"status":'ok'});
    };
}]);
