define(["require","underscore"],function(e){function n(e,n,r){function s(e){this.pending=[],this.sent=[],this.settings={},this.meta={},this.suppress=!1,this.dfltLogFn=e||function(){return arguments[0]}}var i=this;return t.extend(s.prototype,{log:function(){var e=this.settings,n=(e.logFn||this.dfltLogFn).apply(e,arguments);if(!t.isEmpty(this.meta)&&!t.isPlainObject(n))throw e.DEBUG&&r.log(n),new Error('Logger: in order to use "meta" the log must be an object.');t.extend(n,this.meta),e.DEBUG&&r.log(n),this.pending.push(n),i.logCounter++,e.pulse&&!this.suppress&&this.pending.length>=e.pulse&&this.send()},send:function(){function u(){o.resolve()}function a(){e.post(i.url,s).then(u,function(){throw new Error("Failed to send data, it seems the backend is not responding.")})}var r,i=this.settings,s=this.pending,o=n.defer();if(s.length===0)return o.resolve();if(t.isUndefined(i.url))throw new Error("The logger url is not set.");this.pending=[],e.post(i.url,s).then(u,a);for(r=0;r<s.length;r++)this.sent.push(s[r])},suppressPulse:function(e){this.suppress=t.isUndefined(e)?!0:e},getCount:function(){return i.logCounter},setSettings:function(e){if(arguments.length===0)return this.settings;this.settings=t.defaults({},e,i.settings);if(!t.isUndefined(e.meta)&&!t.isPlainObject(e.meta))throw new Error('Logger: "meta" must be an object.');this.meta=t.defaults({},e.meta,i.meta)}}),s}var t=e("underscore");return n.$inject=["$http","$q","$log"],function(){this.$get=n,this.settings={},this.meta={},this.logCounter=0}});