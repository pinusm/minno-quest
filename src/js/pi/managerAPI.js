define(function(require){

	var Constructor = require('taskManager/API');
	var _ = require('underscore');
	var isDev = /^(localhost|127.0.0.1)/.test(location.host);

	var messageTemplate = require('text!pi/messageTemplate.jst');
	var messageTemplateDebrief = require('text!pi/messageTemplateDebrief.jst');
	var messageTemplatePanel = require('text!pi/messageTemplatePanel.jst');

	/**
	 * Constructor for PIPlayer script creator
	 * @return {Object}		Script creator
	 */
	function API(){
		Constructor.call(this);
		this.settings.onPreTask = onPreTask;
	}

	// create API functions
	_.extend(API.prototype, Constructor.prototype);

	// annotate onPreTask
	onPreTask.$inject = ['currentTask', '$http','$rootScope'];

	return API;

	/**
	 * Before each task,
	 * 		post to /implicit/PiManager
	 * 		in case this is a quest/pip added logging meta
	 *
	 * @param  {Object} currentTask The task Object
	 * @param  {Object} $http       The $http service
	 * @return {Promise}            Resolved when server responds
	 */
	function onPreTask(currentTask, $http, $rootScope){

		var global = $rootScope.global;
		var settings, context;
		var data = {taskName: currentTask.name || 'namelessTask', taskNumber: currentTask.$meta.number};

		// add logging meta
		if (currentTask.type == 'quest' || currentTask.type == 'pip'){
			settings = currentTask.$script.settings;
			settings.logger = settings.logger || {};
			settings.logger.meta = angular.extend(settings.logger.meta || {}, data);
		}

		if (currentTask.type == 'message' && currentTask.piTemplate){
			context = {
				content: currentTask.$template,
				global: global,
				current: global.current,
				task: currentTask
			};

			if (currentTask.piTemplate == 'debrief'){
				_.extend(context,{
					showFeedback: _.bind(showFeedback,null,global),
					showPanel: showPanel
				});

				currentTask.$template = _.template(messageTemplateDebrief)(context); // insert into meta template
				currentTask.$template = _.template(currentTask.$template)(context); // render secondary template with extended context
			} else {
				currentTask.$template = _.template(messageTemplate)(context); // insert into meta template
			}
		}

		// set last task flag
		if (currentTask.last){
			data.sessionStatus = "C";
		}

		return isDev ? true : $http.post('/implicit/PiManager', data);
	}

	function showPanel(content, header, footer){
		return _.template(messageTemplatePanel, {
			content: content,
			header: header,
			footer: footer
		});
	}

	function showFeedback(global, options){
		_.isPlainObject(options) || (options = {});

		_.defaults(options,{
			pre: '<p>',
			post: '</p>',
			wrap: true,
			header: '',
			noFeedback: '<p>No feedback was found</p>',
			property: 'feedback',
			exclude: []
		});

		var feedback = _(global)
			.filter(function(task,taskName){
				if (!_.isArray(options.exclude)) { throw Error('Exclude must be an array'); }
				// make sure task is an object
				// make sure feedback is defined
				// make sure this task is not excluded
				return _.isPlainObject(task) && !_.isUndefined(task[options.property]) && (_.indexOf(options.exclude,taskName) === -1);
			})
			.mapValues(function(task){
				return options.pre + task[options.property] + options.post;
			})
			.reduce(function(result, feedback){
				return result + feedback;
			},'') || options.noFeedback;

		return options.wrap ? showPanel(feedback, options.header) : feedback;
	}
});

