'use strict';

/* jasmine specs for controllers go here */
describe('contactListCtrl test', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('contactApp'));
  beforeEach(module('contactServices'));

  describe('contactListCtrl', function(){
    var scope, ctrl, $httpBackend, fakeModal;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $modal) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('contacts/contacts.json').
          respond([{
              "id" : 1,
              "address": "1234 Rue Sherbrooke",
              "city": "Montreal",
              "firstName" : "Jane",
              "lastName" : "Smith",
              "postal" : "L3F 8K3",
              "province": "Quebec",
              "telephone": "416 723 8812"
          }]);
      scope = $rootScope.$new();
      ctrl = $controller('contactListCtrl', {$scope: scope});
      fakeModal = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
           close: function( item ) {
                    //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                    this.result.confirmCallBack( item );
            },
            dismiss: function( type ) {
                    //The user clicked cancel on the modal dialog, call the stored cancel callback
                    this.result.cancelCallback( type );
                }
       };
      spyOn($modal, 'open').andReturn(fakeModal);

    }));


    it('should create contactList model with one persons fetched from xhr', function() {
          expect(scope.contactList).toEqualData([]);
          $httpBackend.flush();

          expect(scope.contactList).toEqualData(
              [{
                  "id" : 1,
                  "address": "1234 Rue Sherbrooke",
                  "city": "Montreal",
                  "firstName" : "Jane",
                  "lastName" : "Smith",
                  "postal" : "L3F 8K3",
                  "province": "Quebec",
                  "telephone": "416 723 8812"
              }]
          );
      });

      it('should not delete contact with incorrect id', function() {
          $httpBackend.flush();
          scope.deleteContact();
          scope.modalInstance.close({"status":"ok"});
          expect(scope.contactList).toEqualData(
              [{
                  "id" : 1,
                  "address": "1234 Rue Sherbrooke",
                  "city": "Montreal",
                  "firstName" : "Jane",
                  "lastName" : "Smith",
                  "postal" : "L3F 8K3",
                  "province": "Quebec",
                  "telephone": "416 723 8812"
              }]
          );
      });

      it('should delete contact with correct id', function() {
          $httpBackend.flush();
          scope.deleteContact(1);
          scope.modalInstance.close({"status":"ok"});
          expect(scope.contactList).toEqualData([]);
      });

      it('should edit contact with correct id', function() {
          $httpBackend.flush();
          scope.openAddress(1);
          scope.modalInstance.close({
                  "id" : 1,
                  "address": "5650 Yonge Street",
                  "city": "Toronto",
                  "firstName" : "Leo",
                  "lastName" : "Joe",
                  "postal" : "M2M 7J2",
                  "province": "Ontario",
                  "telephone": "514 134 1232",
                  "status": "ok"}
          );
          expect(scope.contactList).toEqualData(
              [{
                  "id" : 1,
                  "address": "5650 Yonge Street",
                  "city": "Toronto",
                  "firstName" : "Leo",
                  "lastName" : "Joe",
                  "postal" : "M2M 7J2",
                  "province": "Ontario",
                  "telephone": "514 134 1232"
              }]);
      });

      it('should able to add a contact', function() {
          $httpBackend.flush();
          scope.openAddress();
          scope.modalInstance.close({
                  "address": "5650 Yonge Street",
                  "city": "Toronto",
                  "firstName" : "Leo",
                  "lastName" : "Joe",
                  "postal" : "M2M 7J2",
                  "province": "Ontario",
                  "telephone": "514 134 1232",
                  "status": "ok"
              }
          );
          expect(scope.contactList).toEqualData(
              [
                  {
                      "id" : 1,
                      "address": "1234 Rue Sherbrooke",
                      "city": "Montreal",
                      "firstName" : "Jane",
                      "lastName" : "Smith",
                      "postal" : "L3F 8K3",
                      "province": "Quebec",
                      "telephone": "416 723 8812"
                  },
                  {
                  "id" : 2,
                  "address": "5650 Yonge Street",
                  "city": "Toronto",
                  "firstName" : "Leo",
                  "lastName" : "Joe",
                  "postal" : "M2M 7J2",
                  "province": "Ontario",
                  "telephone": "514 134 1232"
              }]);
      });

  });

});
