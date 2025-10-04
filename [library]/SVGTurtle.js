/* SVGTurtle
*/
class SVGTurtle extends Turtle{

	#space;
	#position;
	#heading;


	//#turtle = new Turtle();

	precision = {
		report : 5,
		digits : 12,
	};
	/* Precision handling
	This isn't very good at the moment - need better solutions for this stuff
	Currently uses 12 fixed decimal points, which is okay, but would like some better ways of doing this.
	For simple geometry rounding things very close to zero will do, but could have errors for anything requiring higher precision.
	*/

	constructor(
			space = new PlanarSpace('page'),
			position = new space.Point(),
			heading = new space.Angle(),
			digits = 12
		) {
		super(...arguments);

		this.#space = space;
		this.#position = position;
		this.#heading = heading;

		this.precision.digits = digits;
		//console.log('SVGTurtle:', this);
	}

	//
	// Accessors
	//

	//get x()  { return this.#position.x; }
	//get y()  { return this.#position.y; }
	//get position() { return this.#position; }
	//get heading() { return this.#heading; }
	//get radius() { return Math.hypot(this.x, this.y); }


	get svgX() { return this.#position.x;}
	get svgY() { return -this.#position.y; }

	get superPosition() { return super.position; }

	set position(svgPoint) {  // I'd rather this was private, but can't use the same name - review
		console.log('SVGTurtle.set position:', arguments);

		const x = (Maths.equalToFixed(this.precision.digits, Math.abs(svgPoint.x), 0.0)) ? 0.0 : svgPoint.x;
		const y = (Maths.equalToFixed(this.precision.digits, Math.abs(svgPoint.y), 0.0)) ? 0.0 : svgPoint.x;

		const newCartesian = new this.#space.CartesianCoordinates(x,y);

		this.#position.cartesian = newCartesian;
	}


	//
	// mutators
	//

	setHeading(heading) {

		const equal = Maths.equalToFixed(this.precision.digits, Math.abs(heading), 0.0);
		//console.log('set #heading', heading, equal);
		/*
		this isn't very clean - need better solutions for this stuff
		*/

		this.heading.degrees = (equal) ? 0.0 : heading;
	}



	bear(bearingDegrees, distance=0) { 		// draw line from current to new
		console.debug('SVGTurtle.bear:', arguments);
		let result = '';
		super.bear(bearingDegrees, distance);
		if (distance) { // could also be subject to float comparison
			//let stp = super.toPoint();
			console.log('super position:', super.position);
			result = this.#moveTurtle(super.position);
		}

		return result;
	}


	#moveTurtle = function(point) {
		console.debug('#moveTurtle:', arguments);
		const currentPos = new SVGPoint(this.x, this.y)
		const result = SVGTurtle.getLine(currentPos, point);
		this.position = point;

		return result;
	}


	jump = function(bearingDegrees, distance=0) {
		let result = '';
		if (distance) { // could also be subject to float comparison
			const delta = new PolarPoint(Maths.degreesToRadians(this.heading.degrees + bearingDegrees), distance);
			const newPoint = this.plusPolar(delta);
			this.position = newPoint;
		}

		this.heading.degrees += bearingDegrees;
		return result;
	}


	/* moves dx,dy in the turtles current local frame */
	move = function(dx,dy) {
		//console.log('move:', arguments);

		const currentPos =  new SVGPoint(this.x,this.y);
		const offset = new SVGPoint(dx,dy).rotate(this.heading.radians);
		const newPoint = this.plusPoint(offset);
		this.heading.degrees = SVGTurtle.lineAngle(currentPos, newPoint).degrees;

		const result = this.#moveTurtle(newPoint);

		return result;
	}



	circle = function(r) {
		const result = `<circle cx="${this.x}" cy="${this.y}" r="${r}"/>`;
		return result;
	}

	rect = function(width, height) {
		const result = `<rect x="${this.x - width/2}" y="${this.y - height/2}" width="${width}" height="${height}" transform="rotate(${this.heading.degrees},${this.x},${this.y})"/>`;
		return result;
	}

	ellipse = function(width, height) {
		const rx = width / 2;
		const ry = height / 2;
		const result = `<ellipse cx="${this.x}" cy="${this.y}" rx="${rx}" ry="${ry}" transform="rotate(${this.heading.degrees},${this.x},${this.y})"/>`;
		return result;
	}


	text = function(text) {
		const result = `<text x="${this.x}" y="${this.y}" transform="rotate(${this.heading.degrees},${this.x},${this.y})">${text}</text>`;
		return result;
	}






	get marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.y}" transform="rotate(${this.heading.degrees},${this.x},${this.y})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}


	get report() {
		// title text preserves whitespace, so:
		const originAngle = SVGTurtle.lineAngle(this.#space.origin, this.#position);

		const result = [
			`x: ${this.x.toPrecision(this.precision.report)}`,
			`y: ${this.y.toPrecision(this.precision.report)}`,
			`heading:`,
			`	${this.heading.degrees.toPrecision(this.precision.report)}°`,
			`	${this.heading.radians.toPrecision(this.precision.report)} rad`,
			`	${this.heading.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.heading.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`from origin:`,
			`	${this.radius.toPrecision(this.precision.report)}`,
			`	${originAngle.degrees.toPrecision(this.precision.report)}°`,
			`	${originAngle.radians.toPrecision(this.precision.report)} rad`,
			`	${originAngle.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${originAngle.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`svg:`,
			`	x: ${this.svgX.toPrecision(this.precision.report)}`,
			`	y: ${this.svgY.toPrecision(this.precision.report)}`,

			// debug

			`Debug:`,
			`	${super.toString()}`,
			`	${this.toString()}`,

		].join('\n');
		return result;
	}


	//
	// Static
	//



	static getLine(point1, point2) {
		//console.log('getLine:', arguments);
		const result = `<line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}"/>`;
		return result;
	}


	toString() {
		let result = super.toString();
		result += `SVGTurtle - x:${this.x}; y:${this.y}; heading:${this.#heading.degrees};`;
		return result;
	}


}/* SVGTurtle */



