//
//	TurtleCommands
//



//
//	Command Classes
//



export class Command {
	/** @type string */		string;
	/** @type string */		name;
	/** @type object */		argument = {};
	/** @type boolean */	draw = true;
	/** @type boolean */	valid = false;



	//operator;

	constructor(
		name = '',
		argument,
		//operator = '',
	) {
		this.name = name;
		this.argument = argument;
		//this.operator = operator;
	}

	/** @return {string} */
	toString() { return `${this.name} ${this.argument}`}


	/** @return {boolean} */
	get isValid() {
		return true;
		// todo: figure this out
	}

	/**
	 * @param {string} argumentString
	 */
	parseArguments(argumentString) {
		// this.argument = argumentString.split(',');
		// this.argument.map(
		// 	(element) => { return Number.parseFloat(element); }
		// );
	}/* parseArguments */

}/* Command */


export class NoCommand extends Command { }



export class Bear extends Command {
	/** argument
	 * @property {number}  bearingDegrees
	 * @property {number}  distance
	 */
	argument = {
		bearingDegrees : undefined,
		distance : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		const argArray = argumentString.split(',');
		this.argument.bearingDegrees = Number.parseFloat(argArray[0]);
		this.argument.distance = Number.parseFloat(argArray[1]);

		if (this.name === 'left') {
			this.argument.bearingDegrees = -this.argument.bearingDegrees;			// very hackish, need to rationalise
		}
	}
}/* Bear */


export class Move extends Command {
	/**
	 * @property {number}  dx
	 * @property {number}  dy
	 */
	argument = {
		dx : undefined,
		dy : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		const argArray = argumentString.split(',');
		this.argument.dx = Number.parseFloat(argArray[0]);
		this.argument.dy = Number.parseFloat(argArray[1]);
	}
}/* Move */



export class Position extends Command {
	/**
	 * @property {number}  x
	 * @property {number}  y
	 * @property {number}  a
	 */
	argument = {
		x : undefined,
		y : undefined,
		a : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		const argArray = argumentString.split(',');
		this.argument.x = Number.parseFloat(argArray[0]);
		this.argument.y = Number.parseFloat(argArray[1]);
		this.argument.a = Number.parseFloat(argArray[2]);
	}
}/* Position */



export class Rectangle extends Command {
	/**
	 * @property {number}  width
	 * @property {number}  height
	 */
	argument = {
		width  : undefined,
		height : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		const argArray = argumentString.split(',');
		this.argument.width  = Number.parseFloat(argArray[0]);
		this.argument.height = Number.parseFloat(argArray[1]);
	}
}/* Rectangle */


export class Radius extends Command {
	/**
	 * @property {number}  radius
	 */
	argument = {
		radius  : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		const argArray = argumentString.split(',');
		this.argument.radius  = Number.parseFloat(argArray[0]);
	}
}/* Radius */



export class Text extends Command {
	/**
	 * @property {string}  text
	 */
	argument = {
		text  : undefined,
	};

	/** @param {string} argumentString */
	parseArguments(argumentString) {
		argumentString = argumentString.replaceAll('<','&lt;');
		argumentString = argumentString.replaceAll('>','&gt;');
		this.argument.text = argumentString;
	}
}/* Text */




//
//	Util
//





/** getCommands
 * @returns {array}
 */
export function generateCommands(commandText) {
	const result = [];
	const lineArray = commandText.trim().split('\n');
	let lineString = '';
	let command;

	lineArray.forEach(
		(line) => {
			lineString = line.trim();

			command = createCommand(lineString)
			if (command && command.isValid) {
				result.push(command);
			}
		}
	);

	//console.debug(result);

	return result;
}


/** createCommand
 * @param {string} commandString
 * @return {Command}
 */
export function createCommand(commandString) {
	let result = undefined;
	let arg;
	let match;
	let draw = true;

	if (commandString.startsWith('~')) {
		draw = false;
		commandString = commandString.substring(1);
	}

	const commandSplit = splitCommandString(commandString);

	if (commandMap[commandSplit.name]) {
		result = new commandMap[commandSplit.name];
		result.name = commandSplit.name;
		result.string = commandString;
		result.draw = draw;
		result.parseArguments(commandSplit.arguments);
		//console.debug(command);
	}

	//console.debug(result);

	return result;
}/* createCommand */



export function firstWord(string) {
	return string.trimLeft().split(/\w+/)[0];
}

export function afterFirstWord(string) {
	return string.trimLeft().split(/\w+/)[1];
}


function splitCommandString(commandString) {
	const result = {
		name      : undefined,
		arguments : undefined,
	}

	let split = commandString.match(/^\s*(\w+)\s*(.*)/);
	//console.log(commandString, split);

	if (split) {
		result.name      = split[1];
		result.arguments = split[2];
	}

	return result;
}



export const commandMap = {
	'marker'       : Command,
	'bear'         : Bear,
	'left'         : Bear,
	'right'        : Bear,
	'move'         : Move,
	'origin'       : Position,
	'xy'           : Position,
	'xyr'          : Position,

	'rect'         : Rectangle,
	'ellipse'      : Rectangle,
	'circle'       : Radius,
	'text'         : Text,
};
