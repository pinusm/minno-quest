define(function(require){
	var _ = require('underscore');

	if (typeof Object.create != 'function') {
		(function () {
			var F = function () {};
			Object.create = function (o) {
				if (arguments.length > 1) {
					throw new Error('Second argument not supported');
				}
				if (o === null) {
					throw new Error('Cannot set a null [[Prototype]]');
				}
				if (typeof o != 'object') {
					throw new TypeError('Argument must be an object');
				}
				F.prototype = o;
				return new F();
			};
		})();
	}

	SequenceProvider.$inject = ['Collection', 'mixerSequential','mixerRecursive', 'templateObj'];
	function SequenceProvider(Collection, mixerSequential, mixerRecursive, templateObj){
		// classical inheritance from Collection
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Classical_inheritance_with_Object.create
		function Sequence(coll, db){
			Collection.call(this, coll);

			if (!db){
				throw new Error('Sequences need to take a db as the second argument');
			}
			this.db = db;
		}

		Sequence.prototype = Object.create(Collection.prototype);
		Sequence.prototype.constructor = Sequence;

		_.extend(Sequence.prototype, {
			// maybe add a context argument here?
			buildPage: function(pageObj){
				if (_.isUndefined(pageObj)){
					return undefined;
				}


				var page = this.db.inflate('pages', pageObj);
				var pageMeta = {
					number : this.pointer + 1,
					outOf : this.length
				};

				templateObj(page, {pageData: page.data || {}, pageMeta: pageMeta});

				page.questions = mixerRecursive(page.questions || []);

				// we can afford to overwrite the original since inflate always creates new objects for us.
				page.questions = _.map(page.questions, function(question){
					question = this.db.inflate('questions', question);
					templateObj(question, {pageData: page.data || {}, pageMeta: pageMeta, questData: question.data || {}});
					return question;
				}, this);

				return page;
			},

			/**
			 * Parses the sequence to get the next page.
			 * next -> mix -> build (or escape) -> current
			 * @return {*} the next page to parse or undefined
			 */
			proceed: function(){
				// proceed
				this.next();
				this.mix();
				var page = this.buildPage(this.current());

				return page;
			},

			/**
			 * Mix the current object, until we have a non mixer
			 * @return {[type]} [description]
			 */
			mix: function(){
				var obj = this.current();

				// manage the end of the line
				if (_.isUndefined(obj)){
					return undefined;
				}

				var mixed = mixerSequential([obj]);
				var sequence = this.collection;

				// push the first arguments of splice into the mixer array...
				mixed.unshift(1); // how many objects to delete
				mixed.unshift(this.pointer); // where to start at
				sequence.splice.apply(sequence, mixed);

				// update sequence length
				this.length = sequence.length;

				// if mixed returned an empty array, remix with the next object
				// removing the current mixer effectively moves the pointer ahead (== next)
				if (mixed.length == 2){
					this.mix();
				}
			}
		});

		return Sequence;
	}

	return SequenceProvider;
});