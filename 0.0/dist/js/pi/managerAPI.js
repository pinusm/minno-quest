define(["require","taskManager/API","underscore","text!pi/messageTemplate.html"],function(e){function s(){t.call(this),this.settings.onPreTask=o}function o(e,t,s){var o=s.global,u,a={taskName:e.name||"namelessTask",taskNumber:e.$meta.number};if(e.type=="quest"||e.type=="pip")u=e.$script.settings,u.logger=u.logger||{},u.logger.meta=angular.extend(u.logger.meta||{},a);return e.type=="message"&&e.piTemplate&&(e.$template=n.template(i,{content:e.$template,global:o,current:o.current,task:e})),e.last&&(a.sessionStatus="C"),r?!0:t.post("/implicit/PiManager",a)}var t=e("taskManager/API"),n=e("underscore"),r=/^(localhost|127.0.0.1)/.test(location.host),i=e("text!pi/messageTemplate.html");return n.extend(s.prototype,t.prototype),o.$inject=["currentTask","$http","$rootScope"],s});