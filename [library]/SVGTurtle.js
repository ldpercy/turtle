/* SVGTurtle
*/
class SVGTurtle extends Turtle{

	#position = new SVGPoint();
	#heading = new Angle();
	static origin = new SVGPoint(0,0);
	static zeroRadian = Math.PI/2;

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

	constructor(svgPoint = new SVGPoint(), heading=0, digits=12) {
		super(...arguments);
		this.#position = svgPoint;
		this.#heading.degrees = heading;
		this.precision.digits = digits;
		//console.log('SVGTurtle:', this);
	}

	//
	// Accessors
	//

	get x()  { return this.#position.x; }
	get y()  { return this.#position.y; }
	get position() { return this.#position; }
	get heading() { return this.#heading; }
	get radius() { return Math.hypot(this.x, this.y); }

	get superPosition() { return super.position; }

	set position(svgPoint) {  // I'd rather this was private, but can't use the same name - review
		console.log('SVGTurtle.set position:', arguments);
		this.#position.x = (Maths.equalToFixed(this.precision.digits, Math.abs(svgPoint.x), 0.0)) ? 0.0 : svgPoint.x;
		this.#position.y = (Maths.equalToFixed(this.precision.digits, Math.abs(svgPoint.y), 0.0)) ? 0.0 : svgPoint.y;
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
			let stp = super.toPoint();
			console.log('stp:', stp);
			result = this.#moveTurtle(stp);
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





	doCommand = function(command) {
		//console.log('Command:', command);
		let result = '';

		switch(command.name) {
			case 'p'            : result = this.toPoint(instruction.p); break;
			case 'b'            : result = this.bear(...command.argument); break;		// i thought you could do multi-case???
			case 'bear'         : result = this.bear(...command.argument); break;
			case 'jump'         : result = this.jump(...command.argument); break;
			case 'l'            : result = this.left(...command.argument); break;
			case 'left'         : result = this.left(...command.argument); break;
			case 'r'            : result = this.right(...command.argument); break;
			case 'right'        : result = this.right(...command.argument); break;
			case 'm'            : result = this.move(...command.argument); break;
			case 'move'         : result = this.move(...command.argument); break;
			case 'circle'       : result = this.circle(...command.argument); break;
			case 'rect'         : result = this.rect(...command.argument); break;
			case 'ellipse'      : result = this.ellipse(...command.argument); break;
			case 'text'         : result = this.text(...command.argument); break;

			//case 'p','plus'     : result = this.plus(...command.argument); break;
			case 'marker'       : result = this.marker; break;
			case 'o'            : result = this.toOrigin(); break;
			default             : result = `<!-- Unknown: ${command} -->`; break;
		}

		//console.log(instruction);
		return result;
	}


	doCommands(commandArray) {
		//console.log(commandArray);

		let result = '';
		commandArray.forEach(command => {
			result += this.doCommand(command);
		});

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
		const originAngle = SVGTurtle.lineAngle(SVGTurtle.origin, this.#position);

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
			`cartesian:`,
			`	x: ${this.position.cartesianX.toPrecision(this.precision.report)}`,
			`	y: ${this.position.cartesianY.toPrecision(this.precision.report)}`,

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

	/* will get less meaningful the closer the points are together
	*/
	static lineAngle = function(point1, point2) {
	let result = new Angle();
		if (!point1.isEqualTo(point2)) {
			result.radians = (SVGTurtle.zeroRadian + Math.atan2(point2.y-point1.y, point2.x-point1.x));
		}
		return result;
	}

	static getLine(point1, point2) {
		//console.log('getLine:', arguments);
		const result = `<line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}"/>`;
		return result;
	}



	static getCommands = function(string) {
		const result = [];
		const lineArray = string.trim().split('\n');

		lineArray.forEach(
			(line) => {
				const match = line.match(/^(\w+)(\s.*)?/);
				if (match) {
					const cmd = match[1].trim();
					let arg;
					if (cmd === 'text') {
						arg = (match[2]) ? [match[2]] : [''];
					}
					else {
						arg = (match[2]) ? this.parseArgs(match[2]) : [];
					}
					result.push(new Command(cmd, arg));
				}
				else {
					result.push(new Command('', line));
				}
			}
		);

		return result;
	}


	static parseArgs(argString) {
		const argArray = argString.split(',');

		const result = argArray.map(
			(element) => { return Number.parseInt(element); }
		);
		return result;
	}

	toString() {
		return `SVGTurtle - x:${this.x}; y:${this.y}; heading:${this.#heading.degrees};`;
	}


}/* SVGTurtle */



class Command {
	constructor(name, argument) {
		this.name = name;
		this.argument = argument;
	}
	name = '';
	argument = [];
	toString() { return `${this.name} ${this.argument}`}
}