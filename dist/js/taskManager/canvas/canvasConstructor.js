define(["require","underscore"],function(e){function n(e,n){var i;if(!t.isPlainObject(e))throw new Error("canvas(map): You must set a rule map for canvas to work properly");if(t.isUndefined(n))return t.noop;if(!t.isPlainObject(n))throw new Error("canvas(settings): canvas settings must be an object");return i=t.map(n,function(t,n){var i=e[n];if(i)return r(i.element,i.property,t);throw new Error("canvas("+n+"): unknow key in canvas object.")}),function(){t.forEach(i,function(e){e.call()})}}function r(e,n,r){var i=e.css(n);return e.css(n,r),t.bind(e.css,e,n,i)}var t=e("underscore");return n});