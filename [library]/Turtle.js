/* Turtle
*/
class Turtle {

	#space;
	#position;
	#heading;

	constructor(
			space = new PlanarSpace('page'),
			position = space.newPoint('Turtle position'),
			heading = new space.Angle(),
			digits = 12
		) {
		//console.log('Turtle args:',arguments)

		this.#space = space;
		this.#position = position;
		this.#heading = heading;
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

	get report() { return `x:${this.x}; y:${this.y}; heading:${this.heading.degrees};`; }

	/* set position(point) {  // I'd rather this was private, but can't use the same name - review
		console.debug('Turtle.set position:', arguments);
		this.#position.x = point.x;
		this.#position.y = point.y;
	} */


	//
	//	Mutators
	//

	toOrigin = function() {
		this.#position = Turtle.origin;
		this.#heading.degrees = 0.0;
	}


	bear(bearingDegrees, distance=0) {
		console.debug('Turtle.bear:', arguments);
		let delta, angle;
		this.heading.degrees += bearingDegrees;

		if (distance) { // could also be subject to float comparison
			//console.log('if (distance)');
			delta = this.#space.newPoint('delta');
			//(angle = new this.#space.Angle()).degrees = this.heading.degrees;
			delta.polar = new this.#space.PolarCoordinates(this.heading, distance);

			console.log('if (distance): delta', delta);

			//const newPoint = this.plusPolar(delta);
			//console.log('newPoint', newPoint);
			this.#position.add(delta);
		}
		this.log('bear-end');
	}/* bear */

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
		//console.log('tp:', tp, this.x);
		return tp;
	}

	plusPoint = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	plusPolar = function(polarPoint) { // new
		//console.log('Turtle.plusPolar:', arguments);
		const temp = polarPoint.toPoint();
		const result = this.plusPoint(temp);
		//console.log('Turtle.plusPolar:', temp, result);
		return result;
	}


	toString() {
		return `Turtle - x:${this.x}; y:${this.y}; heading:${this.#heading.degrees};`;
	}

	log(prefix) {
		console.log(prefix, this.toString());
	}



	//
	// Commands
	//

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
					result.push(new Turtle.Command(cmd, arg));
				}
				else {
					result.push(new Turtle.Command('', line));
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

}/* Turtle */


Turtle.Command = class {
	constructor(name, argument) {
		this.name = name;
		this.argument = argument;
	}
	name = '';
	argument = [];
	toString() { return `${this.name} ${this.argument}`}
}