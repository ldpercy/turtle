import * as space from './PlanarSpace.js';
import * as turtleCommand from './TurtleCommand.js';



/* Turtle
*/
export class Turtle {


	/** @type {string} */		#name;
	/** @type {space.Space} */	#space;
	/** @type {space.Position} */	#position;


	commandMap = {
		'bear'         : this.bear,
		'left'         : this.left,
		'right'        : this.right,
		'move'         : this.move,
		'xy'           : this.moveToXY,
		'xyTurn'       : this.moveToXYandTurn,
		'xyd'          : this.moveToXYD,
		'origin'       : this.toOrigin,
		//'marker'       : this.marker,
	};




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
		//console.log('toOrigin');
		this.#position.resetToOrigin();
	}


	/* bear
	* @param {turtleCommand.bear} bearCommand
	*/
	bear(bearCommand) {
		this.#position.bear(bearCommand.argument.bearingDegrees, bearCommand.argument.distance);
	}/* bear */


	/* @param {turtleCommand.bear} bearCommand */
	left(bearCommand)  { return this.bear(bearCommand) }
	/* @param {turtleCommand.bear} bearCommand */
	right(bearCommand) { return this.bear(bearCommand) }


	/** move
	 * moves dx,dy in the turtles current local frame
	 * @param {turtleCommand.Location} moveCommand
	 */
	move(moveCommand) {
		this.#position.move(moveCommand.argument.x, moveCommand.argument.y);
	}

	/** moveToXY
	 * @param {turtleCommand.Location} locationCommand
	 */
	moveToXY(locationCommand) {
		this.#position.moveToXY(locationCommand.argument.x, locationCommand.argument.y);
	}

	/** moveToXYandTurn
	 * This version adds an implicit turn based upon the path described
	 * @param {turtleCommand.Location} locationCommand
	 */
	moveToXYandTurn(locationCommand) {
		this.#position.moveToXYandTurn(locationCommand.argument.x, locationCommand.argument.y);
	}

	/** moveToXYD
	 * @param {turtleCommand.Position} positionCommand
	 */
	moveToXYD(positionCommand) {
		//this.#position
	}


	//
	// Commands
	//


	/** doCommand
	 * @param {turtleCommand.Command} command
	 */
	doCommand(command) {
		//console.log(`${this.#name}.doCommand:`, command);
		//console.trace();
		//console.debug('doCommand', this.position);



		if (this.commandMap[command.name])
		{
			this.commandMap[command.name].bind(this)(command);			// bind(this) needed here otherwise the command receives the commandMap object as 'this'
		}
		else {
			console.warn(`[Turtle] Unknown command: ${command}`);
		}
	}/* doCommand */


	/** doCommands
	 * Not actually being used at the moment - the one is SVGTurtle is
	 * @param {Array<turtleCommand.Command>} commandArray
	 */
	doCommands(commandArray) {
		commandArray.forEach(command => {
			this.doCommand(command);
		});
	}


	//
	//	Convertors
	//


	/** @return {string} */
	toString() {
		return `Turtle - x:${this.x}; y:${this.y}; direction:${this.#position.direction.degrees};`;
	}




}/* Turtle */
