define(["require","angular","underscore","text!./selectOne.html"],function(e){function i(e,n,i){return{replace:!0,require:["ngModel"],controller:"questController",controllerAs:"ctrl",scope:{data:"=questData"},link:function(s,o,u,a){function h(e){var t=f;if(t.$isEmpty(e)){t.$setValidity("required",!1);return}return t.$setValidity("required",!0),e}var f=a[0],l=s.ctrl,c=s.data;o.html(r),i(o.contents())(s),l.registerModel(f,{dflt:NaN}),s.quest={answers:e(s.data.answers||[],s.data)},s.$watch("responseObj",function(e,t){if(e===t)return;s.response=e&&e.value}),s.data.required&&(f.$formatters.push(h),f.$parsers.unshift(h)),s.data.buttons?s.data.style="horizontal":s.data.style=="horizontal"&&(s.data.buttons=!0),s.listCss={},s.listItemCss={};switch(c.style){case"horizontal":s.listClass="btn-group btn-group-justified btn-group-lg",s.listItemClass="btn btn-select";break;case"multiButtons":s.listClass="btn-toolbar",s.listItemClass="btn  btn-select",s.listCss.lineHeight=2.8;break;case"list":default:s.listClass="list-group",s.listItemClass="list-group-item"}c.minWidth&&(s.listItemCss.minWidth=c.minWidth),s.autoSubmit=function(e){if(!s.data.autoSubmit)return;var r=t.element(e.target).hasClass(n.activeClass);r&&s.$emit("quest:submit:now")}}}}var t=e("angular"),n=e("underscore"),r=e("text!./selectOne.html");return i.$inject=["questSelectMixer","buttonConfig","$compile"],i});