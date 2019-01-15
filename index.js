const R = require("ramda");

const pickRandomFromList = xs => xs[Math.floor(Math.random() * xs.length)];

const rgeTemplate = (strings, ...functions) => {
	return () =>
		R.pipe(
			R.map(([str, fn]) => str + fn()),
			R.append(R.nth(-1, strings)),
			R.join(""),
		)(R.zip(strings, functions));
};

const rgeObj = obj => {
	let generators = {};

	generators = R.pipe(
		R.map(fn => () => {
			const nextGenerator = pickRandomFromList(fn(generators));

			if (typeof nextGenerator === "string") {
				return nextGenerator;
			} else {
				return nextGenerator();
			}
		}),
	)(obj);

	return generators;
};

const rge = (...args) => {
	if (args.length === 1) {
		return rgeObj(...args);
	} else {
		return rgeTemplate(...args);
	}
};

module.exports = rge
