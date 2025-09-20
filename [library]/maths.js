//
// Maths
//


/* significantFigures
Returns a function that will call toPrecision with the supplied number of significant figures
*/
function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


/* equalToPrecision
This won't always do what you want, for example comparing a nearby float to an int `toPrecision` will rarely yield equal.
Need better ways of comparing numbers in those circumstances.
*/
function equalToPrecision(precision, n1, n2) {
	return (n1.toPrecision(precision) === n2.toPrecision(precision))
}

function equalToFixed(digits, n1, n2) {
	//console.log('equalToFixed:',arguments, n1.toFixed(digits), n2.toFixed(digits));
	return (n1.toFixed(digits) === n2.toFixed(digits));
}

//
// number bases
//


function baseSize(base, number) {
	power = 0;
	while (base**power <= number) { power++; }
	return power;
}


function numberToBase(number, base) {
	let result = {};
	let remainder = number;
	let power = 0;
	let placeKey = 0;
	let placeVal = 0;
	while (remainder > 0) {
		placeKey = base**power;
		placeVal = remainder % base;
		result[placeKey] = placeVal;
		remainder = (remainder - placeVal)/ base;
		power++;
	}
	return result;
}


/* Similar to above but doesn't use zero
*/
function numberToBaseN(number, base) {
	let result = {};
	let remainder = number;
	let power = 0;
	let placeKey = 0;
	let placeVal = 0;
	while (remainder > 0) {
		placeKey = base**power;
		placeVal = ((remainder % base) === 0) ? base : remainder % base;

		result[placeKey] = placeVal;
		remainder = (remainder - placeVal)/ base;
		power++;
	}
	return result;
}

