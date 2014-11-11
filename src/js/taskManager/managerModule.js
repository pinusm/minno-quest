define(function(require){

	var angular = require('angular');
	var module = angular.module('taskManager',[
		require('./task/taskModule').name,
		require('utils/helperDirectives/helperDirectivesModule').name
	]);

	module.service('managerService', require('./managerService'));
	module.service('managerSequence', require('./managerSequence'));
	module.service('managerLoad', require('./managerLoadService'));
	module.service('managerGetScript', require('./managerGetScriptService'));
	module.directive('piManager', require('./managerDirective'));

	return module;
});