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

const generator = rge({
	root: ({ root, bigSean, prefixHonorific, suffixHonorifix, role }) => [
		rge`${prefixHonorific} ${bigSean}`,
		rge`${bigSean}`,
		rge`${bigSean}-${suffixHonorifix}`,
		rge`The ${role}`,
		rge`${role}`,
	],
	prefixHonorific: () => ["Mr.", "Mrs.", "Miss", "Ms.", "Mx.", "Sir.", "Dr.", "Lady", "Lord"],
	suffixHonorifix: () => ["samma", "senpai", "dono", "chan", "tan", "heichou"],

	bigSean: ({ simpleAdjective, identity, position }) => [
		rge`${simpleAdjective} ${identity}`,
		rge`${simpleAdjective} ${position}`,
	],

	simpleAdjective: ({ size, simpleValueJudgement, age }) => [size, simpleValueJudgement, age],
	simpleValueJudgement: () => ["Bad", "Nasty", "Stinky", "Smooth", "Wild", "Incomprehensible", "Fruity", "Hot"],
	size: () => ["Lil'", "Big", "Short", "Fat", "Phat", "Large", "Wide"],
	age: () => ["Young", "Old", "Middle Aged"],

	identity: () => [
		"Stinker",
		"Nasty",
		"Paul",
		"Ibuprophen",
		"Paracetamol",
		"Lemsip",
		"Ferari",
		"Stinker",
		"Boi",
		"Boy",
		"Shorty",
		"Fatty",
		"Man",
		"Woman",
		"Beans",
		"Money",
		"Pappa",
		"Mamma",
	],

	role: ({ subject, position }) => [rge`${position} of ${subject}`, rge`${subject} ${position}`],

	subject: () => [
		"Piss",
		"Money",
		"$$$",
		"Dollas",
		"Gold Bars",
		"Rhyming Couplets",
		"Shit Talking",
		"Fire Beats",
		"Doing Big Shits",
		"Being Good At Rapping",
	],
	position: ({ simpleAdjective, position }) => [
		...new Array(3).fill(rge`${simpleAdjective} ${position}`),
		"Ninja",
		"Doctor",
		"MC",
		"Duke",
		"Master",
		"Lord",
		"Don",
		"Ring Master",
		"Madame",
		"Grand Vizier",
		"ArchDeacon",
		"Jesus",
	],
});

for (const x in Array.from({ length: 20 })) {
	console.log(generator.root());
}
