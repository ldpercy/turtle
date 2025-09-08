//
// geometry
//

Math.TAU = 2 * Math.PI;

function radians(degrees) {
	return (degrees/360) * Math.TAU;
}

function degrees(radians) {
	return (radians/Math.TAU) * 360;
}

/* Point
*/
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
		const distanceFromOrigin = this.distanceFromOrigin;
		//console.log(distance);
		const radian  = (equalAtPrecision(this.precision, distanceFromOrigin, 0)) ? polarPoint.radian : this.radiansFrom();
		//console.log(radian);
		// for points on the origin return the default PolarPoint radian
		// should probably actually add these akin to a base vector
		return new PolarPoint(
			radian,
			distanceFromOrigin
		);
	}



	get radian() {
		return Math.atan2(this.y, this.x) + Math.PI/2;
	}

	// Clockwise from y axis
	radiansFrom = function(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}


	get distanceFromOrigin() {
		return Math.hypot(this.x, this.y);
	}

	getDistanceFrom = function(point = new Point()) {
		return Math.hypot((this.x - point.x), (this.y - point.y));
	}

	// absolute
	set radian(radian) {
		const newPoint = new PolarPoint(radian, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this
	}

	// relative
	rotate = function(radian) {
		const newPoint = new PolarPoint(this.radian + radian, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this;
	}

}/* Point */


/* PolarPoint
*/
class PolarPoint {
	constructor(radian=0, radius=0, precision=12)
	{
		this.radian = radian;
		this.radius = radius;
		this.precision = precision;
	}

	toPoint = function() {
		return new Point(
			this.radius * Math.sin(this.radian),
			this.radius * -Math.cos(this.radian)
		)
	}

	plus = function(polarPoint) {
		return this.toPoint().plus(polarPoint.toPoint()).toPolarPoint();
		// this way is pretty dumb, figure out a better way
		// the lengths should add arithmetically

		// this one is absolute
	}

	/*
	Need to figure out whether the angles are absolute or relative
	Either interpretation could make sense - need

	*/

	/*
	// this is really wrong I think
	toPointPolarOffset(polarPoint) {  // another polar point represents the deltas
		return new Point(
			(this.radius + polarPoint.radius) * Math.sin(this.radian + polarPoint.radian),
			(this.radius + polarPoint.radius) * -Math.cos(this.radian + polarPoint.radian)
		)
	}
	*/


	/* move
	A single-step turtle graphics kind of move relative to the current point
	Takes the current radian coordinate as the base heading and the new heading is relative to it.
	Ie a 0 heading will continue in the same direction
	*/
	move = function(distance, heading) {
		const delta = new PolarPoint(this.radian+heading, distance);
		//console.log(delta);
		return this.plus(delta);
	}


	/* newPointOffsetXY
	The offsets are applied to the radial point's 'local' cartesian plane.
	(The absolute versions of this would have been trivial)
	*/
	newPointOffsetXY(dx, dy) {
		let result = new Point(dx, -this.radius + dy);
		result.rotate(this.radian);
		return result;
	}/* newPointOffsetXY */


}/* PolarPoint */



/*
I need a standard syntax for builders/constructors vs mutators - in classes and in general.
Also need to do some experiments with JS accessors and class methods to see how they'll help here.

A first approach would be to prefix builders with 'new' to make it obvious we're returning a new object base upon the instance and parameters.

*/


function rotatePoint(point, radian, center = new Point()) {
	const length = lineLength(center, point);
	const pointRadian = lineRadian(center, point);
	//console.log(length, pointRadian);
	const result = new PolarPoint(pointRadian+radian, length).toPoint().plus(center);
	return result;
}

function lineLength(point1, point2) {
	//const result = Math.sqrt(((point2.x - point1.x)**2) + ((point2.y - point1.y)**2));
	const result = Math.hypot((point2.x - point1.x), (point2.y - point1.y));
	return result;
}

/* Uses the the y axis for 0 radians
*/
function lineRadian(center, point) {
	const result = Math.PI/2 + Math.atan2(point.y-center.y, point.x-center.x)  ;
	return result;
}
