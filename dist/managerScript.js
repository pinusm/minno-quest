define(["managerAPI"],function(e){var t=new e;return t.addTasksSet("instructions",{type:"message",templateUrl:"../../message.html",keys:" "}),t.addTasksSet("quests",[{type:"quest",name:"first",scriptUrl:"questScript1.js"},{type:"quest",name:"second",scriptUrl:"questScript2.js"}]),t.addSettings("onEnd",function(){console.log("onEnd")}),t.addSettings("onPreTask",function(e,t){function i(e){return angular.extend(e,n)}var n={taskName:e.name,taskNumber:e.$meta.number},r=e.$script.settings;return r.logger=r.logger||{},r.logger.logFn=i,t.post("task/advance/url",n)}),t.addSequence([{inherit:"instructions"},{inherit:{type:"exRandom",set:"quests"}},{inherit:"instructions"},{inherit:{type:"exRandom",set:"quests"}}]),t.script});