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

class Router {
	constructor() {
		this.patterns = [];
	}

	match(value) {
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

	when(pattern, handler) {
		this.push(new Pattern(pattern), handler);
		return this;
	}

	push(pattern, handler) {
		this.patterns.push({
			pattern: pattern,
			handler: handler
		});
	}
}

/**
 * @class Pattern
 * @example
 * 		var pattern = new Pattern('foobar');
 * 		pattern.match('foobar') // => true
 * 		pattern.match('bar') // => false
 */
class Pattern {
	constructor(pattern) {
		this.create(pattern);
	}

	match(value) {
		return this.matcher.test(value);
	}

	create(pattern) {
		var matcher;

		if (typeof pattern === 'string') {
			matcher = {};
			matcher.value = pattern;
			matcher.test = function (value) {
				return value === this.value;
			};
		}

		else if (pattern instanceof RegExp) {
			matcher = pattern;
		}

		else if (typeof pattern === 'function') {
			matcher = {};
			matcher.test = pattern;
		}

		else {
			throw new Error('Invalid pattern: ' + pattern);
		}

		this.matcher = matcher;
	}
}

Router.Pattern = Pattern;

export { Router };