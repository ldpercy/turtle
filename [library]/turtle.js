/* Turtle
*/
class Turtle {

	#headingDegrees = 0; // internally heading is stored in degrees
	#x = 0;
	#y = 0;

	precision = {
		report : 5,
		digits : 12,
	};
	/* Precision handling
	This isn't very good at the moment - need better solutions for this stuff
	Currently uses 12 fixed decimal points, which is okay, but would like some better ways of doing this.
	For simple geometry rounding things very close to zero will do, but could have errors for anything requiring higher precision.
	*/


	constructor(x=0, y=0, headingDegrees=0, digits=12) {
		this.x = x;
		this.y = y;
		this.headingDegrees = headingDegrees;
		this.precision.digits = digits;
	}


	//
	// Accessors
	//

	set #heading(heading) {

		const equal = equalToFixed(this.precision.digits, Math.abs(heading), 0.0);
		//console.log('set #heading', heading, equal);
		/*
		this isn't very clean - need better solutions for this stuff
		*/

		this.#headingDegrees = (equal) ? 0.0 : heading;
	}


	get x()  { return this.#x; }
	get y()  { return this.#y; }
	set x(value) {
		this.#x = (equalToFixed(this.precision.digits, Math.abs(value), 0.0)) ? 0.0 : value;
	}
	set y(value) {
		this.#y = (equalToFixed(this.precision.digits, Math.abs(value), 0.0)) ? 0.0 : value;
	}


	get headingDegrees()    { return this.#headingDegrees; }
	get headingRadians()    { return this.#headingDegrees / 180 * Math.PI; }
	get headingRadiansPi()  { return this.#headingDegrees / 180; }
	get headingRadiansTau() { return this.#headingDegrees / 360; }

	set headingDegrees(degrees)         { this.#heading = degrees; }
	set headingRadians(radians)         { this.#heading = radians * 180 / Math.PI; }
	set headingRadiansPi(radiansPi)     { this.#heading = radiansPi * 180; }
	set headingRadiansTau(radiansTau)   { this.#heading = radiansTau * 360; }


	get radius() { return Math.hypot(this.x, this.y); }



	//
	//  commands
	//

	toOrigin = function() {
		this.x = 0.0;
		this.y = 0.0;
		this.headingDegrees = 0.0;
	}


	bear = function(bearingDegrees, distance=0) { 		// draw line from current to new
		//console.log('bear:', arguments);
		let result = '';
		if (distance) { // could also be subject to float comparison
			const delta = new PolarPoint(radians(this.headingDegrees + bearingDegrees), distance);
			const newPoint = this.plusPolar(delta);
			result = this.#moveTurtle(newPoint);
		}
		else {
			this.headingDegrees += bearingDegrees;
		}

		return result;
	}


	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }


	/* moves dx,dy in the turtles current local frame */
	move = function(dx,dy) {
		//console.log('move:', arguments);
		const offset = new Point(dx,dy).rotate(this.headingRadians);
		const newPoint = this.plusPoint(offset);
		const result = this.#moveTurtle(newPoint);
		return result;
	}



	circle = function(r) {
		const result = `<circle cx="${this.x}" cy="${this.y}" r="${r}"/>`;
		return result;
	}

	rect = function(width, height) {
		const result = `<rect x="${this.x - width/2}" y="${this.y - height/2}" width="${width}" height="${height}" transform="rotate(${this.headingDegrees},${this.x},${this.y})"/>`;
		return result;
	}


	/*
	*/
	#moveTurtle = function(point) {
		//console.log('moveTurtle:', arguments);
		const result = Turtle.getLine(this, point);

		this.headingRadians = Turtle.getLineRadians(this, point);
		this.x = point.x;
		this.y = point.y;

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
				case 'l'            : result += this.left(...command.argument); break;
				case 'left'         : result += this.left(...command.argument); break;
				case 'r'            : result += this.right(...command.argument); break;
				case 'right'        : result += this.right(...command.argument); break;
				case 'm'            : result += this.move(...command.argument); break;
				case 'move'         : result += this.move(...command.argument); break;
				case 'circle'       : result += this.circle(...command.argument); break;
				case 'rect'         : result += this.rect(...command.argument); break;

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
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.y}" transform="rotate(${this.headingDegrees},${this.x},${this.y})"><title>${this.report}</title></use>
		`;
		return result;
	}


	get report() {
		// title text preserves whitespace, so:
		const result = [
			`x: ${this.x.toPrecision(this.precision.report)}`,
			`y: ${this.y.toPrecision(this.precision.report)}`,
			`heading:`,
			`	${this.headingDegrees.toPrecision(this.precision.report)}°`,
			`	${this.headingRadians.toPrecision(this.precision.report)} rad`,
			`	${this.headingRadiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.headingRadiansTau.toPrecision(this.precision.report)} τ rad`,
			`from origin:`,
			`	${this.radius.toPrecision(this.precision.report)}`,
		].join('\n');
		return result;
	}



	static getLineRadians = function(point1, point2) {
		const result = Math.PI/2 + Math.atan2(point2.y-point1.y, point2.x-point1.x);
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
			this.x + point.x,
			this.y + point.y
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