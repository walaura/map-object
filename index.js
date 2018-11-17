const mapObject = (obj, fn) =>
	Object.entries(obj).reduce(
		(acc, entry, index) => ({
			...acc,
			...fn(entry, index, obj),
		}),
		{}
	);

const reduceObject = (obj, fn, initial = {}) =>
	Object.entries(obj).reduce(
		(acc, cur, idx) => fn(acc, cur, idx, obj),
		initial
	);

const filterObject = (obj, fn) =>
	Object.entries(obj).reduce(
		(acc, entry, index) =>
			fn(entry, index, obj)
				? {
						...acc,
						[entry[0]]: entry[1],
				  }
				: acc,
		{}
	);

module.exports = { mapObject, reduceObject, filterObject };
