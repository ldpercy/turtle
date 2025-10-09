//
// Maths
//
class Maths{


	static TAU = 2 * Math.PI;

	/* significantFigures
	Returns a function that will call toPrecision with the supplied number of significant figures
	*/
	static significantFigures(integer) {
		return (number) => { return number.toPrecision(integer) }
	}


	/* equalToPrecision
	This won't always do what you want, for example comparing a nearby float to an int `toPrecision` will rarely yield equal.
	Need better ways of comparing numbers in those circumstances.
	*/
	static equalToPrecision = function(precision, n1, n2) {
		return (n1.toPrecision(precision) === n2.toPrecision(precision))
	}

	static equalToFixed(digits, n1, n2) {
		//console.log('equalToFixed:',arguments, n1.toFixed(digits), n2.toFixed(digits));
		return (n1.toFixed(digits) === n2.toFixed(digits));
	}



	//
	// geometry
	//


	static radiansToDegrees(radians) {
		return (radians/Math.PI) * 180;
	}

	static degreesToRadians(degrees) {
		return (degrees/180) * Math.PI;
	}

	static degreesToRadiansPi(degrees) {
		return (degrees/180);
	}

	static degreesToRadiansTau(degrees) {
		return (degrees/360);
	}


}/* Maths */
