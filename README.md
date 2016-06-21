#DIBus
A dependency injection framework for shared-reference development

##API
Modules should be exposed in the format of an object with a name and service property. See the examples below.
First require the module with `var DIBus = require('dibus');`

`DIBus.new()` - Return a new instance of the DIBus.

`DIBUS.register(module)` - Register a module with the `DIBus` it will be instantiated and injected into other modules that depend upon it in their pram list.

##Example
```javascript
  var modulea = {
    name: 'a',
    service: function() {
      console.log('Module a loaded');
    }
  };
  var moduleb = {
    name: 'b',
    service: function(a) {
      console.log('Module b loaded');
      console.dir(b);
    }
  };

  var DIBus = require('dibus');

  DIBus.register(modulea);
  DIBus.register(moduleb);
```
