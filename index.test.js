const { mapObject, reduceObject, filterObject } = require('./index.js');

const testingObject = {
	red: 'ff0000',
	green: '00ff00',
	blue: '0000ff',
};

describe('map', () => {
	test('inverts keys & values', () => {
		expect(mapObject(testingObject, ([k, v]) => ({ [v]: k }))).toEqual({
			'0000ff': 'blue',
			'00ff00': 'green',
			ff0000: 'red',
		});
	});

	test('gets the indexes', () => {
		expect(
			mapObject(testingObject, ([k, value], index) => ({
				[k]: { value, index },
			}))
		).toEqual({
			blue: { index: 2, value: '0000ff' },
			green: { index: 1, value: '00ff00' },
			red: { index: 0, value: 'ff0000' },
		});
	});

	test('gets the original', () => {
		expect(
			mapObject(testingObject, ([k], _, original) => ({
				[k]: original,
			}))
		).toEqual({
			blue: { blue: '0000ff', green: '00ff00', red: 'ff0000' },
			green: { blue: '0000ff', green: '00ff00', red: 'ff0000' },
			red: { blue: '0000ff', green: '00ff00', red: 'ff0000' },
		});
	});
});

describe('filter', () => {
	test('removes blue', () => {
		expect(filterObject(testingObject, ([k]) => k !== 'blue')).toEqual({
			green: '00ff00',
			red: 'ff0000',
		});
	});

	test('removes index #1', () => {
		expect(filterObject(testingObject, (_, index) => index !== 1)).toEqual({
			blue: '0000ff',
			red: 'ff0000',
		});
	});

	test('gets the original', () => {
		expect(
			filterObject(
				testingObject,
				(_, __, original) => original.blue !== '0000ff'
			)
		).toEqual({});
	});
});

describe('reduce', () => {
	test('makes an array of values', () => {
		expect(
			reduceObject(testingObject, (acc, [k, v]) => [...acc, v], [])
		).toEqual(['ff0000', '00ff00', '0000ff']);
	});
	test('makes an array of indices', () => {
		expect(
			reduceObject(testingObject, (acc, _, index) => [...acc, index], [])
		).toEqual([0, 1, 2]);
	});
	test('makes an array of blues', () => {
		expect(
			reduceObject(
				testingObject,
				(acc, _, __, original) => [...acc, original.blue],
				[]
			)
		).toEqual(['0000ff', '0000ff', '0000ff']);
	});
});
