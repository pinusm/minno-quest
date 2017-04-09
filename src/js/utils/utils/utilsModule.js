define(function(require){
	var angular = require('angular');
	var _ = require('underscore');
	var module = angular.module('pi.utils',[]);

	// module.service('piPreloader', require('./preloaderService'));
	// module.config(['$provide', function($provide){
		// $provide.decorator('piPreloader', require('./preloaderDecorator'));
	// }]);

    module.value('piPreloadImages', require('./preloadImages'));

	/**
	 * Wrapper for angular invoke.
	 * Injects global and current automatically.
	 *
	 * @param {Function} fn The function to invoke
	 * @param {Object} locals Locals to add to angualr invoke
	 */
	module.service('piInvoke', ['$injector',function($injector){
		var $rootScope = $injector.get('$rootScope');

		function piInvoke(fn, locals){
			var global = $rootScope.global || {};

			// if fn is undefined don't get all mushy about it
			if (!fn){
				return;
			}

			$injector.invoke(fn, null, _.extend(locals, {
				global: global,
				current: global.current
			}));
		}

		return piInvoke;
	}]);

	return module;

    /**
     * preloadFn :: (data, cb) => SideEffect
     * images :: [url]
     **/
    function preload(preloadFn, images){
        var current = 0;
        // start four load recursions so that we have max 4 preloaded in parralel
        next();
        next();
        next();
        next();

        function next(){
            if (current < images.length) preloadFn(images[current++], next);
        }
    }

    function preloadImg(url, cb){
        var img = new Image();	// create img object
        img.onload = cb;
        img.onerror = cb;
        img.src = url;
    }

});
