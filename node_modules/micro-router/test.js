import { Router } from './lib/Router';

let router = new Router();

router.when('patt3rn', patternHandler);
router.when(/^foo|bar$/, foobarHandler);
router.when(matcherFn, otherHandler);

router.match('foo');		//	=> foobarHandler('foo')
router.match('bar');		//	=> foobarHandler('bar')
router.match('patt3rn');	//	=> patternHandler('patt3rn')
router.match('whatever');	//	=> matcherFn('whatever') ? otherHandler('whatever')

function patternHandler (value) {
	console.log('patternHandler', value);
}

function foobarHandler (value) {
	console.log('foobar', value);
}

function matcherFn (value) {
	return value === 'whatever';
}

function otherHandler (value) {
	console.log('other', value);
}