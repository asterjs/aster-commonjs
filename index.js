'use strict';

var cjs = require('pure-cjs');
var relative = require('path').relative;
var Promise = require('davy');
var whenReadFile = Promise.wrap(require('fs').readFile);
var src = require('aster-src');

module.exports = function (options) {
	if (typeof options === 'string') {
		options = {input: options};
	}

	if (!options.input) {
		throw new Error('Please specify main file with `input` option');
	}

	return function (files) {
		return files.toArray().flatMap(function (filesArray) {
			var filesMap = filesArray.reduce(function (obj, file) {
				obj[relative('.', file.loc.source)] = file.program;
				return obj;
			}, {});

			options.getFileAST = function (options) {
				var path = relative('.', options.source);
				if (filesMap[path]) {
					return Promise.resolve(filesMap[path]);
				} else {
					return new Promise(function (resolve, reject) {
						src(path)
						.concatAll()
						.pluck('program')
						.subscribe(resolve, reject);
					});
				}
			};

			return cjs.transformAST(options).then(function (result) {
				return {
					type: 'File',
					program: result.ast,
					loc: {
						source: result.options.output
					}
				};
			});
		});
	}
};
