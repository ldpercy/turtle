//
//	PlanarSpace
//


class PlanarSpace {

	static origin = {x:0, y:0};
	#name;

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
		this.#name = name;


		if (polarAxis === 'y')	{	this.#jsAngleAxisAdjust = -Math.PI/2;	}
		else					{	this.#jsAngleAxisAdjust = 0;			}

		if (polarDirection === 'clockwise')	{	this.#jsAngleDirectionAdjust = -1;	}
		else								{	this.#jsAngleDirectionAdjust = +1;	}

		this.#size = size;

	}/* constructor */


	get name() { return this.#name; }
	get origin() { return PlanarSpace.origin; }



	//
	// Instance Methods
	//


	getAngleFrom(center, cartesian) {
		//console.debug(`${this.#name}.getAngleFrom:`, arguments);
		const result = new PlanarSpace.Angle();
		result.radians = this.#jsAngleAxisAdjust + (this.#jsAngleDirectionAdjust * Math.atan2(center.y - cartesian.y, center.x - cartesian.x));
		//console.debug(`${this.#name}.getAngleFrom:`, result);
		return result;
	}/* getAngleFrom */


	cartesianToPolar = function(cartesian) {

		const result = new PlanarSpace.PolarCoordinates(
			this.getAngleFrom(PlanarSpace.origin, cartesian),
			PlanarSpace.distanceFromOrigin(cartesian)
		);
		return result;
	}/* cartesianToPolar */


	polarToCartesian = function(polar) {
		const result = new PlanarSpace.CartesianCoordinates(
			PlanarSpace.origin.x + (polar.radius * +Math.sin(polar.angle.radians)),
			PlanarSpace.origin.y + (polar.radius * +Math.cos(polar.angle.radians))		// PlanarSpace.zeroRadian +
		);
		//console.debug('PlanarSpace.polarToCartesian:', polar, result);
		return result;
	}/* polarToCartesian */


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


	/* newPoint
	Automatically passes in the required reference to the parent space instance for the new point.
	*/
	newPoint(name) {
		return new PlanarSpace.Point(name, this);
	}/* newPoint */


	/* newPosition
	Automatically passes in the required reference to the parent space instance for the new position.
	*/
	newPosition(name) {
		return new PlanarSpace.Position(name, this);
	}/* newPosition */


	Angle = class {
		constructor() {
			return new PlanarSpace.Angle(...arguments);
		}
	}/* Angle */


	CartesianCoordinates = class {
		constructor() {
			return new PlanarSpace.CartesianCoordinates(...arguments);
		}
	}/* CartesianCoordinates */


	PolarCoordinates = class {
		constructor() {
			return new PlanarSpace.PolarCoordinates(...arguments);
		}
	}/* PolarCoordinates */


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
}/* PlanarSpace.CartesianCoordinates */


PlanarSpace.PolarCoordinates = class {
	angle;
	radius;
	constructor(angle = new PlanarSpace.Angle(), radius=0) {
		this.angle = angle;
		this.radius = radius;
	}
}/* PlanarSpace.PolarCoordinates */


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
		//console.debug(`PlanarSpace.Point ${this.#name}.polar = `, polar);
		this.#polar = polar;

		this.#cartesian = this.#space.polarToCartesian(polar);
	}

	set cartesian(cartesian) {
		//console.debug(`PlanarSpace.Point ${this.#name}.cartesian = `, cartesian);
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
		const newPoint = new PlanarSpace.Point(`${this.#name} plus point`, this.#space);
		newPoint.cartesian = new PlanarSpace.CartesianCoordinates(this.x + point.x, this.y + point.y);
		return newPoint;
	}

	toCartesian()	{ return new PlanarSpace.CartesianCoordinates(this.x, this.y); }
	toPolar()		{ return new PlanarSpace.PolarCoordinates(new PlanarSpace.Angle(this.#polar.angle.degrees), this.#polar.radius); }



	//
	// Mutators
	//

	resetToOrigin() {
		this.cartesian = new this.#space.CartesianCoordinates();
	}

	add(point) {
		const newCartesian = new PlanarSpace.CartesianCoordinates(this.x + point.x, this.y + point.y);
		this.cartesian = newCartesian;
	}


	rotate(angle) {	// relative
		//console.debug('PlanarSpace.Point rotate', angle);

		const newPolarAngle = new PlanarSpace.Angle(this.#polar.angle.degrees + angle.degrees);
		const newPolar = new PlanarSpace.PolarCoordinates(newPolarAngle, this.#polar.radius);
		this.polar = newPolar;
	}


	toString() {
		return `${this.name} - x:${this.x}; y:${this.y}; a:${this.angle.degrees}; r:${this.radius};`;
	}

}/* PlanarSpace.Point */





/* PlanarSpace.PolarPoint
This can be culled  - there might be some sort of need for it in the future but in a greatly cut-down version.
For now though Point is the combined version.
*/



/* PlanarSpace.Position
*/
PlanarSpace.Position = class {
	#name		= 'Initial Position name';
	#space;
	#location;			// point in space
	#direction;			// angle in space


	constructor(name, space) {
		this.#name = name;
		this.#space = space;
		this.#location    = space.newPoint(`${name}.location`);
		this.#direction   = new space.Angle();
	}

	get x()			{ return this.#location.x; }
	get y()			{ return this.#location.y; }
	get degrees()   { return this.#direction.degrees; }
	get direction()	{ return this.#direction; }
	get radius()	{ return this.#location.radius; }


	bear(bearingDegrees, distance) {

		let delta, angle;
		this.#direction.degrees += bearingDegrees;

		if (distance) { // could also be subject to float comparison
			delta = this.#space.newPoint('bearing delta');
			//(angle = new this.#space.Angle()).degrees = this.heading.degrees;
			delta.polar = new this.#space.PolarCoordinates(this.#direction, distance);

			console.debug('Position.bear delta', delta);

			this.addPoint(delta);
		}

	}/* bear */


	addPoint(point) {
		const newCartesian = new PlanarSpace.CartesianCoordinates(this.x + point.x, this.y + point.y);
		this.#location.cartesian = newCartesian;
	}

	setPoint(point) {
		this.#location.cartesian = point;
	}


	resetToOrigin() {
		this.#location.resetToOrigin();
		this.#direction.degrees = 0;
	}



	move(dx, dy) {
		//console.debug('Turtle.move:', arguments);

		const currentCartesian = new this.#space.CartesianCoordinates(this.x, this.y);
		//const offset = new Point(dx,dy).rotate(this.heading.radians);

		const newPoint = this.#space.newPoint('Move newPoint');
		newPoint.cartesian = currentCartesian;

		let delta = this.#space.newPoint('delta');
		let deltaCartesian = new this.#space.CartesianCoordinates(dx, dy);
		//console.debug('Position.move deltaCartesian:', deltaCartesian);


		delta.cartesian = deltaCartesian; // { x: 123, y: 456 };
		//console.debug('Position.move delta:', delta);


		delta.rotate(this.#direction);
		//console.debug('Turtle.move delta rotate:', delta);

		//const newPoint = currentPoint.add(delta);
		newPoint.add(delta);

		//console.debug('Turtle.move newPoint:', newPoint);

		const newDirection = this.#space.getAngleFrom(currentCartesian, newPoint);

		console.debug('Turtle.move new direction:', newDirection);
		this.#direction = newDirection;

		this.setPoint(newPoint);
	}



}/* PlanarSpace.Position */