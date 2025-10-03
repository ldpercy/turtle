//
//	PlanarSpace
//


class PlanarSpace {

	name = 'Initial PlanarSpace name';

	static origin;
	static zeroRadian = Math.PI/2;		// This should be made a parameter to the space; Clockwise from y-axis is what I use, but it should be configurable


	constructor(name, size) {
		this.name = name;
		this.size = size;
		origin = new PlanarSpace.Point(0,0);
	}


	//
	//	Static methods
	//

	static distanceFromOrigin(point) {
		return Math.hypot(point.x, point.y);
	}

	static setAngle(point, angle) {
		// Set the angle absolutely
		const newPoint = new PlanarSpace.PolarPoint(angle.radians, point.distanceFromOrigin).toPoint();
		point.x = newPoint.x;
		point.y = newPoint.y;
	}

	static angleFromOrigin(point) {
		return PlanarSpace.getAngleFrom(point, PlanarSpace.origin);
	}

	static getAngleFrom(point, center = PlanarSpace.origin) {
		const result = new Angle();
		result.radians = PlanarSpace.zeroRadian + Math.atan2(point.y-center.y, point.x-center.x);
		return result;
	}

	static getDistanceBetween(point1, point2) {
		return Math.hypot((point2.x - point1.x), (point2.y - point1.y));
	}

	static areEqual(point1, point2) {
		return ((point1.x === point2.x) && (point1.y === point2.y));
	}


}/* PlanarSpace */



//
//	Classes
//


/* PlanarSpace.Point
*/
PlanarSpace.Point = class {
	#x = 0;
	#y = 0;

	constructor(x=0, y=0) {
		this.#x = x;
		this.#y = y;
	}

	//
	//	Accessors
	//

	get x() { return this.#x; }
	get y() { return this.#y; }
	set x(x) { this.#x = x; }
	set y(y) { this.#y = y; }

	get distanceFromOrigin() {
		return PlanarSpace.distanceFromOrigin(this);
	}

	get angleFromOrigin() {
		return PlanarSpace.angleFromOrigin(this);
	}

	set angle(angle) {		// absolute
		PlanarSpace.setAngle(this, angle);
	}

	//
	// Queries
	//

	getAngleFrom(center = PlanarSpace.origin) {
		return PlanarSpace.getAngleFrom(center);
	}

	getDistanceFrom(point = PlanarSpace.origin) {
		return PlanarSpace.getDistanceBetween(this, point);
	}

	isEqualTo(point) {
		return PlanarSpace.areEqual(this, point);
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

}/* PlanarSpace.Point */




/* PlanarSpace.PolarPoint
*/
PlanarSpace.PolarPoint = class {

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

}/* PlanarSpace.PolarPoint */
