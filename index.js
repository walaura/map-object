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
		(acc, [key, value], index) =>
			fn([key, value], index, obj)
				? {
						...acc,
						[key]: value,
				  }
				: acc,
		{}
	);

module.exports = { mapObject, reduceObject, filterObject };
