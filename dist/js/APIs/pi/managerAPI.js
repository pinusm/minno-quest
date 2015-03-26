define(["require","../managerAPI","underscore","APIs/pi/APIdecorator","text!./messageTemplate.jst","text!./messageTemplateDebrief.jst","text!./messageTemplatePanel.jst"],function(e){function a(){t.call(this),this.settings.onPreTask=f}function f(e,t,i){var u=i.global,a,f,h={taskName:e.name||"namelessTask",taskNumber:e.$meta.number};if(e.type=="quest"||e.type=="pip")e.$script.serial=e.$meta.number,a=e.$script.settings,a.logger=a.logger||{},a.logger.meta=angular.extend(a.logger.meta||{},h);return e.type=="message"&&e.piTemplate&&(f={content:e.$template,global:u,current:u.current,task:e},e.piTemplate=="debrief"?(n.extend(f,{showFeedback:n.bind(c,null,u),showPanel:l}),e.$template=n.template(o)(f),e.$template=n.template(e.$template)(f)):e.$template=n.template(s)(f)),e.last&&(h.sessionStatus="C"),r?!0:t.post("/implicit/PiManager",h)}function l(e,t,r){return n.template(u,{content:e,header:t,footer:r})}function c(e,t){n.isPlainObject(t)||(t={}),n.defaults(t,{pre:"<p>",post:"</p>",wrap:!0,header:"",noFeedback:"<p>No feedback was found</p>",property:"feedback",exclude:[]});var r=n(e).filter(function(e,r){if(!n.isArray(t.exclude))throw Error("Exclude must be an array");return n.isPlainObject(e)&&!n.isUndefined(e[t.property])&&n.indexOf(t.exclude,r)===-1}).mapValues(function(e){return t.pre+e[t.property]+t.post}).reduce(function(e,t){return e+t},"")||t.noFeedback;return t.wrap?l(r,t.header):r}var t=e("../managerAPI"),n=e("underscore"),r=/^(localhost|127.0.0.1)/.test(location.host),i=e("APIs/pi/APIdecorator"),s=e("text!./messageTemplate.jst"),o=e("text!./messageTemplateDebrief.jst"),u=e("text!./messageTemplatePanel.jst");return i(a),n.extend(a.prototype,t.prototype),f.$inject=["currentTask","$http","$rootScope"],a});