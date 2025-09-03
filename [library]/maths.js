//
// Maths
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