

//import {Command} from './Turtle.js';



export class Command {
	/** @type string */		string;
	/** @type string */		name;
	/** @type array */		argument;
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
	 * @param {string} argString
	 */
	parseArgs(argString) {
		this.argument = argString.split(',');
		this.argument.map(
			(element) => { return Number.parseFloat(element); }
		);
	}/* parseArgs */

}/* Command */


export class NoCommand extends Command { }



export class Bear extends Command {

	/** @type number */		bearingDegrees;
	/** @type number */		distance;

	/** @param {string} argString */
	parseArgs(argString) {
		const argArray = argString.split(',');
		this.bearingDegrees = Number.parseFloat(argArray[0]);
		this.distance = Number.parseFloat(argArray[1]);

		if (this.name === 'left') {
			this.bearingDegrees = -this.bearingDegrees;			// very hackish, need to rationalise
		}
	}
}


export class Move extends Command {

	/** @type number */		dx;
	/** @type number */		dy;

	/** @param {string} argString */
	parseArgs(argString) {
		const argArray = argString.split(',');
		this.dx = Number.parseFloat(argArray[0]);
		this.dy = Number.parseFloat(argArray[1]);
	}
}


export class Text extends Command {

	/** @type string */		text;

	/** @param {string} argString */
	parseArgs(argString) {
		this.text = argString;
		this.text.replaceAll('<','&lt;');
		this.text.replaceAll('>','&gt;');
	}
}







export const commandMap = {
	'bear'         : Bear,
	'left'         : Bear,
	'right'        : Bear,
	'move'         : Move,
	'origin'       : Position,
	//'xy'           : this.moveToXY(...command.argument); break;
	//'xyr'          : this.moveToXYwithRotate(...command.argument); break;
};


/** getCommands
 * @returns {array}
 */
export function generateCommands(commandText) {
	const result = [];
	const lineArray = commandText.trim().split('\n');
	let lineText = '';
	let command;
	let commandSplit;

	lineArray.forEach(
		(line) => {
			lineText = line.trim();

			commandSplit = splitCommandString(lineText);

			//console.debug(commandSplit);

			if (commandMap[commandSplit.name]) {
				command = new commandMap[commandSplit.name];
				command.name = commandSplit.name;
				command.string = lineText;
				command.parseArgs(commandSplit.arguments);

				//console.debug(command);

				if (command.isValid) {
					result.push(command);
				}
			}
		}
	);

	console.debug(result);

	return result;
}


/** createCommanmd
 * @param {string} cmdString
 * @return {Command}
 */
function createCommanmd(cmdString) {
	let result;
	let arg;
	let match;
	let draw;

	if (cmdString.startsWith('^')) {
		draw = false;
		cmdString = cmdString.substring(1);
	}

	/*
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
	*/




	return result;
}



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