define(["require","underscore"],function(e){function n(e,n){function r(r,i){var s,o,u;t.isFunction(r)?u=r:(s=e(r.compare,i),o=e(r.to,i),u=r.operator),n(["conditions"]).info("Condition: ",s,u||"equals",o,r);if(t.isFunction(u))return!!u.apply(i,[s,o,i]);switch(u){case"greaterThan":if(t.isNumber(s)&&t.isNumber(o))return+s>+o;return!1;case"greaterThanOrEqual":if(t.isNumber(s)&&t.isNumber(o))return+s>=+o;return!1;case"in":if(t.isArray(o))return~t.indexOf(o,s);return!1;case"exactly":return s===o;case"equals":default:if(t.isUndefined(o))return!!s;return t.isEqual(s,o)}return u}return r}var t=e("underscore");return n.$inject=["mixerDotNotation","piConsole"],n});