define(["require","underscore"],function(e){function n(e,t,n){function r(r){var i=this,s;try{s=e.$eval(r)}catch(o){}finally{s||(s=r)}n(s).then(function(n){e.script=n,i.manager=new t(e,n),e.$emit("manager:next")})}this.init=r}function r(e,r){return{priority:1e3,replace:!0,template:'<div pi-swap><div pi-task="task" ng-class="{\'pi-spinner\':loading}"></div></div>',controller:n,require:["piManager","piSwap"],link:function(e,n,i,s){function l(){e.loading=!1,f=a,a=u.manager.current(),a?c():h()}function c(){r.when(t.result(f,"post")).then(function(){return r.when(t.result(a,"pre"))}).then(function(){return r.when(o.next({task:a}))})}function h(){r.when(t.result(f,"post")).then(function(){return r.when(o.empty())}).then(function(){return r.when(t.result(e.script,"onEnd"))}).then(function(){e.$emit("manager:done")})}function p(t){t.stopPropagation(),e.loading=!0,e.$emit("manager:next")}var o=s[1],u=s[0],a,f;u.init(i.piManager),e.$on("manager:loaded",l),e.$on("task:done",p),e.loading=!0}}}var t=e("underscore");return n.$inject=["$scope","managerService","managerLoad"],r.$inject=["managerService","$q"],r});