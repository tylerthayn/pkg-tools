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

### AST
<ul>
<li>&#8716; <b>Load</b>(file)	=>	{Promise.&lt;AST&gt;}</li>


<li><b>Data</b>  {object}</li>


<li><b>Filter</b>(filters)	=>	{AST}</li>


<li><b>Outline</b>()	=>	{object}</li>

</ul>


### bin/cli
<ul>
<li><b>commands</b>  {object}</li>

</ul>

### tasks/bump
<ul>
</ul>

### tasks/readme
<ul>
<li><b>Options</b></li>

<ul>
<li><b>ast</b> <i>{boolean|string}</i> AST output file or false to skip</li>
<li><b>output</b> <i>{null|string}</i> Output folder or null (stdout)</li>
<li><b>template</b> <i>{string}</i> Template path</li>
</ul>
</ul>

### Handlebars
<ul>
<li>&#8716; <b>Get</b>(key, value)	=>	{*}</li>


<li>&#8716; <b>Render</b>(name, context, options)	=>	{string}</li>


<li>&#8716; <b>Set</b>(key, value)	=>	{object}</li>


<li>&#8716; <b>registerTemplate</b>(name, template, options)	=>	{object}</li>


<li>&#8716; <b>unregisterTemplate</b>(name)	=>	{Handlebars}</li>

</ul>

### Docs
<ul>
<li><b>Options</b></li>

<ul>
<li><b>ast</b> <i>{boolean|string}</i> AST output file or false to skip</li>
<li><b>output</b> <i>{null|string}</i> Output folder or null (stdout)</li>
<li><b>template</b> <i>{string}</i> Template path</li>
</ul>
</ul>



## License
Licensed under the MIT License (see [MIT](LICENSE)).
