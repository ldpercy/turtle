//
//	PlanarSpace
//

import * as Maths from "./Maths.js";
import * as abstractSpace  from "./AbstractSpace.js"




//
//	Interfaces
//


/** CartesianCoordinates
 * @interface
 */
export class CartesianCoordinates {
	/** @type {number} */
	x;
	/** @type {number} */
	y;

	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
}/* CartesianCoordinates */


/** PolarCoordinates
 * @interface
 */
export class PolarCoordinates {
	/** @type {Angle} */
	angle;
	/** @type {number} */
	radius;

	constructor(angle = new Angle(), radius=0) {
		this.angle = angle;
		this.radius = radius;
	}
}/* PolarCoordinates */


//
//	classes
//


/** Space
 *
 */
export class Space extends abstractSpace.Space {

	/** @type {string} */
	#name;

	/** @type {CartesianCoordinates} */
	static origin = new CartesianCoordinates(0,0);



	// JavaScript angle adjustments - see wiki/coordinates
	#jsAngleAxisAdjust;
	#jsAngleDirectionAdjust;

	// space dimensions - tbd
	#size;


	constructor(
			name = 'Initial PlanarSpace name',
			polarAxis = 'y',
			polarDirection = 'clockwise',
			size,
		) {
		super();
		this.#name = name;

		if (polarAxis === 'y')	{	this.#jsAngleAxisAdjust = -Math.PI/2;	}
		else					{	this.#jsAngleAxisAdjust = 0;			}

		if (polarDirection === 'clockwise')	{	this.#jsAngleDirectionAdjust = -1;	}
		else								{	this.#jsAngleDirectionAdjust = +1;	}

		this.#size = size;

	}/* constructor */


	get name() { return this.#name; }
	get origin() { return Space.origin; }



	//
	// Instance Methods
	//

	/** getAngleFrom
	 * TODO: Needs a bit of attention...
	 * @param {CartesianCoordinates} center
	 * @param {CartesianCoordinates} cartesian
	 * @returns {Angle}
	 */
	getAngleFrom(center, cartesian) {
		//console.debug(`${this.#name}.getAngleFrom:`, arguments);
		const result = new Angle();
		result.radians = this.#jsAngleAxisAdjust + (this.#jsAngleDirectionAdjust * Math.atan2(center.y - cartesian.y, center.x - cartesian.x));
		result.normalise180();
		//console.debug(`${this.#name}.getAngleFrom:`, result);
		return result;
	}/* getAngleFrom */


	/**
	 * @param {CartesianCoordinates} cartesian
	 * @returns {PolarCoordinates}
	 */
	cartesianToPolar(cartesian) {

		const result = new PolarCoordinates(
			this.getAngleFrom(Space.origin, cartesian),
			Space.distanceFromOrigin(cartesian)
		);
		return result;
	}/* cartesianToPolar */


	/**
	 * @param {PolarCoordinates} polar
	 * @returns {CartesianCoordinates}
	 */
	polarToCartesian(polar) {
		const result = new CartesianCoordinates(
			Space.origin.x + (polar.radius * +Math.sin(polar.angle.radians)),
			Space.origin.y + (polar.radius * +Math.cos(polar.angle.radians))		// PlanarSpace.zeroRadian +
		);
		//console.debug('polarToCartesian:', polar, result);
		return result;
	}/* polarToCartesian */


	//
	//	Static methods
	//

	/**
	 * @param {CartesianCoordinates} cartesian
	 * @returns {number}
	 */
	static distanceFromOrigin(cartesian) {
		return Space.getDistanceFrom(Space.origin, cartesian);
	}

	/**
	 * @param {CartesianCoordinates} point1
	 * @param {CartesianCoordinates} point2
	 * @returns {number}
	 */
	static getDistanceFrom(point1, point2) {
		return Math.hypot((point2.x - point1.x), (point2.y - point1.y));
	}


	/**
	 * @param {CartesianCoordinates} point1
	 * @param {CartesianCoordinates} point2
	 * @returns {boolean}
	 */
	static areEqual(point1, point2) {
		// could depend on more,
		return ((point1.x === point2.x) && (point1.y === point2.y));
	}




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

	// Convenience Constructors
	// These constructors are here so that space clients can create new objects from a space instance without knowing their canonical names
	// newPoint and newPosition use a factory style instead because they need parent space instance references, which can't be done with class style used for the others.
	// They may need changing over also if they require space instance references.


	/** newPoint
	 * Automatically passes in the required reference to the parent space instance for the new point.
	 * @returns {Point}
	 */
	newPoint(name) {
		return new Point(name, this);
	}/* newPoint */


	/** newPosition
	 * Automatically passes in the required reference to the parent space instance for the new position.
	 * @returns {Position}
	 */
	newPosition(name) {
		return new Position(name, this);
	}/* newPosition */

	/** @returns {Angle} */
	Angle = class {
		constructor() {
			return new Angle(...arguments);
		}
	}/* Angle */

	/** @returns {Angle} */
	newAngle() {
		return new Angle(...arguments);
	}

	/** @returns {CartesianCoordinates} */
	CartesianCoordinates = class {
		constructor() {
			return new CartesianCoordinates(...arguments);
		}
	}/* CartesianCoordinates */

	/** @returns {CartesianCoordinates} */
	newCartesianCoordinates() {
		return new CartesianCoordinates(...arguments);
	}


	/** @returns {PolarCoordinates} */
	PolarCoordinates = class {
		constructor() {
			return new PolarCoordinates(...arguments);
		}
	}/* PolarCoordinates */

	/** @returns {PolarCoordinates} */
	newPolarCoordinates() {
		return new PolarCoordinates(...arguments);
	}


}/* PlanarSpace */







/** Angle
 * @type {Angle}
 */
export class Angle {
	#degrees = 0;

	constructor(degrees=0) {
		this.#degrees = degrees;
	}

	get degrees()    { return this.#degrees; }
	get radians()    { return this.#degrees / 180 * Math.PI; }
	get radiansPi()  { return this.#degrees / 180; }
	get radiansTau() { return this.#degrees / 360; }

	set degrees(degrees)         { this.#degrees = degrees; }
	set radians(radians)         { this.#degrees = radians * 180 / Math.PI; }
	set radiansPi(radiansPi)     { this.#degrees = radiansPi * 180; }
	set radiansTau(radiansTau)   { this.#degrees = radiansTau * 360; }


	//
	//	mutators
	//

	add(angle)		{	this.#degrees += angle.degrees;	return this; }
	subtract(angle)	{	this.#degrees -= angle.degrees;	return this; }

	/* normalise180 (mutator)
	Normalise the angle to +/-180 degrees, or -/+ pi radians.
	*/
	normalise180() {
		// https://stackoverflow.com/questions/2320986/easy-way-to-keeping-angles-between-179-and-180-degrees

		// reduce the angle
		let result = this.degrees % 360;

		// force it to be the positive remainder, so that 0 <= angle < 360
		result = (result + 360) % 360;

		// force into the minimum absolute value residue class, so that -180 < angle <= 180
		if (result > 180)
			result -= 360;
		this.degrees = result;
		return this;
	}


	// return a new copy of the angle
	new() {
		return new Angle(this.degrees);
	}

}/* Angle */



/** Point
 * @implements {CartesianCoordinates}
 * @implements {PolarCoordinates}
 */
export class Point {
	#name		= 'Initial Point name';
	/** @type {Space} */					#space;
	/** @type {CartesianCoordinates} */		#cartesian;
	/** @type {PolarCoordinates} */			#polar;

	/**
	 * @param {string} name
	 * @param {Space} space
	 */
	constructor(name, space) {
		this.#name = name;
		this.#space = space;
		this.#cartesian	= new CartesianCoordinates();
		this.#polar	    = new PolarCoordinates();
	}

	//
	//	Accessors
	//

	get x()			{ return this.#cartesian.x; }
	get y()			{ return this.#cartesian.y; }
	get angle()		{ return this.#polar.angle; }
	get radius()	{ return this.#polar.radius; }
	get cartesian() { return this.#cartesian; }

	/** @param {PolarCoordinates} polar */
	set polar(polar) {
		//console.debug(`Point ${this.#name}.polar = `, polar);
		this.#polar = polar;
		this.#cartesian = this.#space.polarToCartesian(polar);
	}


	/** @param {CartesianCoordinates} cartesian */
	set cartesian(cartesian) {
		//console.debug(`Point ${this.#name}.cartesian = `, cartesian);
		this.#cartesian = cartesian;
		//console.debug('Point set cartesian', this.#cartesian);
		this.#polar = this.#space.cartesianToPolar(cartesian);
		//console.debug('Point set cartesian result', this, this.#cartesian);
	}


	//
	// Queries
	//

	getAngleFrom(center) {
		return this.#space.getAngleFrom(center, this);
	}

	getDistanceFrom(point) {
		return Space.getDistanceFrom(this, point);
	}

	isEqualTo(point) {
		return Space.areEqual(this, point);
	}

	//
	// Convertors
	//

	plus = function(point) {
		const newPoint = new Point(`${this.#name} plus point`, this.#space);
		newPoint.cartesian = new CartesianCoordinates(this.x + point.x, this.y + point.y);
		return newPoint;
	}

	toCartesian()	{ return new CartesianCoordinates(this.x, this.y); }
	toPolar()		{ return new PolarCoordinates(new Angle(this.#polar.angle.degrees), this.#polar.radius); }



	//
	// Mutators
	//

	resetToOrigin() {
		this.cartesian = new CartesianCoordinates();
	}

	add(point) {
		const newCartesian = new CartesianCoordinates(this.x + point.x, this.y + point.y);
		this.cartesian = newCartesian;
	}


	rotate(angle) {	// relative
		//console.debug('PlanarSpace.Point rotate', angle);

		const newPolarAngle = new Angle(this.#polar.angle.degrees + angle.degrees);
		const newPolar = new PolarCoordinates(newPolarAngle, this.#polar.radius);
		this.polar = newPolar;
	}


	toString() {
		return `${this.#name} - x:${this.x}; y:${this.y}; a:${this.angle.degrees}; r:${this.radius};`;
	}

}/* Point */





/* PolarPoint
This can be culled  - there might be some sort of need for it in the future but in a greatly cut-down version.
For now though Point is the combined version.
*/



/** Position
 * @implements {CartesianCoordinates}
 * @implements {PolarCoordinates}
 */
export class Position {
	/** @type {string} */		#name		= 'Initial Position name';
	/** @type {Space} */		#space;
	/** @type {Point} */		#location;
	/** @type {Angle} */		#direction;


	constructor(name, space) {
		this.#name = name;
		this.#space = space;
		this.#location    = space.newPoint(`${name}.location`);
		this.#direction   = space.newAngle();
	}

	get x()			{ return this.#location.x; }
	get y()			{ return this.#location.y; }
	get location()	{ return this.#location; }
	get cartesian()	{ return this.#location.cartesian; }
	get direction()	{ return this.#direction; }
	get angle()     { return this.#direction; }
	get degrees()   { return this.#direction.degrees; }
	get radius()	{ return this.#location.radius; }


	/** setLocation
	 * @param {Point} location
	 */
	setLocation(location) {
		this.#location.cartesian = location.cartesian;
	}

	/** setCartesian
	 * @param {CartesianCoordinates} cartesian
	 */
	setCartesian(cartesian) {
		this.#location.cartesian = cartesian;
	}

	/** setDirection
	 * @param {Angle} direction
	 */
	setDirection(direction) {
		this.#direction = direction;
	}

	/** @param {Point} point */
	addPoint(point) {
		const newCartesian = new CartesianCoordinates(this.x + point.x, this.y + point.y);
		this.#location.cartesian = newCartesian;
	}



	resetToOrigin() {
		this.#location.resetToOrigin();
		this.#direction.degrees = 0;
	}

	/**
	 * @param {number} bearingDegrees
	 * @param {number} distance
	 */
	bear(bearingDegrees, distance) {

		/** @type {Point} */ let delta;
		let angle;
		this.#direction.degrees += bearingDegrees;

		if (distance) { // could also be subject to float comparison
			delta = this.#space.newPoint('bearing delta');
			delta.polar = this.#space.newPolarCoordinates(this.#direction, distance);

			//console.debug('Position.bear delta', delta);

			this.addPoint(delta);
		}

	}/* bear */


	move(dx, dy) {
		//console.debug('Position.move:', arguments);

		const currentCartesian =  this.#space.newCartesianCoordinates(this.x, this.y);

		/** @type {Point} */
		const newPoint = this.#space.newPoint('Move newPoint');
		newPoint.cartesian = currentCartesian;

		let delta = this.#space.newPoint('delta');
		let deltaCartesian = this.#space.newCartesianCoordinates(dx, dy);
		//console.debug('Position.move deltaCartesian:', deltaCartesian);


		delta.cartesian = deltaCartesian; // { x: 123, y: 456 };
		//console.debug('Position.move delta:', delta);


		delta.rotate(this.#direction);
		//console.debug('Position.move delta rotate:', delta);

		//const newPoint = currentPoint.add(delta);
		newPoint.add(delta);

		//console.debug('Position.move newPoint:', newPoint);

		const newDirection = this.#space.getAngleFrom(currentCartesian, newPoint);
		// There is a pre-existing quirk/bug here that the angles chosen aren't ideal
		// They need to calculated better as deltas from the previous direction


		//console.log('newDirection', newDirection);

		const newDirection180 = Maths.degrees180(newDirection.degrees);
		//console.log('newDirection180', newDirection180);

		const heading180 = Maths.degrees180(this.#direction.degrees);
		const degreesDelta = Maths.degrees180(newDirection180 - this.#direction.degrees);
		//console.log('degreesDelta', degreesDelta);

		this.#direction.degrees += degreesDelta;


		//console.debug('Position.move new direction:', newDirection);
		//this.#direction = newDirection;

		this.setLocation(newPoint);
	}


	moveToXY(x,y) {
		const newCartesian = this.#space.newCartesianCoordinates(x, y);
		this.setCartesian(newCartesian);
	}


	moveToXYandTurn(x,y) {
		const currentCartesian = this.#space.newCartesianCoordinates(this.x, this.y);
		const newCartesian =  this.#space.newCartesianCoordinates(x, y);

		const spaceAngle = this.#space.getAngleFrom(currentCartesian, newCartesian);
		//const delta = Maths.degrees180(spaceAngle.degrees - this.#direction.degrees);


		//console.log('spaceAngle', spaceAngle);

		//console.log('this.direction', this.direction);

		const delta = spaceAngle.new().subtract(this.direction);

		//delta.subtract(this.direction);
		//console.log('delta', delta);
		delta.normalise180();
		//console.log('delta', delta);
		this.direction.add(delta);

		this.setCartesian(newCartesian);
	}


	moveToXYD(x,y,d) {
		const newCartesian = this.#space.newCartesianCoordinates(x, y);
		this.setCartesian(newCartesian);
		const newDirection  =  this.#space.newAngle(d);
		this.setDirection(newDirection);
	}



}/* Position */