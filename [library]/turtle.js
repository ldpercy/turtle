/* Turtle
*/
class Turtle {

	position = new Point();
	heading = new Angle();
	/* #x = 0;
	#y = 0; */
	#origin = new Point(0,0);

	precision = {
		report : 5,
		digits : 12,
	};
	/* Precision handling
	This isn't very good at the moment - need better solutions for this stuff
	Currently uses 12 fixed decimal points, which is okay, but would like some better ways of doing this.
	For simple geometry rounding things very close to zero will do, but could have errors for anything requiring higher precision.
	*/


	constructor(x=0, y=0, heading=0, digits=12) {
		this.position.x = x;
		this.position.y = y;
		this.heading.degrees = heading;
		this.precision.digits = digits;
	}


	//
	// Accessors
	//

	setHeading(heading) {

		const equal = Maths.equalToFixed(this.precision.digits, Math.abs(heading), 0.0);
		//console.log('set #heading', heading, equal);
		/*
		this isn't very clean - need better solutions for this stuff
		*/

		this.heading.degrees = (equal) ? 0.0 : heading;
	}


	get x()  { return this.position.x; }
	get y()  { return this.position.y; }
	set x(value) {
		this.position.x = (Maths.equalToFixed(this.precision.digits, Math.abs(value), 0.0)) ? 0.0 : value;
	}
	set y(value) {
		this.position.y = (Maths.equalToFixed(this.precision.digits, Math.abs(value), 0.0)) ? 0.0 : value;
	}


	get radius() { return Math.hypot(this.position.x, this.position.y); }


	//
	//  commands
	//

	toOrigin = function() {
		this.position.x = 0.0;
		this.position.y = 0.0;
		this.heading.degrees = 0.0;
	}


	bear = function(bearingDegrees, distance=0) { 		// draw line from current to new
		//console.log('bear:', arguments);
		let result = '';
		if (distance) { // could also be subject to float comparison
			const delta = new PolarPoint(Maths.degreesToRadians(this.heading.degrees + bearingDegrees), distance);
			const newPoint = this.plusPolar(delta);
			result = this.#moveTurtle(newPoint);
		}
		else {

		}
		this.heading.degrees += bearingDegrees;

		return result;
	}


	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }


	jump = function(bearingDegrees, distance=0) {
		let result = '';
		if (distance) { // could also be subject to float comparison
			const delta = new PolarPoint(Maths.degreesToRadians(this.heading.degrees + bearingDegrees), distance);
			const newPoint = this.plusPolar(delta);
			this.position.x = newPoint.x;
			this.position.y = newPoint.y;
		}

		this.heading.degrees += bearingDegrees;
		return result;
	}


	/* moves dx,dy in the turtles current local frame */
	move = function(dx,dy) {
		//console.log('move:', arguments);
		const offset = new Point(dx,dy).rotate(this.heading.radians);
		const newPoint = this.plusPoint(offset);
		const result = this.#moveTurtle(newPoint);
		return result;
	}



	circle = function(r) {
		const result = `<circle cx="${this.position.x}" cy="${this.position.y}" r="${r}"/>`;
		return result;
	}

	rect = function(width, height) {
		const result = `<rect x="${this.position.x - width/2}" y="${this.position.y - height/2}" width="${width}" height="${height}" transform="rotate(${this.heading.degrees},${this.position.x},${this.position.y})"/>`;
		return result;
	}

	ellipse = function(rx, ry) {
		const result = `<ellipse cx="${this.position.x}" cy="${this.position.y}" rx="${rx}" ry="${ry}" transform="rotate(${this.heading.degrees},${this.position.x},${this.position.y})"/>`;
		return result;
	}



	/*
	*/
	#moveTurtle = function(point) {
		//console.log('moveTurtle:', arguments);
		const result = Turtle.getLine(this.position, point);
		//this.heading = Turtle.lineAngle(this.position, point);
		this.position.x = point.x;
		this.position.y = point.y;

		return result;
	}


	static getLine(point1, point2) {
		//console.log('getLine:', arguments);
		const result = `<line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}"/>`;
		return result;
	}


	doCommand = function(command) {
		//console.log('Command:', command);
		let result = '';
		if(Array.prototype.isPrototypeOf(command))
		{
			command.forEach(command => {
				result += this.doCommand(command);
			});
		}
		else{
			switch(command.name) {
				case 'p'            : result += this.toPoint(instruction.p); break;
				case 'b'            : result += this.bear(...command.argument); break;		// i thought you could do multi-case???
				case 'bear'         : result += this.bear(...command.argument); break;
				case 'jump'         : result += this.jump(...command.argument); break;
				case 'l'            : result += this.left(...command.argument); break;
				case 'left'         : result += this.left(...command.argument); break;
				case 'r'            : result += this.right(...command.argument); break;
				case 'right'        : result += this.right(...command.argument); break;
				case 'm'            : result += this.move(...command.argument); break;
				case 'move'         : result += this.move(...command.argument); break;
				case 'circle'       : result += this.circle(...command.argument); break;
				case 'rect'         : result += this.rect(...command.argument); break;
				case 'ellipse'      : result += this.ellipse(...command.argument); break;

				//case 'p','plus'     : result += this.plus(...command.argument); break;
				case 'marker'       : result += this.marker; break;
				case 'o'            : result += this.toOrigin(); break;
				default             : result += `<!-- ${command} -->`; break;
			}
		}
		//console.log(instruction);
		return result;
	}



	get marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.position.x}" y="${this.position.y}" transform="rotate(${this.heading.degrees},${this.position.x},${this.position.y})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}


	get report() {
		// title text preserves whitespace, so:
		const originAngle = Turtle.lineAngle(this.#origin, this.position);

		const result = [
			`x: ${this.position.x.toPrecision(this.precision.report)}`,
			`y: ${this.position.y.toPrecision(this.precision.report)}`,
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
		].join('\n');
		return result;
	}


	/* will get less meaningful the closer the points are together
	*/
	static lineAngle = function(point1, point2) {
		let result = new Angle();
		if (!point1.isEqualTo(point2)) {
			result = new Angle(Math.PI/2 + Math.atan2(point2.y-point1.y, point2.x-point1.x),'radians');
		}

		return result;
	}

	static lineLength = function(point1, point2) {
		const result = Math.hypot((point2.x - point1.x), (point2.y - point1.y));
		return result;
	}

	static getCommands = function(string) {
		const result = [];
		const lineArray = string.trim().split('\n');

		lineArray.forEach(
			(line) => {
				const match = line.match(/(\w+)(\s.*)?/);
				if (match) {
					//console.log(match);
					const cmd = match[1];
					const arg = (match[2]) ? this.parseArgs(match[2]) : [];
					result.push(new Command(cmd, arg));
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

	//
	//
	//

	plusPoint = function(point) {
		return new Point(
			this.position.x + point.x,
			this.position.y + point.y
		);
	}

	plusPolar = function(polarPoint) { // new
		const temp = polarPoint.toPoint();
		return this.plusPoint(temp);
	}


}/* Turtle */



class Command {
	constructor(name, argument) {
		this.name = name;
		this.argument = argument;
	}
	name = '';
	argument = [];
	toString() { return `${this.name} ${this.argument}`}
}