define(["require","underscore","text!./piQuest.html","angular"],function(e){function i(e,n,r,i,s){function h(t,n){u.next(n),e.$emit("quest:newPage")}function p(t,n){u.prev(n),e.$emit("quest:newPage")}var o=this,u=o.task=new r(e.script),a,f=n.global,l=e.script,c=n.global[l.name||"current"]=n.current={questions:{}};l.current&&t.extend(c,l.current),l.global&&t.extend(f,l.global),a={global:f,current:c,questions:c.questions},t.extend(i,a),t.extend(s,a),u.next(),e.$on("quest:next",h),e.$on("quest:prev",p),e.$on("quest:log",function(t,n,r){u.log(n,r,e.global)})}function s(e,s,o){return{replace:!0,controller:i,link:function(i,u,a,f){function d(){p&&(p.remove(),p=null),c&&(c.$destroy(),c=null),h&&(s.leave(h,function(){p=null}),p=h,h=null)}function v(){var t=l.current();if(t){var o=i.$new(),a=r(n);o.page=t,g(a,t.animate),d(),h=e(a)(o),s.enter(h,u),c=o,c.$emit("quest:updated")}else d()}function m(){c.page=l.current()}function g(e,n){if(!n)return;var r=n.split(" ");t.each(r,function(e){if(!o.has("."+e+"-animation"))throw new Error('Unknown animation type: "'+e+'"')}),e.addClass(n)}var l=f.task,c,h,p;i.$on("quest:refresh",m),i.$on("quest:newPage",v),v()}}}var t=e("underscore"),n=e("text!./piQuest.html"),r=e("angular").element;return i.$inject=["$scope","$rootScope","Task","templateDefaultContext","mixerDefaultContext"],s.$inject=["$compile","$animate","$injector"],s});