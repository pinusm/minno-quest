/*
 * inflates an object
 * this function is responsible for inheritance
 *
 * function inflate(source,coll, randomizer, recursive, counter)
 * @param source: the object to inflate
 * @param coll: a collection to inherit from
 * @param randomizer: a randomizer object for the query
 * @param recursive: private use only, is this inside the recursion (true) or top level (false)
 * @param depth: private use only, a counter for the depth of the recursion
 */
define(function(require){
	var angular = require('angular');
	var _ = require('underscore');

	inflateProvider.$inject = ['databaseQuery'];
	function inflateProvider(query){

		function customize(source){
			// check for a custom function and run it if it exists
			if (_.isFunction(source.customize)){
				source.customize.apply(source, [source]);
			}
			return source;
		}

		// @param source - object to inflate
		// @param type - trial stimulus or media
		// @param recursive - whether this is a recursive call or not
		var inflate = function(source, coll, randomizer, recursive, depth){

			// protection against infinte loops
			// ***********************************
			depth = recursive ? --depth : 10;

			if (!depth) {
				throw new Error('Inheritance loop too deep, you can only inherit up to 10 levels down');
			}

			var parent
				// create child
				, child = angular.copy(source);


			// no inheritance
			// ***********************************

			// if we do not need to inherit anything, simply return source
			if (!child.inherit) {
				// customize only on the last call (non recursive)
				!recursive && customize(child);
				return child;
			}

			// get parent
			// ***********************************
			parent = query(source.inherit, coll, randomizer);

			// if inherit target was not found
			if (!parent){
				throw new Error('Query failed, object (' + JSON.stringify(source.inherit) +	') not found.');
			}

			// inflate parent (recursively)
			parent = inflate(
				parent,
				coll,
				randomizer,
				true,
				depth
			);

			// extending the child
			// ***********************************

			// start inflating child (we have to extend selectively...)
			_.each(parent, function(value, key){
				// if this key is not set yet, copy it out of the parent
				if (!child[key]){
					child[key] = angular.copy(value);
				}
			});

			// we want to extend the childs data even if it already exists
			// its ok to shallow extend here (because by definition parent was created for this inflation)
			if (parent.data){
				child.data = angular.extend(parent.data, child.data || {});
			}

			// Personal customization functions - only if this is the last iteration of inflate
			// This way the customize function gets called only once.
			!recursive && customize(child);

			// return inflated trial
			return child;
		};

		return inflate;
	}

	return inflateProvider;
});