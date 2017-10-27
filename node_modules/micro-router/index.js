(function () {var global = this, exports = {};
/**
 * @class Router
 * @example
 * 		var router = new Router();
 * 		router.when('patt3rn', patternHandler);
 * 		router.when(/^foo|bar$/, foobarHandler);
 * 		router.when(matcherFn, otherHandler);
 *
 * 		router.match('foo');		//	=> foobarHandler('foo')
 * 		router.match('bar');		//	=> foobarHandler('bar')
 * 		router.match('patt3rn');	//	=> patternHandler('patt3rn')
 * 		router.match('whatever');	//	=> matcherFn('whatever') ? otherHandler('whatever')
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Router = (function () {
	function Router() {
		_classCallCheck(this, Router);

		this.patterns = [];
	}

	_createClass(Router, [{
		key: 'match',
		value: function match(value) {
			var matched = this.patterns.some(function (o) {
				if (o.pattern.match(value)) {
					o.handler(value);
					return true;
				}
			});

			if (!matched) {
				throw new Error('Not found: ' + value);
			}
		}
	}, {
		key: 'when',
		value: function when(pattern, handler) {
			this.push(new Pattern(pattern), handler);
			return this;
		}
	}, {
		key: 'push',
		value: function push(pattern, handler) {
			this.patterns.push({
				pattern: pattern,
				handler: handler
			});
		}
	}]);

	return Router;
})();

/**
 * @class Pattern
 * @example
 * 		var pattern = new Pattern('foobar');
 * 		pattern.match('foobar') // => true
 * 		pattern.match('bar') // => false
 */

var Pattern = (function () {
	function Pattern(pattern) {
		_classCallCheck(this, Pattern);

		this.create(pattern);
	}

	_createClass(Pattern, [{
		key: 'match',
		value: function match(value) {
			return this.matcher.test(value);
		}
	}, {
		key: 'create',
		value: function create(pattern) {
			var matcher;

			if (typeof pattern === 'string') {
				matcher = {};
				matcher.value = pattern;
				matcher.test = function (value) {
					return value === this.value;
				};
			} else if (pattern instanceof RegExp) {
				matcher = pattern;
			} else if (typeof pattern === 'function') {
				matcher = {};
				matcher.test = pattern;
			} else {
				throw new Error('Invalid pattern: ' + pattern);
			}

			this.matcher = matcher;
		}
	}]);

	return Pattern;
})();

Router.Pattern = Pattern;

exports.Router = Router;
global.Router = exports.Router})()