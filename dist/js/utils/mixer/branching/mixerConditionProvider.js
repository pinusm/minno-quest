define(["require","underscore","angular"],function(e){function r(e,r){function i(i,s){var o,u,a;t.isFunction(i)?a=i:(o=e(i.compare,s),u=e(i.to,s),a=i.operator),r(["conditions"]).info("Condition: ",o,a||"equals",u,i);if(t.isFunction(a))return!!a.apply(s,[o,u,s]);switch(a){case"greaterThan":if(t.isNumber(o)&&t.isNumber(u))return+o>+u;return!1;case"greaterThanOrEqual":if(t.isNumber(o)&&t.isNumber(u))return+o>=+u;return!1;case"in":if(t.isArray(u))return~t.indexOf(u,o);return!1;case"exactly":return o===u;case"equals":default:if(t.isUndefined(u))return!!o;return n.equals(o,u)}return a}return i}var t=e("underscore"),n=e("angular");return r.$inject=["mixerDotNotation","piConsole"],r});