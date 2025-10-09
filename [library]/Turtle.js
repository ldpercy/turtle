/* Turtle
*/
class Turtle {

	#space;
	#position;
	#heading;

	commands = [
		'b',
		'bear',
		'jump',
		'l',
		'left',
		'r',
		'right',
		'm',
		'move',
		'o',
	];

	precision = {
		report : 5,
		digits : 12,
	};

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
		this.precision.digits = digits;
		//console.log('Turtle this:',this);
	}


	//
	//	Accessors
	//

	get space() { return this.#space; }
	get position() { return this.#position; }
	get x()  { return this.#position.x; }
	get y()  { return this.#position.y; }
	get heading() { return this.#heading; }
	get radius() { return this.#position.radius; }
	get coordinates() { return { position: this.#position, heading: this.#heading } };

	get report() { return `x:${this.x}; y:${this.y}; heading:${this.heading.degrees};`; }


	/* set position(point) {  // I'd rather this was private, but can't use the same name - review
		console.debug('Turtle.set position:', arguments);
		this.#position.x = point.x;
		this.#position.y = point.y;
	} */

	set position(point) {  // I'd rather this was private, but can't use the same name - review
		// console.log('Turtle.set position:', arguments);

		const x = (Maths.equalToFixed(this.precision.digits, Math.abs(point.x), 0.0)) ? 0.0 : point.x;
		const y = (Maths.equalToFixed(this.precision.digits, Math.abs(point.y), 0.0)) ? 0.0 : point.y;

		const newCartesian = new this.#space.CartesianCoordinates(x,y);

		this.#position.cartesian = newCartesian;
	}


	//
	//	Mutators
	//


	toOrigin() {
		this.#position.toOrigin();
		this.#heading.degrees = 0;
	}


	setHeading(heading) {

		const equal = Maths.equalToFixed(this.precision.digits, Math.abs(heading), 0.0);
		//console.log('set #heading', heading, equal);
		/*
		this isn't very clean - need better solutions for this stuff
		*/

		this.heading.degrees = (equal) ? 0.0 : heading;
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

			console.debug('Turtle.bear delta', delta);

			//const newPoint = this.plusPolar(delta);
			//console.log('newPoint', newPoint);
			this.#position.add(delta);
		}
		//this.log('bear-end');
	}/* bear */

	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }


	/* moves dx,dy in the turtles current local frame
	*/
	move(dx, dy) {
		console.debug('Turtle.move:', arguments);

		const currentCartesian = new this.#space.CartesianCoordinates(this.x, this.y);
		//const offset = new Point(dx,dy).rotate(this.heading.radians);

		let delta = this.#space.newPoint('delta');
		let deltaCartesian = new this.#space.CartesianCoordinates(dx, dy);
		console.debug('Turtle.move deltaCartesian:', deltaCartesian);


		delta.cartesian = deltaCartesian; // { x: 123, y: 456 };
		console.debug('Turtle.move delta:', delta);


		delta.rotate(this.heading);
		console.debug('Turtle.move delta rotate:', delta);

		const newPoint = this.#position.plus(delta);

		console.debug('Turtle.move newPoint:', newPoint);

		const newHeading = this.#space.lineAngle(currentCartesian, newPoint);

		console.debug('Turtle.move new heading:', newHeading);
		this.#heading = newHeading;

		this.position = newPoint;
	}

	//
	// Static
	//




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
		console.log('Turtle.doCommand:', command);
		let result = '';

		switch(command.name) {
			case 'p'            : result = this.toPoint(instruction.p); break;
			case 'b'            :
			case 'jump'         :
			case 'bear'         : result = this.bear(...command.argument); break;
			case 'l'            :
			case 'left'         : result = this.left(...command.argument); break;
			case 'r'            :
			case 'right'        : result = this.right(...command.argument); break;
			case 'm'            :
			case 'move'         : result = this.move(...command.argument); break;
			case 'o'            : result = this.toOrigin(); break;
			/*
			case 'circle'       : result = this.circle(...command.argument); break;
			case 'rect'         : result = this.rect(...command.argument); break;
			case 'ellipse'      : result = this.ellipse(...command.argument); break;
			case 'text'         : result = this.text(...command.argument); break;
			case 'marker'       : result = this.marker; break;
			*/

			default             : console.warn(`Unknown command: ${command}`); break;
		}

		//console.log(instruction);
		return result;
	}


	doCommands(commandArray) {
		commandArray.forEach(command => {
			this.doCommand(command);
		});
	}

	static getCommands = function(string) {
		const result = [];
		const lineArray = string.trim().split('\n');

		lineArray.forEach(
			(line) => {
				const match = line.match(/^(\w+)(\s.*)?/);	// standard command structure
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
					// result.push(new Turtle.Command('', line));
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