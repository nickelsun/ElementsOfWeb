class NotAFuncError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NotAFuncError';
	}
 }

function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
	try {
		return funcs.reduce((result, func, index) => {

			if(!isFunction(func)) {
				throw new NotAFuncError(`Provided argument at position ${index} is not a function!`);
			}
			
			return func(result);
		
		}, value);

	} catch(e) {
		if(e instanceof NotAFuncError) {
			return e.message;
		}
	}

};

// const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
// const capitalize = (value) =>
// 	value
// 		.split(' ')
// 		.map((val) => val.charAt(0).toUpperCase() + val.slice(1))
// 		.join(' ');
// const appendGreeting = (value) => `Hello, ${value}!`;

// const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

// alert(error); // Provided argument at position 2 is not a function!

// const result = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, appendGreeting);

// alert(result); // Hello, John Doe!
