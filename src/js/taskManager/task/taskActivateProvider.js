/**
 * @name: taskActivateProvider
 */
define(function(require){

	var _ = require('underscore');


	function provider(){
		var activators = {};

		this.$get = taskActivateProvider;

		this.set = function set(name, fn){
			activators[name] = fn;
		};

		this.get = function(name){
			return activators[name];
		};
	}


	taskActivateProvider.$inject = ['$q', '$rootScope', '$injector'];
	function taskActivateProvider($q,$rootScope, $injector){
		var self = this;

		function taskActivate(task, script, $element, $scope){
			var activator;
			var def = $q.defer();
			var global = $rootScope.global;

			// get activation function
			if (_.isFunction(script)){
				activator = script;
			}

			if (!activator && _.isFunction(script.play)){
				activator = _.bind(script.play, script);
			}

			if (!activator && task.type){
				activator = self.get(task.type);
			}

			if (!_.isFunction(activator)){
				throw new Error('Activator function not found for the "' + task.type + '" task');
			}

			// activate task
			/**
			 * activation function
			 * @param {function} done calback for finishing the task
			 * @param {obj} props an object with all the stuff we think we could need...
			 * @type {[type]}
			 */
			activator(_.bind(def.resolve,def), {
				task: task,
				script: script,
				$element: $element,
				$scope: $scope,
				global: global,
				$injector: $injector
			});

			return def.promise;
		}

		return taskActivate;
	}

	return provider;
});