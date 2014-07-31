define(['../questDirectivesModule'], function(){

	describe('questWrapper',function(){

		var elm, scope, $compile, $document;
		var jqLite = angular.element;

		var compile = function compileInput(data){
			var html = '<div quest-wrapper quest-data="data" quest-current="current"></div>';
			elm = jqLite(html);
			scope.data = data;
			$compile(elm)(scope);
			scope.$digest();
		};

		beforeEach(module('questDirectives', function($sceProvider,$compileProvider){
			$sceProvider.enabled(false);
			// create fake directive
			$compileProvider.directive('questFake',function(){return {};});
		}));

		beforeEach(inject(function($injector) {
			$compile = $injector.get('$compile');
			$document = $injector.get('$document');
			scope = $injector.get('$rootScope');
			scope.current = {questions:{}};
			scope = scope.$new();
		}));

		it('should log the question correctly', function(){
			compile({name:'myName'});
			expect(scope.current.questions.myName).toBeDefined();
		});

		it('should render the quest "type"', function(){
			compile({type:'fake'});
			expect(elm.children().eq(1).attr('quest-fake')).toBeTruthy();
		});

		it('should render stem', function(){
			compile({stem:'Hello'});
			expect(elm.find('label').text()).toBe('Hello');
		});

		it('should render help', function(){
			compile({help:true, helpText:'Hello'});
			expect(elm.find('p.help-block').text()).toBe('Hello');
			compile({help:false, helpText:'Hello'});
			expect(elm.find('p.help-block').length).toBe(0);
		});

		it('should throw for unknown directives', function(){
			expect(function(){
				compile({type:'error test'});
			}).toThrow();
		});
	});
});