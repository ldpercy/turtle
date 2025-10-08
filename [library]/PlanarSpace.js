//
//	PlanarSpace
//


class PlanarSpace {

	static origin = {x:0, y:0};
	static zeroRadian = Math.PI/2;		// This should be made a parameter to the space; Clockwise from y-axis is what I use, but it should be configurable
	#name;
	#size;	// tbd


	constructor(
			name = 'Initial PlanarSpace name',
			size,
		) {
		this.#name = name;
		this.#size = size;
	}

	get name() { return this.#name; }
	get origin() { return PlanarSpace.origin; }



	//
	// Instance Methods
	//


	angleFromOrigin(cartesian) {
		return this.getAngleFrom(PlanarSpace.origin, cartesian );
	}

	getAngleFrom(center, cartesian) {
		const result = new PlanarSpace.Angle();
		result.radians = PlanarSpace.zeroRadian + Math.atan2(cartesian.y - center.y, cartesian.x - center.x);
		return result;
	}

	cartesianToPolar = function(cartesian) {
		const result = new PlanarSpace.PolarCoordinates(
			this.angleFromOrigin(cartesian),
			PlanarSpace.distanceFromOrigin(cartesian)
		);
		return result;
	}

	polarToCartesian = function(polar) {
		const result = new PlanarSpace.CartesianCoordinates(
			PlanarSpace.origin.x + (polar.radius * +Math.sin(polar.angle.radians)),
			PlanarSpace.origin.y + (polar.radius * +Math.cos(polar.angle.radians))		// PlanarSpace.zeroRadian +
		);
		console.debug('PlanarSpace.polarToCartesian:', polar, result);
		return result;
	}


	lineAngle(point1, point2) {
		// will get less meaningful the closer the points are together
		//console.debug('PlanarSpace.lineAngle:', arguments);
		let result = new PlanarSpace.Angle();
		if (!PlanarSpace.areEqual(point1,point2)) {
			result.radians = (PlanarSpace.zeroRadian + Math.atan2(point2.y-point1.y, point2.x-point1.x));
		}
		console.debug('PlanarSpace.lineAngle:', arguments, result);
		return result;
	}

	//
	//	Static methods
	//


	static distanceFromOrigin(cartesian) {
		return PlanarSpace.getDistanceFrom(PlanarSpace.origin, cartesian);
	}

	static getDistanceFrom(point1, point2) {
		return Math.hypot((point2.x - point1.x), (point2.y - point1.y));
	}


	static setAngle(point, angle) {
		// Set the angle absolutely
		const newPoint = new PlanarSpace.PolarPoint(angle.radians, point.distanceFromOrigin).toPoint();
		point.x = newPoint.x;
		point.y = newPoint.y;
	}


	static areEqual(point1, point2) {
		// could depend on more,
		return ((point1.x === point2.x) && (point1.y === point2.y));
	}





	// Convenience Constructors
	// These constructors are here so that space clients can create new objects from a space instance without knowing their canonical names

	/* Attach constructed items to their parent space instance:
	Doing something like the following:
		constructor(name, space=this) {
	Unfortunately does not bind the 'this' to the space instance, it's bound to the new Instance's this.
	I bet there is a way to do it though...

	Using a factory function would work.
	Will have to think about the ergonomics of what I'm trying to achieve here.

	Having these convenience constructors allows use of standard 'new instance.Foo()' type constructs.
	But they make connecting the subinstances to the parent instance hard.

	*/


	newPoint(name) {
		return new PlanarSpace.Point(name, this);
	}


	Angle = class {
		constructor() {
			return new PlanarSpace.Angle(...arguments);
		}
	}/* Angle */


	CartesianCoordinates = class {
		constructor() {
			return new PlanarSpace.CartesianCoordinates(...arguments);
		}
	}/* Point */


	PolarCoordinates = class {
		constructor() {
			return new PlanarSpace.PolarCoordinates(...arguments);
		}
	}/* Angle */


}/* PlanarSpace */


//
//	Classes
//



PlanarSpace.CartesianCoordinates = class {
	x;
	y;
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
}

PlanarSpace.PolarCoordinates = class {
	angle;
	radius;
	constructor(angle = new PlanarSpace.Angle(), radius=0) {
		this.angle = angle;
		this.radius = radius;
	}
}


/* PlanarSpace.Point
*/
PlanarSpace.Point = class {
	#name		= 'Initial Point name';
	#space;
	#cartesian;
	#polar;

	constructor(name, space) {
		this.#name = name;
		this.#space = space;
		this.#cartesian	= new space.CartesianCoordinates();
		this.#polar	    = new space.PolarCoordinates();
	}

	//
	//	Accessors
	//

	get x()			{ return this.#cartesian.x; }
	get y()			{ return this.#cartesian.y; }
	get angle()		{ return this.#polar.angle; }
	get radius()	{ return this.#polar.radius; }


	set polar(polar) {
		console.log('PlanarSpace.Point set polar', polar);
		this.#polar = polar;

		this.#cartesian = this.#space.polarToCartesian(polar);
	}

	set cartesian(cartesian) {
		console.debug('PlanarSpace.Point set cartesian', this.#cartesian, cartesian);
		this.#cartesian = cartesian;
		//console.debug('PlanarSpace.Point set cartesian', this.#cartesian);
		this.#polar = this.#space.cartesianToPolar(cartesian);
		//console.debug('PlanarSpace.Point set cartesian result', this, this.#cartesian);
	}


	//
	// Queries
	//

	getAngleFrom(center) {
		return this.#space.getAngleFrom(center, this);
	}

	getDistanceFrom(point) {
		return PlanarSpace.getDistanceFrom(this, point);
	}

	isEqualTo(point) {
		return PlanarSpace.areEqual(this, point);
	}

	//
	// Convertors
	//

	plus = function(point) {
		const newPoint = new PlanarSpace.Point('plus point', this.#space);
		newPoint.cartesian = new PlanarSpace.CartesianCoordinates(this.x + point.x, this.y + point.y);
		return newPoint;
	}


	/*
	plusPolar = function(polarPoint) { // new
		//console.debug('Turtle.plusPolar:', arguments);
		const temp = polarPoint.toPoint();
		const result = this.plusPoint(temp);
		//console.debug('Turtle.plusPolar:', temp, result);
		return result;
	}


	toPolarPoint = function(polarPoint = new PolarPoint()) {
		const distanceFromOrigin = this.distanceFromOrigin;
		//console.debug(distance);
		const radian  = (Maths.equalToPrecision(this.precision, distanceFromOrigin, 0)) ? polarPoint.radian : this.radiansFrom();
		//console.debug(radian);
		// for points on the origin return the default PolarPoint radian
		// should probably actually add these akin to a base vector
		return new PolarPoint(
			radian,
			distanceFromOrigin
		);
	}
	*/


	//
	// Mutators
	//

	toOrigin() {
		this.#cartesian.x = 0;
		this.#cartesian.y = 0;
		this.#polar.degrees = 0;
		this.#polar.radius = 0;
	}

	add(point) {
		const newCartesian = new PlanarSpace.CartesianCoordinates(this.x + point.x, this.y + point.y);
		this.cartesian = newCartesian;
	}


	rotate(angle) {
		// relative
		console.debug('PlanarSpace.Point rotate', angle);

		const newPolarAngle = new PlanarSpace.Angle(this.#polar.angle.degrees + angle.degrees);
		const newPolar = new PlanarSpace.PolarCoordinates(newPolarAngle, this.#polar.radius);

		this.polar = newPolar;

		/* const newPoint = new PolarPoint(this.angleFromOrigin.radians + radians, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this; */
	}


	toString() {
		return `${this.name} - x:${this.x}; y:${this.y}; a:${this.angle.degrees}; r:${this.radius};`;
	}

}/* PlanarSpace.Point */







PlanarSpace.Angle = class {
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

	plus(angle) {
		this.#degrees += angle.degrees;
	}

}/* PlanarSpace.Angle */







/* PlanarSpace.PolarPoint

This can be culled  - there might be some sort of need for it in the future but in a greatly cut-down version.
For now though Point is the combined version.

* /
PlanarSpace.PolarPoint = class {

	#angle;
	#radius;

	constructor(angle = new PlanarSpace.Angle(), radius=0, precision=12)
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

	* /

	/*
	// this is really wrong I think
	toPointPolarOffset(polarPoint) {  // another polar point represents the deltas
		return new Point(
			(this.radius + polarPoint.radius) * Math.sin(this.radian + polarPoint.radian),
			(this.radius + polarPoint.radius) * -Math.cos(this.radian + polarPoint.radian)
		)
	}
	* /


	/* move
	A single-step turtle graphics kind of move relative to the current point
	Takes the current radian coordinate as the base heading and the new heading is relative to it.
	Ie a 0 heading will continue in the same direction

	move = function(distance, heading) {
		const delta = new PolarPoint(this.radian+heading, distance);
		//console.debug(delta);
		return this.plus(delta);
	}
	* /

	/* newPointOffsetXY
	The offsets are applied to the radial point's 'local' cartesian plane.
	(The absolute versions of this would have been trivial)
	* /
	newPointOffsetXY(dx, dy) {
		let result = new Point(dx, -this.radius + dy);
		result.rotate(this.angle);
		return result;
	}/* newPointOffsetXY * /


	rotate(angle) {
		this.angle.degrees += angle.degrees;
	}

}/ * PlanarSpace.PolarPoint */
