

/* Turtle
*/
class Turtle {
	constructor(x=0, y=0, heading=0, precision=12) {
		this.x = x;
		this.y = y;
		this.heading = heading;
		this.precision = precision;
	}

	/*
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
	*/

}/* Turtle */