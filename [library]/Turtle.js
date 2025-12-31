import * as turtleCommand from './TurtleCommand.js';


const numericCommands = ['left', 'right', 'bear', 'jump', 'move', 'circle', 'ellipse', 'rect', 'xy', 'xyr'];

/* Turtle
*/
export class Turtle {

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
			space,
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



	// set position(point) {  // I'd rather this was private, but can't use the same name - review
	// 	// console.log('Turtle.set position:', arguments);

	// 	const x = (Maths.equalToFixed(this.precision.digits, Math.abs(point.x), 0.0)) ? 0.0 : point.x;
	// 	const y = (Maths.equalToFixed(this.precision.digits, Math.abs(point.y), 0.0)) ? 0.0 : point.y;

	// 	const newCartesian = new this.#space.CartesianCoordinates(x,y);

	// 	this.#position.cartesian = newCartesian;
	// }


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


	/** move
	 * moves dx,dy in the turtles current local frame
	 * @param {turtleCommand.Move} move
	 */
	move(move) {
		this.#position.move(move.dx, move.dy);
	}

	/** moveToXY
	 * @param {number} x
	 * @param {number} y
	 */
	moveToXY(x,y) {
		this.#position.moveToXY(x,y);
	}

	/** moveToXYwithRotate
	 * @param {number} x
	 * @param {number} y
	 */
	moveToXYwithRotate(x,y) {
		this.#position.moveToXYwithRotate(x,y);
	}


	//
	// Static
	//




	//
	//	Convertors
	//


	/** @return {string} */
	toString() {
		return `Turtle - x:${this.x}; y:${this.y}; direction:${this.#position.direction.degrees};`;
	}



	//
	// Commands
	//



	/** @param {Command} command */
	doCommand(command) {
		//console.log(`${this.#name}.doCommand:`, command);
		//let result = '';


		switch(command.name) {
			case 'b'            :
			case 'jump'         :
			case 'bear'         : this.bear(...command.argument); break;
			case 'l'            :
			case 'left'         : this.left(...command.argument); break;
			case 'r'            :
			case 'right'        : this.right(...command.argument); break;
			case 'm'            :
			case 'move'         : this.move(...command.argument); break;
			case 'xy'           : this.moveToXY(...command.argument); break;
			case 'xyr'          : this.moveToXYwithRotate(...command.argument); break;
			case 'o'            : this.toOrigin(); break;
			//case 'marker'       : this.marker; break;

			default             : console.warn(`Unknown command: ${command}`); break;
		}

		//console.log(instruction);
		//return result;
	}

	/** @param {array} commandArray */
	doCommands(commandArray) {
		commandArray.forEach(command => {
			this.doCommand(command);
		});
	}


	/** @returns {array} */
	static getCommands = function(string) {
		const result = [];
		const lineArray = string.trim().split('\n');
		let lineText = '';
		let command;
		let commandName;

		lineArray.forEach(
			(line) => {
				lineText = line.trim();

				commandName = turtleCommand.firstWord(lineText);

				if (turtleCommand.commandMap[commandName]) {
					command = new turtleCommand.commandMap[commandName];
					command.parseCmdString(lineText);
				}


				if (command) {
					result.push(command);
				}
			}
		);

		return result;
	}


}/* Turtle */


export class Command {
	name;
	argument;
	operator;
	draw;
	valid;
	string;


	constructor(
		name = '',
		argument,
		operator = '',
		draw = true,
		valid,
	) {
		this.name = name;
		this.argument = argument;
		this.operator = operator;
		this.draw = draw;
		this.valid = valid;
	}

	/** @return {string} */
	toString() { return `${this.name} ${this.argument}`}


	/** @return {boolean} */
	get isValid() {
		return true;
		// todo: figure this out
	}

	/**
	 * @param {string} cmdString
	 * @return {Command}
	 */
	parseCmdString(cmdString) {
		this.string = cmdString;
		let arg;
		let match;

		if (cmdString.startsWith('^')) {
			this.draw = false;
			cmdString = cmdString.substring(1);
		}

		match = cmdString.match(/^(\w+)(\s.*)?/);	// standard command structure
		if (match) {

			this.name = match[1].trim();

			if (this.name === 'text') {
				arg = (match[2]) ? [match[2]] : [''];
			}
			else {
				arg = (match[2]) ? this.parseArgs(match[2]) : [];
			}
			this.argument = arg;
		}
		else {
			this.valid = false;
		}
		return this;
	}

	/**
	 * @param {string} argString
	 * @return {array}
	 * /
	parseArgs(argString) {
		const argArray = argString.split(',');

		const result = argArray.map(
			(element) => { return Number.parseFloat(element); }
		);
		return result;
	}/* parseArgs */

}/* Command */