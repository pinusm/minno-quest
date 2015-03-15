define(["require","angular","underscore","./taskActivateProvider","./taskDirective"],function(e){var t=e("angular"),n=t.module("pi.task",[]),r=e("underscore");return n.provider("taskActivate",e("./taskActivateProvider")),n.directive("piTask",e("./taskDirective")),n.config(["taskActivateProvider",function(e){function t(e,t,n,r,i,s){var o;s.name&&(i.name=s.name),n.script=i,t.append("<div pi-quest></div>"),o=t.contents(),r(o)(n),o.controller("piQuest").task.promise["finally"](function(){o.scope().$destroy(),o.remove(),e()})}t.$inject=["done","$element","$scope","$compile","script","task"],e.set("quest",t)}]),n.config(["taskActivateProvider",function(e){function t(e,t,n,r,i){var s;r.script=n,t.append("<div pi-message></div>"),s=t.contents(),i(s)(r),r.$on("message:done",function(){r.$destroy(),s.remove(),e()})}t.$inject=["done","$element","task","$scope","$compile"],e.set("message",t)}]),n.config(["taskActivateProvider",function(e){function t(e,t,n,i){var s,o;o=requirejs.config({context:r.uniqueId(),baseUrl:"../bower_components/PIPlayer/dist/js",paths:{text:["//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text.min","../../../requirejs-text/text"],jquery:["//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min","../../../jquery/dist/jquery.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min","../../../lodash-compat/lodash.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min","../../../backbone/backbone"]},deps:["jquery","backbone","underscore"]}),n.name&&(i.name=n.name),t.append("<div pi-player></div>"),s=t.contents(),s.addClass("pi-spinner"),o(["activatePIP"],function(t){s.removeClass("pi-spinner"),t(i,e)})}t.$inject=["done","$element","task","script"],e.set("pip",t)}]),n});