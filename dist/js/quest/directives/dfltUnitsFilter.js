define(["require","underscore"],function(e){function n(e,n){var i;return!e&&e!==0&&e!=="0"?"":r(e)?(i=t.isUndefined(n)?"px":String(n),e+i):e}function r(e){return!t.isArray(e)&&e-parseFloat(e)+1>=0}var t=e("underscore");return function(){return n}});