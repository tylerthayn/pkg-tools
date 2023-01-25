# {{pkg.name}}
{{> Badges}}  

{{pkg.description}}

{{> Installation}}

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

{{#outline}}
## Code/Api
{{> Outline}}
{{/outline}}

{{> License}}
