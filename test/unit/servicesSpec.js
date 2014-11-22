'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('contactApp'));

  // Test service availability
  it('check the existence of contact factory', inject(function(contactFactory) {
      expect(contactFactory).toBeDefined();
    }));
});