## Classes
### Array
	(s) Flatten(depth {number})	=>	{array}
	(s) From(value {*})	=>	{array}
	(s) IsArray(object {object})	=>	{boolean}
	(i) first{*}
	(i) head{array}
	(i) last{*}
	(i) tail{array}
	(i) Delete(elements {*}, array {array})
	(i) DeleteAt(indexes {number}, array {array})
	(i) Difference(lists {*})	=>	{array}
	(i) Intersection(lists {*})	=>	{array}
	(i) Omit(elements {*})	=>	{array}
	(i) OmitAt(indexes {*})	=>	{array}
	(i) Pick(elements {*})	=>	{array}
	(i) Shuffle()
	(i) Union(lists {*})	=>	{array}
	(i) Unique(lists {*})	=>	{array}
	(i) Xor(lists {array}, array {array})
### Function
	(s) Debug(name {string}, logFn {function}, (callback} )
	(s) Delay(time {number}, cb {callback}, args {*})
	(s) Noop()
### Object
	(s) Extensions
	(i) Clone()	=>	{object}
	(i) Define(name {string}, value {*}, enumerable {boolean})	=>	{object}
	(i) Each(fn {function}, this {object})
	(i) Extend(source {object|array})	=>	{object}
	(i) Get(path {string}, default {*})	=>	{*}
	(i) Has(paths {Array.<string>})	=>	{boolean}
	(i) Includes(paths {Array.<string>})	=>	{boolean}
	(i) IsEqual(objects {Array.<object>})	=>	{boolean}
	(i) Keys()	=>	{array}
	(i) Merge(sources {object|array})	=>	{object}
	(i) Paths(depth {number}, paths {array})
	(i) Pick(paths {string|Array.<string>})	=>	{object}
	(i) Set(path {string}, value {*})	=>	{object}
	(i) Trim()	=>	{object}
	(i) Type(compare {string|object})	=>	{string|boolean}
### String
	(i) AsAscii()	=>	{string}
	(i) AsBase64()	=>	{string}
	(i) AsUrlMatch()	=>	{string}
	(i) CamelCase(UpperCamel {boolean})	=>	{string}
	(i) Capitalize(AllWords {boolean})	=>	{string}
	(i) Hash(type {string})	=>	{string}
	(i) IsBase64()	=>	{boolean}
	(i) IsEmpty()	=>	{boolean}
	(i) IsJson()	=>	{boolean}
	(i) Pad(length {number}, char {string}, rightPad {boolean})	=>	{string}
	(i) Repeat(n {number})	=>	{string}
## Modules
### pkg-tools/tasks/bump

### core

## Namespaces
### tyler

## Global
	(g) global{object}
	(g) Clone(parent {object})	=>	{object}
	(g) Define(obj {object}, name {string}, value {*}, enumerable {boolean})	=>	{object}
	(g) Extend(target {object|array}, sources {object|array})	=>	{object}
	(g) IsEqual(objects {Array.<object>})	=>	{boolean}
	(g) Merge(target {object|array}, sources {object|array})	=>	{object|array}
	(g) Type(item {*}, compare {string|object})	=>	{string|boolean}
	(g) Uuid()	=>	{string}
	(g) log(msg {string})
	(g) logj(object {*})