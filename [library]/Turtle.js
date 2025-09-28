/* Turtle
*/
class Turtle {

	#position = new Point(0,0);
	#heading = new Angle();
	static origin = new Point(0,0);
	static zeroRadian = Math.PI/2;

	constructor(x=0, y=0, heading=0, digits=12) {
		//console.log('Turtle args:',arguments)
		this.#position.x = x;
		this.#position.y = y;
		this.#heading.degrees = heading;
		//this.precision.digits = digits;
		//console.log('Turtle this:',this);
	}


	//
	//	Accessors
	//

	get x()  { return this.#position.x; }
	get y()  { return this.#position.y; }
	get position() { return this.#position; }
	get heading() { return this.#heading; }
	get radius() { return Math.hypot(this.x, this.y); }

	get report() { return `x:${this.#x}; y:${this.#y}; heading:${this.heading.degrees};`; }

	set #x(x) { this.#position.x = x; }
	set #y(y) { this.#position.y = y; }



	//
	//	Mutators
	//

	toOrigin = function() {
		this.#x = 0.0;
		this.#y = 0.0;
		this.heading.degrees = 0.0;
	}


	bear(bearingDegrees, distance=0) {
		console.log('Turtle.bear:', arguments);
		this.heading.degrees += bearingDegrees;
		if (distance) { // could also be subject to float comparison
			console.log('if (distance)');
			const delta = new PolarPoint(new Angle(this.heading.degrees), distance);
			console.log('if (distance): delta', delta);
			const newPoint = this.plusPolar(delta);
			console.log('newPoint', newPoint);
			this.#x = newPoint.x;
			this.#y = newPoint.y;
		}
	}

	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }


	/* moves dx,dy in the turtles current local frame */
	move = function(dx,dy) {
		//console.log('move:', arguments);

		const currentPos =  new Point(this.x,this.y);
		const offset = new Point(dx,dy).rotate(this.heading.radians);
		const newPoint = this.plusPoint(offset);
		this.heading.degrees = Turtle.lineAngle(currentPos, newPoint).degrees;
	}

	//
	// Static
	//


	static lineAngle = function(point1, point2) {
		// will get less meaningful the closer the points are together
		let result = new Angle();
		if (!point1.isEqualTo(point2)) {
			result.radians = (Turtle.zeroRadian + Math.atan2(point2.y-point1.y, point2.x-point1.x));
		}
		return result;
	}

	static lineLength = function(point1, point2) {
		const result = Math.hypot((point2.x - point1.x), (point2.y - point1.y));
		return result;
	}



	//
	//	Convertors
	//

	toPoint() {
		let tp = new Point(this.#position.x, this.#position.y);
		console.log('tp:', tp, this.x);
		return tp;
	}

	plusPoint = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	plusPolar = function(polarPoint) { // new
		console.log('Turtle.plusPolar:', arguments);
		const temp = polarPoint.toPoint();
		const result = this.plusPoint(temp);
		console.log('Turtle.plusPolar:', temp, result);
		return result;
	}



}/* Turtle */