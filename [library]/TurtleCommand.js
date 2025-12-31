

import {Command} from './Turtle.js';



class Bear extends Command {

	/**
 	 * @property {number}  bearingDegrees
	 * @property {number}  distance
	 */
	argument = {};


	/** @param {string} argString */
	parseArgs(argString) {
		const argArray = argString.split(',');
		this.argument.bearingDegrees = Number.parseFloat(argArray[0]);
		this.argument.distance = Number.parseFloat(argArray[1]);
	}
}





// bear(bearingDegrees, distance=0) {