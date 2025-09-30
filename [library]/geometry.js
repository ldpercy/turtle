//
// geometry
//



/* Point
*/
class Point {

	#x = 0;
	#y = 0;
	static origin = new Point(0,0)
	static zeroRadian = Math.PI/2;

	constructor(x=0, y=0, precision=12) {
		this.#x = x;
		this.#y = y;
		this.precision = precision;
	}

	//
	//	Accessors
	//

	get x() { return this.#x; }
	get y() { return this.#y; }
	set x(x) { this.#x = x; }
	set y(y) { this.#y = y; }

	// get this() { return this; }

	get distanceFromOrigin() {
		return Math.hypot(this.x, this.y);
	}

	get angleFromOrigin() {
		const result = new Angle();
		result.radians = Point.zeroRadian + Math.atan2(this.y, this.x);
		return result;
	}

	set angle(angle) {
		// absolute
		const newPoint = new PolarPoint(angle.radians, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this;
	}

	//
	// Queries
	//

	getAngleFrom = function(center = new Point()) {
		// Clockwise from y axis
		const result = Point.zeroRadian + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}

	getDistanceFrom = function(point = new Point()) {
		return Math.hypot((this.x - point.x), (this.y - point.y));
	}

	isEqualTo(point) {
		return ((this.x === point.x) && (this.y === point.y));
	}

	//
	// Convertors
	//

	plus = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	toPolarPoint = function(polarPoint = new PolarPoint()) {
		const distanceFromOrigin = this.distanceFromOrigin;
		//console.log(distance);
		const radian  = (Maths.equalToPrecision(this.precision, distanceFromOrigin, 0)) ? polarPoint.radian : this.radiansFrom();
		//console.log(radian);
		// for points on the origin return the default PolarPoint radian
		// should probably actually add these akin to a base vector
		return new PolarPoint(
			radian,
			distanceFromOrigin
		);
	}


	//
	// Mutators
	//

	rotate = function(radians) {
		// relative
		const newPoint = new PolarPoint(this.angleFromOrigin.radians + radians, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this;
	}



	toString() {
		return `Point - x:${this.x}; y:${this.y};`;
	}

}/* Point */



/* PolarPoint
*/
class PolarPoint {

	#angle;
	#radius;

	constructor(angle = new Angle(), radius=0, precision=12)
	{
		this.#angle = angle;
		this.#radius = radius;
		this.precision = precision;
	}

	//
	//	Accessors
	//

	get angle() { return this.#angle; }
	get radius() { return this.#radius; }


	toPoint = function() {
		const result = new Point(
			this.radius * Math.sin(this.angle.radians),
			this.radius * Math.cos(this.angle.radians)
		);
		return result;
	}

	toString() {
		return `angle:${this.#angle.degrees}; radius:${this.radius};`;
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

	move = function(distance, heading) {
		const delta = new PolarPoint(this.radian+heading, distance);
		//console.log(delta);
		return this.plus(delta);
	}
	*/

	/* newPointOffsetXY
	The offsets are applied to the radial point's 'local' cartesian plane.
	(The absolute versions of this would have been trivial)
	*/
	newPointOffsetXY(dx, dy) {
		let result = new Point(dx, -this.radius + dy);
		result.rotate(this.angle);
		return result;
	}/* newPointOffsetXY */


	rotate(angle) {
		this.angle.degrees += angle.degrees;
	}

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



class Angle {
	#degrees = 0;

	constructor(degrees=0) {
		this.#degrees = degrees;
	}

	get degrees()    { return this.#degrees; }
	get radians()    { return this.#degrees / 180 * Math.PI; }
	get radiansPi()  { return this.#degrees / 180; }
	get radiansTau() { return this.#degrees / 360; }

	set degrees(degrees)         { this.#degrees = degrees; return this; }
	set radians(radians)         { this.#degrees = radians * 180 / Math.PI; return this; }
	set radiansPi(radiansPi)     { this.#degrees = radiansPi * 180; return this; }
	set radiansTau(radiansTau)   { this.#degrees = radiansTau * 360; return this; }

}/* Angle */