//Mocha Tests
const assert = require('assert');
const diBus = require('./diBus');

describe('Module Loading', function() {
  it('ModuleB should have a reference to ModuleB and be able to call the test method', function() {
    let moduleA = {
      name: 'ModuleA',
      service: function() {
        return {
          test: function() {
            return true;
          }
        };
      }
    };

    let moduleB = {
      name: 'ModuleB',
      service: function(ModuleA) {
        assert(ModuleA.test());
        return {};
      }
    };

    diBus.register(moduleA);
    diBus.register(moduleB);
  });
});