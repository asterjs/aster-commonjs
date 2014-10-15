# aster-commonjs
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Bundle CommonJS with aster.

## Usage

First, install `aster-commonjs` as a development dependency:

```shell
npm install --save-dev aster-commonjs
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var commonjs = require('aster-commonjs');

aster.src('src/**/*.js')
.map(commonjs({
  input: 'src/index.js',
  output: 'dist/bundle.js'
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### commonjs(options)

* `input`: `String` | `Function()`. <br />
  Input file.<br />
  Example: `'superLib/topModule.js'`

* `output`: `String` | `Function(input)`<br />
  Output file.<br />
  Default: `input => input.replace(/(\.js)?$/, '.out.js')`

* `external`: `{ cjsName: (true | { amd?: String, global?: String }) }`<br />
  External dependencies (to be excluded from bundling). Example:
  ```javascript
  {
    jquery: true,
    lodash: {amd: '../vendor/lodash.js', global: '_'}
  }
  ```

* `exports`: `String` | `Function(input, output)`<br />
  Export top module with [UMD](https://github.com/umdjs/umd) with given global object name.<br />
  Default: no exports.

* `defaultExt`: `String`<br />
  Default extension for require calls (`"js"`).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-commonjs
[npm-image]: https://badge.fury.io/js/aster-commonjs.png

[travis-url]: http://travis-ci.org/asterjs/aster-commonjs
[travis-image]: https://secure.travis-ci.org/asterjs/aster-commonjs.png?branch=master
