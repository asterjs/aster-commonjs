/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	commonjs = require('..'),
	parse = require('esprima').parse,
	generate = require('escodegen').generate;

it('test', function (done) {
	var files = [
		{
			type: 'File',
			program: parse('module.exports = require("./b") + 2;'),
			loc: {
				source: 'src/a.js'
			}
		},
		{
			type: 'File',
			program: parse('module.exports = 40;'),
			loc: {
				source: 'src/b.js'
			}
		}
	];

	// simulating file sequence and applying transformation
	commonjs('src/a.js')(Rx.Observable.fromArray(files))
	.do(function (file) {
		assert.equal(file.loc.source, 'src/a.js');
		var result = new Function('return ' + generate(file.program))();
		assert.equal(result, 42);
	})
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

