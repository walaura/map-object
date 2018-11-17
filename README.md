# object-cartographer

`map`, `reduce`, and `filter` for objects, wrapping `Object.ewntries().reduce()`

## Usage

```js
const {
	mapObject,
	filterObject,
	reduceObject,
} = require('object-cartographer');

const colors = {
	red: 'ff0000',
	green: '00ff00',
	blue: '0000ff',
};

mapObject(colors, ([key, value]) => ({ [value]: key })) ===
	{
		'0000ff': 'blue',
		'00ff00': 'green',
		ff0000: 'red',
	};

filterObject(colors, ([key, value]) => key !== 'red') ===
	{
		green: '00ff00',
		blue: '0000ff',
	};

reduceObject(colors, (acc, [key, value]) => [...acc, key], []) ===
	['red', 'green', 'blue'];
```

For more use cases check `index.test.js`

## Advanced usage

Just like with normal `map`, `reduce`, and `filter`, you can retrieve both the index and the original object as extra parameters in the callback. Be warned! Objects in Javascript don't have a guaranteed order so it's very unlikely you want to use the index
