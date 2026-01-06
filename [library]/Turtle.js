import * as turtleCommand from './TurtleCommand.js';


const numericCommands = ['left', 'right', 'bear', 'move', 'circle', 'ellipse', 'rect', 'xy', 'xyr'];

/* Turtle
*/
export class Turtle {

	#name;
	#space;
	#position;


	commands = [
		'bear',
		'left',
		'right',
		'move',
		'origin',
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
	 * @param {turtleCommand.Move} moveCommand
	 */
	move(moveCommand) {
		this.#position.move(moveCommand.argument.dx, moveCommand.argument.dy);
	}

	/** moveToXY
	 * @param {turtleCommand.Position} positionCommand
	 */
	moveToXY(positionCommand) {
		this.#position.moveToXY(positionCommand.argument.x, positionCommand.argument.y);
	}

	/** moveToXYwithRotate
	 * @param {turtleCommand.Position} positionCommand
	 */
	moveToXYwithRotate(positionCommand) {
		this.#position.moveToXYwithRotate(positionCommand.argument.x, positionCommand.argument.y);
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



	/** doCommand
	 * @param {turtleCommand.Command} command
	 */
	doCommand(command) {
		//console.log(`${this.#name}.doCommand:`, command);
		//let result = '';

		switch(command.name) {
			case 'bear'         : this.bear(command); break;
			case 'left'         : this.left(command); break;
			case 'right'        : this.right(command); break;
			case 'move'         : this.move(command); break;
			case 'xy'           : this.moveToXY(command); break;
			case 'xyr'          : this.moveToXYwithRotate(command); break;
			case 'origin'       : this.toOrigin(); break;
			//case 'marker'       : this.marker; break;

			default             : console.warn(`[Turtle] Unknown command: ${command}`); break;
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


}/* Turtle */
