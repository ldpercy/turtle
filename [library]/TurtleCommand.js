

import {Command} from './Turtle.js';



export class Bear extends Command {

	/** @type number */		bearingDegrees;
	/** @type number */		distance;

	/** @param {string} argString */
	parseArgs(argString) {
		const argArray = argString.split(',');
		this.bearingDegrees = Number.parseFloat(argArray[0]);
		this.distance = Number.parseFloat(argArray[1]);
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



// bear(bearingDegrees, distance=0) {


export const commandMap = {
	'b'            : Bear,
	'bear'         : Bear,
	'l'            : Bear,
	'left'         : Bear,
	'r'            : Bear,
	'right'        : Bear,
	'm'            : Move,
	'move'         : Move,
	//'xy'           : this.moveToXY(...command.argument); break;
	//'xyr'          : this.moveToXYwithRotate(...command.argument); break;
	//'o'            : this.toOrigin(); break;
};




export function firstWord(string) {
	return string.trimLeft().split(/\w+/)[0];
}