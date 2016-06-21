var DIBus = function() {
  var self = this;
  this.registeredModules = [];
  this.register = function(moduleToRun) {
    if (typeof moduleToRun.service == 'function') {
      self.registeredModules.push(moduleToRun);
      checkAllModules();
      // startModule(moduleToRun);
    }
  };
  this.new = function() {
    return new DIBus();
  };
  
  function checkAllModules() {
    //Get a list of modules that are not loaded
    var unloadedModules = getAllUnloadedModules();
    //And attempt to load them
    unloadedModules.forEach(function (unloadedModule) {
      var success = tryStartModule(unloadedModule);
    });
    if (getAllUnloadedModules().length > 0) setTimeout(checkAllModules, 300);
  }
  
  function tryStartModule(moduleToStart) {
    var dependencies = getArgs(moduleToStart.service);
    if (allDepsLoaded(dependencies)) {
      var depsToInject = getDeps(dependencies);
      moduleToStart.instance = moduleToStart.service.apply(
        moduleToStart,
        depsToInject
      );
      moduleToStart.loaded = true;
      return true;
    }
    return false;
  }
  
  function getArgs(func) {  
    return (func+'').replace(/\s+/g,'')  
      .replace(/[/][​*][^/*​]*[*][/]/g,'')
      .split('){',1)[0].replace(/^[^(]*[(]/,'')
      .replace(/=[^,]+/g,'')
      .split(',').filter(Boolean);
  }
  
  function getAllUnloadedModules() {
    return self.registeredModules.filter(function(selectedModule) {
        return selectedModule.loaded == undefined || selectedModule.loaded == false;
      });
  }
  
  function getDeps(depNames) {
    var deps = [];
    if (depNames.length > 0) {
      for (var i = 0; i < depNames.length; i++) {
        var dep = depNames[i];
        deps.push(self.registeredModules.filter(function (thisDep) {
          return thisDep.name == dep;
        })[0].instance);
      }
    }
    return deps;
  }
  
  function allDepsLoaded(depNames) {
    var deps = [];
    if (depNames.length > 0) {
      for (var i = 0; i < depNames.length; i++) {
        var dep = depNames[i];
        deps.push(self.registeredModules.filter(function (thisDep) {
          return thisDep.name == dep;
        })[0]);
      }
    }
    
    var unloadedDeps = deps.filter(function(dep) {
      return dep == undefined || 
        dep.loaded == undefined ||
        dep.loaded == false;
    });
    return unloadedDeps.length == 0;
  }
}
module.exports = new DIBus();
