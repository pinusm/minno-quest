define([],function(){var e=require.config({paths:{questAPI:"quest/API",managerAPI:"taskManager/API",underscore:["//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min","../../bower_components/lodash/dist/lodash.min"],angular:["//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min","../../bower_components/angular/angular"],animate:["//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate.min","../../bower_components/angular-animate/angular-animate"],text:["//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min","../../bower_components/requirejs-text/text"]},shim:{angular:{exports:"angular"},animate:{deps:["angular"],exports:"angular"}},deps:["angular","animate","underscore","text","questAPI"]});return window.name="NG_DEFER_BOOTSTRAP!",require(["angular","app"],function(e,t){e.element().ready(function(){e.resumeBootstrap([t.name])})}),e});