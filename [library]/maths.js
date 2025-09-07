//
// Maths
//


/* significantFigures
Returns a function that will call toPrecision with the supplied number of significant figures
*/
function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


function equalAtPrecision(precision, n1, n2) {
	return (n1.toPrecision(precision) === n2.toPrecision(precision))
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

