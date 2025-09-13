

/* Turtle
*/
class Turtle {

	#heading = 0; //

	constructor(x=0, y=0, degrees=0, precision=12) {
		this.x = x;
		this.y = y;
		this.degrees = degrees;
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





	toPoint = function(point) { 		// draw line from current to new
		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = this.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	}


	toBearing = function(bearing, distance) { 		// draw line from current to new
		const delta = new PolarPoint(radians(this.degrees + bearing), distance);
		console.log(delta);
		const point = this.plusPolar(delta);

		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = this.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	}



	get report() {
		const result = `
			<circle cx="${this.x}" cy="${this.y}" class="report">
				<title>
					x: ${this.x}
					y: ${this.y}
					heading: ${this.degrees.toPrecision(5)}
				</title>
			</circle>
		`;
		return result;
	}

	getHeading = function(point1, point2) {
		const result = Math.PI/2 + Math.atan2(point2.y-point1.y, point2.x-point1.x);
		return result;
	}

	//
	// Accessors
	//

	get radians() { return this.heading; }
	get degrees() { return (this.heading/Math.TAU) * 360; }

	set radians(radians) { this.heading = radians; }
	set degrees(degrees) { this.heading = (degrees/360) * Math.TAU; }


	plusPoint = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}


	plusPolar = function(polarPoint) { // new
		console.log('polarPoint:',polarPoint)
		const temp = polarPoint.toPoint();
		console.log('temp:',temp)
		return this.plusPoint(temp);
	}


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




}/* Turtle */