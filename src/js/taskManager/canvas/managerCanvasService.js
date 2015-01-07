define(function(require){

	var _ = require('underscore');
	var angular = require('angular');
	var canvasConstructor = require('./canvasConstructor');


	function managerCanvasService($rootElement, $document){
		var $body = angular.element($document[0].body);

		var map = {
			backgroundColor 	: {element: $body, property: 'backgroundColor'},
			canvasColor 		: {element: $rootElement, property:'backgroundColor'},
			fontSize 			: {element: $rootElement, property:'fontSize'},
			fontColor 			: {element: $rootElement, property:'color'}
		};

		return _.bind(canvasConstructor, null, map);
	}

	return managerCanvasService;

});