define(["underscore"],function(e){function t(t){function n(){this.store={}}return e.extend(n.prototype,{create:function(n){if(this.store[n])throw new Error("The name space "+n+" already exists");this.store[n]=new t,this.store[n].namespace=n},read:function(t){if(!this.store[t])throw new Error("The name space "+t+" does not exist");return this.store[t]},update:function(t,n){var r=this.read(t);r.add(n)},del:function(t){this.store[t]=undefined}}),n}return t.$inject=["Collection"],t});