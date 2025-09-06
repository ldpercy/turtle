//
// Maths
//

/* significantFigures
Returns a function that will call toPrecision with the supplied number of significant figures
*/
function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


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


function equalAtPrecision(precision, n1, n2) {
	return (n1.toPrecision(precision) === n2.toPrecision(precision))
}



class Point {
	constructor(x=0, y=0, precision=12) {
		this.x = x;
		this.y = y;
		this.precision = precision;
	}

	plus = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	toPolarPoint = function(polarPoint = new PolarPoint()) {
		const distance = this.distanceFrom();
		//console.log(distance);
		const radian  = (equalAtPrecision(this.precision, distance, 0)) ? polarPoint.radian : this.radiansFrom();
		//console.log(radian);
		// for points on the origin return the default PolarPoint radian
		// should probably actually add these akin to a base vector
		return new PolarPoint(
			radian,
			distance
		);
	}

	distanceFrom = function(point = new Point()) {
		const result = Math.hypot((this.x - point.x), (this.y - point.y));
		return result;
	}

	// Clockwise from y axis
	radiansFrom = function(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}

}/* Point */