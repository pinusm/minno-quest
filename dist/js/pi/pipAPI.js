define(["require","pip/API","underscore"],function(e){function i(e){t.call(this,e);var n=this.settings,i=this.script;n.logger={pulse:20,url:"/implicit/PiPlayerApplet"},i.play=s,i.buildBaseUrl=o,r&&(i.version="DEV!")}function s(e,t,i,s){var o,u,a,f=s.version||this.version;if(s.type!=="pip")throw new Error('Expected task.type to be "pip" but found: "'+s.type+'".');if(!f)throw new Error("Version not defined for pip task: "+(s.name||i.name));a=this.buildBaseUrl(f),u=requirejs.config({context:n.uniqueId(),baseUrl:a+(r?"src/js":"/dist/js/"),paths:{text:["//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text.min",a+"/bower_components/requirejs-text/text"],jquery:["//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min",a+"/bower_components/jquery/dist/jquery.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min",a+"/bower_components/lodash-compat/lodash.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",a+"/bower_components/backbone/backbone"]},deps:["jquery","backbone","underscore"]}),s.name&&(i.name=s.name),t.append("<div pi-player></div>"),o=t.contents(),o.addClass("pi-spinner"),u(["activatePIP"],function(t){o.removeClass("pi-spinner"),t(i,e)})}function o(e){return r?"/pip/":"/implicit/common/all/js/pip/"+e}var t=e("pip/API"),n=e("underscore"),r=/^(localhost|127.0.0.1)/.test(location.host);return n.extend(i.prototype,t.prototype),i.prototype.setVersion=function(t){this.script.version=t},s.$inject=["done","$element","script","task"],i});