/* Turtle
*/
class Turtle {

	#name;
	#space;
	#position;


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
		'xy',
		'xyr',
	];

	precision = {
		report : 5,
		digits : 12,
	};

	constructor(
			name,
			space = new PlanarSpace('page'),
			position = space.newPosition(`${name}-position`),
			digits = 12
		) {
		//console.log('Turtle args:',arguments)
		this.#name =  `Turtle-${name}`;
		this.#space = space;
		this.#position = position;
		this.precision.digits = digits;
	}


	//
	//	Accessors
	//

	get space() { return this.#space; }
	get position() { return this.#position; }
	get x()  { return this.#position.x; }
	get y()  { return this.#position.y; }
	get location() { return this.#position.location; }
	get direction() { return this.#position.direction; }
	get radius() { return this.#position.radius; }
	get coordinates() { return { position: this.#position, direction: this.direction } };

	get report() { return `x:${this.x}; y:${this.y}; direction:${this.direction.degrees};`; }



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
		this.#position.resetToOrigin();
	}


	/* bear
	*/
	bear(bearingDegrees, distance=0) {
		this.#position.bear(bearingDegrees, distance);
	}/* bear */


	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }


	/* moves dx,dy in the turtles current local frame
	*/
	move(dx, dy) {
		this.#position.move(dx,dy);
	}


	moveToXY(x,y) {
		this.#position.moveToXY(x,y);
	}

	moveToXYwithRotate(x,y) {
		this.#position.moveToXYwithRotate(x,y);
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
		return `Turtle - x:${this.x}; y:${this.y}; direction:${this.#position.direction.degrees};`;
	}

	log(prefix) {
		console.log(prefix, this.toString());
	}



	//
	// Commands
	//

	doCommand = function(command) {
		//console.log(`${this.#name}.doCommand:`, command);
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
			case 'xy'           : result = this.moveToXY(...command.argument); break;
			case 'xyr'          : result = this.moveToXYwithRotate(...command.argument); break;
			case 'o'            : result = this.toOrigin(); break;
			//case 'marker'       : result = this.marker; break;

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
		let lineText = '';

		lineArray.forEach(
			(line) => {
				lineText = line.trim();

				const match = lineText.match(/^(\w+)(\s.*)?/);	// standard command structure
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
			(element) => { return Number.parseFloat(element); }
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