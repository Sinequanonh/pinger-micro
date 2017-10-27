# uRouter

## A micro router written in ES6

See test.js to a runnable example

```js
import { Router } from 'urouter/Router';

let router = new Router();

router.when('patt3rn', patternHandler);
router.when(/^foo|bar$/, foobarHandler);
router.when(matcherFn, otherHandler);

router.match('foo');		//	=> foobarHandler('foo')
router.match('bar');		//	=> foobarHandler('bar')
router.match('patt3rn');	//	=> patternHandler('patt3rn')
router.match('whatever');	//	=> matcherFn('whatever') ? otherHandler('whatever')

```