define(["angular","./spinnerDirective"],function(e,t){e.module("piSpinner",[]).directive("piSpinner",t),describe("piSpinner",function(){var t,n,r,i=e.element;beforeEach(module("piSpinner"));var s=function(s,o){t=i('<div pi-spinner="value">'+o+"</div>"),n.value=s,r(t)(n),n.$digest()};beforeEach(inject(function(e){r=e.get("$compile"),n=e.get("$rootScope").$new()})),it("should display a spinner if value is true",function(){var e=1234;s(!0,e),expect(t.children().length).toBe(1),expect(t.find("img").length).toBe(1)}),it("should display content if value is false",function(){var e="<span>1234</span>";s(!1,e),expect(t.find("span").html()).toBe("1234")})})});