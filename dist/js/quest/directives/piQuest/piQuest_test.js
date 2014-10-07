define(["../questDirectivesModule"],function(){var e=angular.element,t,n,r,i;angular.module("questDirectives").animation(".test",function(){}),describe("piQuest",function(){function a(){n=e("<div pi-quest></div>"),r.script=s,i(n)(r),r.$digest(),t=n.controller("piQuest")}var s={name:"myName",global:{extendGlobal:!0},current:{extendCurrent:!0}},o,u=jasmine.createSpy("Task").andCallFake(function(){return o=jasmine.createSpyObj("Task",["log","next","prev","current"])});beforeEach(module("questDirectives","task",function(e,t){e.value("Task",u),t.directive("piqPage",function(){return{priority:999,terminal:!0}})})),beforeEach(inject(function(e){i=e.get("$compile");var t=e.get("$rootScope");t.global={},r=t.$new()})),afterEach(inject(function(e,t){delete e.global,delete e.current,delete e.questions,delete t.global,delete t.current,delete t.questions})),describe("Controller",function(){beforeEach(a),it("should create a task from the script",function(){expect(t.task).toBeDefined(),expect(u).toHaveBeenCalledWith(s)}),it('should listen for "quest:next" and act accordingly',function(){r.$new().$emit("quest:next","nextObj"),expect(o.next).toHaveBeenCalled(),expect(o.current).toHaveBeenCalled()}),it('should listen for "quest:prev" and act accordingly',function(){r.$new().$emit("quest:prev"),expect(o.prev).toHaveBeenCalled(),expect(o.current).toHaveBeenCalled()}),it('should setup task by caling "next"',function(){expect(o.next).toHaveBeenCalled()}),it('should listen for "quest:log" and log accordingly',function(){r.$new().$emit("quest:log",1,"currentPageData"),expect(o.log).toHaveBeenCalledWith(1,"currentPageData",r.global)}),it('should create a "current" quest object',inject(function(e){expect(e.global.myName).toEqual(jasmine.any(Object)),expect(e.global.myName.questions).toEqual(jasmine.any(Object)),expect(r.current).toBe(e.global.myName)})),it('should extend the "current" quest object with script.current',function(){expect(r.current.extendCurrent).toBeTruthy()}),it('should extend the "globa" object with script.global',function(){expect(r.global.extendGlobal).toBeTruthy()}),it("should setup the templateDefaultContext",inject(function(e){expect(e.global).toBe(r.global),expect(e.current).toBe(r.current),expect(e.questions).toBe(r.current.questions)})),it("should setup the mixerDefaultContext",inject(function(e){expect(e.global).toBe(r.global),expect(e.current).toBe(r.current),expect(e.questions).toBe(r.current.questions)}))}),describe("directive",function(){describe(": animation",function(){it("should add appropriate animation",function(){a(),o.current.andReturn({animate:"test"}),r.$emit("quest:newPage"),expect(n.children()).toHaveClass("test")}),it("should throw for unknown animation",function(){a(),o.current.andReturn({animate:"fake"}),expect(function(){r.$emit("quest:newPage")}).toThrow()})})})}),describe("piqPage",function(){function o(r){n=e("<div piq-page></div>"),s.page=r,i(n)(s),s.$digest(),t=n.controller("piqPage")}var r,s;beforeEach(module("task","questDirectives",function(e,t){e.value("Task",function(){}),t.enabled(!1)})),beforeEach(inject(function(e){i=e.get("$compile"),r=e.get("$rootScope"),r.current={questions:{}},r.global={current:r.current},s=r.$new()})),describe("Controller",function(){it("should create the basic log object",function(){o({name:"myName"}),expect(t.log).toBeDefined(),expect(t.log.name).toBe("myName")}),it("should submit when `quest:submit:now` is $emited",function(){o({}),spyOn(s,"submit"),s.$new().$emit("quest:submit:now"),expect(s.submit).toHaveBeenCalled()}),it("should refresh page when questions is changed",function(){var e=jasmine.createSpy("refresh");o({}),s.$on("quest:refresh",e),s.$digest(),expect(e).not.toHaveBeenCalled(),r.current.questions.test=!0,s.$digest(),expect(e).toHaveBeenCalled()}),describe(": proceed",function(){var e;beforeEach(function(){o({}),spyOn(t,"harvest"),e=n.scope()}),it("should harvest",function(){t.proceed(),expect(t.harvest).toHaveBeenCalled()}),it("should harvest even if there are no questions",inject(function(e){e.current.questions={},t.proceed(),expect(t.harvest).toHaveBeenCalled()}))}),describe(": submit",function(){var e;beforeEach(function(){o({}),e=n.scope(),spyOn(t,"proceed")}),it("should proceed if the page is $valid",function(){e.pageForm.$setValidity("test",!0),e.submit(),expect(t.proceed).toHaveBeenCalled()}),it("should not proceed if the page is not $valid",function(){e.pageForm.$setValidity("test",!1),e.submit(),expect(t.proceed).not.toHaveBeenCalled()}),it("should not validate if submit(true)",function(){e.pageForm.$setValidity("test",!1),e.submit(!0),expect(t.proceed).toHaveBeenCalled()}),it("should broadcast quest:submit",function(){var t=jasmine.createSpy("submit");e.$on("quest:submit",t),e.submit(!0),expect(t).toHaveBeenCalled()}),it("should broadcast quest:next",function(){var t=jasmine.createSpy("next");e.$on("quest:next",t),e.submit(!0),expect(t).toHaveBeenCalled()})}),describe(": prev",function(){var e;beforeEach(function(){o({}),e=n.scope(),spyOn(t,"proceed")}),it("should proceed",function(){e.prev(),expect(t.proceed).toHaveBeenCalled()}),it("should broadcast quest:prev",function(){var t=jasmine.createSpy("quest:prev");e.$on("quest:prev",t),e.prev(),expect(t).toHaveBeenCalled()})}),describe(": decline",function(){var e;beforeEach(function(){o({questions:[{name:"newQ"}]}),e=n.scope(),e.current.questions.old={},spyOn(t,"proceed")}),it("should proceed, even if page is not valid",function(){e.pageForm.$setValidity("test",!1),e.decline(),expect(t.proceed).toHaveBeenCalled()}),it("should broadcast quest:declined",function(){var t=jasmine.createSpy("decline");e.$on("quest:decline",t),e.decline(),expect(t).toHaveBeenCalled()}),it("should broadcast quest:next",function(){var t=jasmine.createSpy("next");e.$on("quest:next",t),e.submit(!0),expect(t).toHaveBeenCalled()})}),describe(": harvest",function(){var e,n;beforeEach(inject(function(r){r.current={questions:{}},n=jasmine.createSpy("quest:log"),s.$on("quest:log",n),e=function(e,n){o({questions:e||[]}),angular.extend(r.current.questions,n||{}),t.harvest(!0)}})),it("should not harvest nameless questions",function(){var t={"":{},"undefined":{}},r=[{},{name:""},{name:undefined}];e(r,t),expect(n).not.toHaveBeenCalled()}),it("should harvest only questions marked with lognow",inject(function(e){var r={1:{}},i=[{name:1,lognow:!0},{name:2,lognow:!1}];o({questions:i}),angular.extend(e.current.questions,r||{}),t.harvest(!1),expect(n.calls.length).toBe(1)})),it('should emit the values of all questions on page uppon "quest:log"',function(){var t={1:{},2:{}},r=[{name:1},{name:2}];e(r,t),expect(n.calls[0].args[1]).toBe(t[1]),expect(n.calls[1].args[1]).toBe(t[2])}),it("should emit all arguments with the page log",function(){var r={1:{},2:{}},i=[{name:1},{name:2}];e(i,r),expect(n.calls[0].args[2]).toBe(t.log)}),it("should log only active questions",function(){var t={1:{},2:{}},r=[{name:1}];e(r,t),expect(n.calls.length).toBe(1),expect(n.calls[0].args[1]).toBe(t[1])}),it("should mark (only) logged questions",function(){var t={1:{},2:{}},n=[{name:1}];e(n,t),expect(t[1].$logged).toBeTruthy(),expect(t[2].$logged).not.toBeTruthy()}),it("should only harvest each question once",function(){var t={1:{$logged:!0},2:{$logged:!0}},r=[{name:1},{name:2}];e(r,t),expect(n).not.toHaveBeenCalled()})}),describe("directive",function(){it("should compile the correct number of questions",function(){o({questions:[{},{},{}]}),expect(n.find("li").length).toBe(3)}),it("should compile the header",function(){o({header:"My header"}),expect(n.find("h3").text()).toBe("My header")}),it("should style the header",function(){o({header:"My header",headerStyle:{"z-index":"123"}}),expect(n.find("h3").css("z-index")).toEqual("123")}),it("should be valid only if the question are valid",function(){o({questions:[{required:!0}]}),expect(n).toBeInvalid()}),it("should not show a header if it doesnt exist",function(){o({}),expect(n.find("h2").length).toBe(0)}),it("should display numbers only if numbered is set",function(){o({}),expect(n.find("ol")).toHaveClass("list-unstyled"),o({numbered:!0}),expect(n.find("ol")).not.toHaveClass("list-unstyled")}),describe(": prev",function(){it("should not display the prev button by default",function(){var e;o({$meta:{number:3}}),e=n.find('[ng-click="prev()"]'),expect(e.length).toBe(0)}),it("should not display the prev button on the first page",function(){var e;o({$meta:{number:1}}),e=n.find('[ng-click="prev()"]'),expect(e.length).toBe(0)}),it("should display the prev button",function(){var e;o({prev:!0,$meta:{number:3}}),e=n.find('[ng-click="prev()"]'),expect(e.length).toBe(1)})})}),describe("timeout",function(){var e;beforeEach(inject(function(t){e=t,o({timeout:100})})),it("should submit",function(){spyOn(s,"submit"),e.flush(),expect(s.submit).toHaveBeenCalled(),expect(t.log.timeout).toBeDefined()}),it("should proceed even upon error",function(){spyOn(t,"proceed"),s.pageForm.$setValidity("test",!1),e.flush(),expect(t.proceed).toHaveBeenCalled()}),it("should not trigger if submit was called before it",function(){s.submit(!0),e.flush(),expect(t.log.timeout).not.toBeDefined()}),it("should optionally display a timer on the page",function(){}),it("should show a custom message",function(){})})})})});