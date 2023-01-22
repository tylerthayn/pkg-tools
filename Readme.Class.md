# @tyler.thayn/pkg-tools
[![Build Status](https://github.com/tylerthayn/pkg-tools/workflows/build/badge.svg)](https://github.com/tj/commander.js/actions?query=workflow%3A%22build%22)
[![NPM Version](http://img.shields.io/npm/v/@tyler.thayn/pkg-tools.svg?style=flat)](https://www.npmjs.org/package/@tyler.thayn/pkg-tools)
[![NPM Downloads](https://img.shields.io/npm/dm/@tyler.thayn/pkg-tools.svg?style=flat)](https://npmcharts.com/compare/@tyler.thayn/pkg-tools?minimal=true)
[![license](https://img.shields.io/npm/l/@tyler.thayn/pkg-tools.svg)](LICENSE)
Various development and management tools for design packages/repos.

## Installation
	npm install @tyler.thayn/pkg-tools --save-dev

## Usage
1. Run pkg init tools
```dos
pkg-tools pkg merge
pkg-tools pkg install
pkg-tools copy
```
2. Grunt
* Modify Gruntfile.js so that correct file paths are used
```dos
grunt || grunt docs
```
3. CLI
```dos
pkg-tools --help
```

4.  README.md customization
	* [build/templates/README.MD](./build/templates/README.md)

## Code/Api

### Class
<ul>
<li>&#8716; <b>addInitHook</b>()</li>


<li>&#8716; <b>extend</b>(properties, name)	=>	{function}</li>


<li>&#8716; <b>include</b>()</li>


<li>&#8716; <b>mergeOptions</b>()</li>


<li><b>Options</b>  {object}</li>


<li><b>GetOption</b>(name, value)	=>	{*}</li>


<li><b>SetOption</b>(name, value)	=>	{object}</li>

</ul>




## License
Licensed under the MIT License (see [MIT](LICENSE)).
