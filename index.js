const rge = (...args) => {
	console.log(args)	
}

const generator = rge({
	foo: ({ foo }) => [ rge`${foo}, ${foo}`, rge`${foo}, aka ${foo}`, rge`${foo}, also known as ${foo}` ]
})

console.log(generator())
