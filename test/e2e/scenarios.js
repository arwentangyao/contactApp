'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('contactApp', function() {

  it('should redirect to #/contacts', function() {
    browser.get('app/');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/contacts');
      });
  });


  describe('Contact', function() {

    beforeEach(function() {
      browser.get('app/#/contacts');
    });


    it('should filter the contact list as user types into the search box', function() {

      var contactList = element.all(by.repeater('contact in contactList'));
      var query = element(by.model('query'));

      expect(contactList.count()).toBe(4);

      query.sendKeys('Jane');
      expect(contactList.count()).toBe(1);

      query.clear();
      query.sendKeys('Joe');
      expect(contactList.count()).toBe(1);
       query.clear();
       query.sendKeys('Wang');
       expect(contactList.count()).toBe(1);
    });

    it('should delete one contact by clicking on cross button', function() {

          var contactList = element.all(by.repeater('contact in contactList'));
          var query = element(by.model('query'));

         query.clear();

        element(by.xpath("//i[contains(@ng-click,'deleteContact')][1]")).click();

        element(by.xpath("//button[contains(@ng-click,'ok')]")).click();

        expect(contactList.count()).toBe(3);
      });



  });

});
