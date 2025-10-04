/* SVGTurtle
*/
class SVGTurtle extends Turtle{


	turtle;


	/* Precision handling
	This isn't very good at the moment - need better solutions for this stuff
	Currently uses 12 fixed decimal points, which is okay, but would like some better ways of doing this.
	For simple geometry rounding things very close to zero will do, but could have errors for anything requiring higher precision.
	*/

	constructor(
			space = new PlanarSpace('page'),
			//position = space.newPoint('SVGTurtle position'),
			//heading = new space.Angle(),
			digits = 12
		) {
		super(...arguments);


		//this.#position = position;
		//this.#heading = heading;

		this.precision.digits = digits;
		//console.log('SVGTurtle:', this);


		this.turtle = new Turtle(space);
	}

	//
	// Accessors
	//


	//get position() { return this.#position; }

	//get radius() { return Math.hypot(this.x, this.y); }

	get x()  { return this.turtle.position.x; }
	get y()  { return this.turtle.position.y; }
	get svgX() { return this.x;}
	get svgY() { return -this.y; }
	get heading() { return this.turtle.heading; }
	get position() { return this.turtle.position; }
	get radius() { return this.turtle.position.radius; }


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
		//console.debug('SVGTurtle.bear:', arguments);
		let result = '';
		super.bear(bearingDegrees, distance);
		if (distance) { // could also be subject to float comparison
			//let stp = super.toPoint();
			//console.log('super position:', super.position);
			result = this.#moveTurtle(super.position);
		}

		return result;
	}


	#moveTurtle(point) {
		//console.debug('#moveTurtle:', arguments);
		const result = SVGTurtle.getLine(super.position, point);
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
		const originAngle = this.turtle.position.angle;

		console.log('report:...', this.position);

		// title text preserves whitespace, so:
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




	doCommand = function(command) {
		//console.log('Command:', command);
		let result = '';



		switch(command.name) {

			// these need to go to the turtle
			case 'b'            : result = this.bear(...command.argument); break;		// i thought you could do multi-case???
			case 'bear'         : result = this.bear(...command.argument); break;
			case 'jump'         : result = this.jump(...command.argument); break;
			case 'l'            : result = this.left(...command.argument); break;
			case 'left'         : result = this.left(...command.argument); break;
			case 'r'            : result = this.right(...command.argument); break;
			case 'right'        : result = this.right(...command.argument); break;
			case 'm'            : result = this.move(...command.argument); break;
			case 'move'         : result = this.move(...command.argument); break;
			case 'o'            : result = this.toOrigin(); break;

			// these are presentation only
			case 'circle'       : result = this.circle(...command.argument); break;
			case 'rect'         : result = this.rect(...command.argument); break;
			case 'ellipse'      : result = this.ellipse(...command.argument); break;
			case 'text'         : result = this.text(...command.argument); break;
			case 'marker'       : result = this.marker; break;

			default             : result = `<!-- Unknown: ${command} -->`; break;

		}

		//console.log(instruction);
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
		//let result = super.toString();
		let result = `SVGTurtle - x:${this.x}; y:${this.y}; heading:${this.heading.degrees};`;
		return result;
	}


}/* SVGTurtle */



