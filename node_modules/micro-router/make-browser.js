var fs = require('fs');
var start = '(function () {var global = this, exports = {};';
var end = 'global.Router = exports.Router})()';

var parts = [
	start,
	fs.readFileSync('dist/Router.js', 'utf8'),
	end
];

fs.writeFile('index.js', parts.join('\n'));