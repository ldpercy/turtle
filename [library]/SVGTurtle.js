/* SVGTurtle
*/


import { Turtle } from "./Turtle.js";
import * as turtleCommand from './TurtleCommand.js';

export class SVGTurtle {

	name;
	turtle;
	history = [];
	precision = {};

	constructor(
			name,
			id,
			space,
			reportPrecision = 6,
		) {

		this.name = name;
		this.id = id;
		this.turtle = new Turtle(name, space);
		this.precision.report = reportPrecision;
		this.history.length = 5;
		this.history.push(this.getHistoryItem(this.turtle.coordinates));
		this.history.shift();
	}

	//
	// Accessors
	//

	get x()         { return this.turtle.position.x; }
	get y()         { return this.turtle.position.y; }
	get position()  { return this.turtle.position; }
	get direction() { return this.turtle.position.direction; }
	get svgX()      { return +this.x;}
	get svgY()      { return -this.y; }

	get coordinates()			{ return this.turtle.coordinates; }
	get currentCoordinates()	{ return this.history[this.history.length-1]; }
	get previousCoordinates()	{ return this.history[this.history.length-2]; }




	/** @returns {string} */
	get turtleSvg() {

		let seasonal = '';
		if ((new Date()).getMonth() === 11) {
			seasonal = `
				<polygon style="fill:red" points="-23,-49 5,-97 +23,-49"/>
				<g style="stroke:silver;fill:white;stroke-width:3px">
					<rect x="-24" y="-52" width="48" height="7"/>
					<circle cx="5" cy="-97" r="7"/>
				</g>
			`;
		}

		const result = `
			<g id="${this.id}">
				<g class="turtle terry turtle-hover">
					<title id="title-terry"></title>
					<g class="feet">
						<circle class="fl"/>
						<circle class="fr"/>
						<circle class="bl"/>
						<circle class="br"/>
					</g>
					<circle class="body"/>
					<circle class="head"/>
					<g class="eyes">
						<path d="m -3,-38 a 6,6 0 1 0 -10,0 z"/>
						<path d="m +3,-38 a 6,6 0 1 1 +10,0 z"/>
					</g>
					${seasonal}
				</g>
			</g>
		`;
		return result;
	}



	//
	// mutators
	//


	/**
	 * @param {number} r
	 * @returns {string}
	 */
	circle(r) {
		const result = `<circle cx="${this.svgX}" cy="${this.svgY}" r="${r}"/>`;
		return result;
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * @return {string}
	 */
	rect(width, height) {
		const result = `<rect x="${this.x - width/2}" y="${this.svgY - height/2}" width="${width}" height="${height}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * @return {string}
	 */
	ellipse(width, height) {
		const rx = width / 2;
		const ry = height / 2;
		const result = `<ellipse cx="${this.x}" cy="${this.svgY}" rx="${rx}" ry="${ry}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	/**
	 * @param {string} text
	 * @return {string}
	 */
	text(text) {
		const result = `<text x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">${text}</text>`;
		return result;
	}

	/** marker
	 * @returns {string}
	 */
	marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}





	 /** @returns {string} */
	get report() {
		const originAngle = this.turtle.location.angle;

		//console.debug('coordinates:...', this.turtle.coordinates);
		//console.debug('this.position:...', this.position);


		// title text preserves whitespace, so:
		const result = [
			`turtle: ${this.name}`,
			`cartesian:`,
			`	x: ${this.x.toPrecision(this.precision.report)}`,
			`	y: ${this.y.toPrecision(this.precision.report)}`,
			`direction:`,
			`	${this.position.direction.degrees.toPrecision(this.precision.report)}°`,
			`	${this.position.direction.radians.toPrecision(this.precision.report)} rad`,
			`	${this.position.direction.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.position.direction.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`polar:`,
			`	r: ${this.coordinates.position.radius.toPrecision(this.precision.report)}`,
			`	a: ${originAngle.degrees.toPrecision(this.precision.report)}°`,
			`	a: ${originAngle.radians.toPrecision(this.precision.report)} rad`,
			`	a: ${originAngle.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	a: ${originAngle.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`svg:`,
			`	x: ${this.svgX.toPrecision(this.precision.report)}`,
			`	y: ${this.svgY.toPrecision(this.precision.report)}`,
			//`history:`,
			//`	${this.history.map((item) => { return `direction:${item.direction.degrees}; x:${item.x}; y:${item.y};`;}).join('\n	')}`,
		].join('\n');
		return result;
	}




	/** doCommand
	 * @param {turtleCommand.Command} command
	 * @returns {string}
	 */
	doCommand(command) {

		let result = '';

		//console.trace('SVGTurtle.doCommand');
		//console.debug('SVGTurtle.doCommand', this.position.location.cartesian);
		//console.log(`${this.name}.doCommand:`, command);


		if (this.turtle.commandMap[command.name]) {
			const commandResult = this.turtle.doCommand(command);
		}
		this.history.push(this.getHistoryItem(this.turtle.coordinates));
		this.history.shift();


		if (command.draw) {
			switch(command.name) {
				// presentation only commands
				case 'circle'       : result = this.circle(command.argument.radius); break;
				case 'rect'         : result = this.rect(command.argument.width, command.argument.height); break;
				case 'ellipse'      : result = this.ellipse(command.argument.width, command.argument.height); break;
				case 'text'         : result = this.text(command.argument.text); break;
				case 'marker'       : result = this.marker(); break;

				// turtle movement commands
				case 'move'         :
				case 'left'         :
				case 'right'        :
				case 'bear'         :
				case 'xy'           :
				//case 'xyd'          :
				case 'xyTurn'       :
				case 'origin'       :
					result =  SVGTurtle.getLine(this.previousCoordinates, this.currentCoordinates); break;

				default             :
					console.warn(`[SVGTurtle] Unknown command: ${command}`);
					result = `<!-- [SVGTurtle] Unknown command: ${command} -->`;
					break;
			}
		}

		//console.log(result);
		return result;
	}


	/** @param {Array<turtleCommand.Command>} commandArray */
	doCommands(commandArray) {
		let result = '';
		commandArray.forEach(command => {
			result += this.doCommand(command);
		});

		return result;
	}


	toString() {
		//let result = super.toString();
		let result = `SVGTurtle| x:${this.x.toPrecision(this.precision.report)}; y:${this.y.toPrecision(this.precision.report)}; direction:${this.direction.degrees};`;
		return result;
	}


	/* A shallow copy of a point suitable for sticking into the history array
	*/
	getHistoryItem(turtleCoordinates) {
		//console.log(turtleCoordinates);
		const result = {
			x : turtleCoordinates.position.x,
			y : turtleCoordinates.position.y,
			direction : new this.turtle.space.Angle(turtleCoordinates.direction.degrees),
		};

		return result;
	}


	//
	// Static
	//


	static getLine(point1, point2) {
		//console.debug('SVGTurtle.getLine:', arguments);
		const result = `<line x1="${point1.x}" y1="${-point1.y}" x2="${point2.x}" y2="${-point2.y}"/>`;
		return result;
	}




}/* SVGTurtle */




/*

	<!--
	<g id="turtle-terry">
		<g class="turtle terry turtle-hover">
			<title id="title-terry"></title>
			<g class="feet">
				<circle class="fl"/>
				<circle class="fr"/>
				<circle class="bl"/>
				<circle class="br"/>
			</g>
			<circle class="body"/>
			<circle class="head"/>
			<g class="eyes">
				<path d="m -3,-38 a 6,6 0 1 0 -10,0 z"/>
				<path d="m +3,-38 a 6,6 0 1 1 +10,0 z"/>
			</g>
			<polygon style="fill:red" points="-23,-49 5,-97 +23,-49"/>
			<g style="stroke:silver;fill:white;stroke-width:3px">
				<rect x="-24" y="-52" width="48" height="7"/>
				<circle cx="5" cy="-97" r="7"/>
			</g>


		</g>
	</g>
	-->

	<!--
	<g id="turtle-leonardo" transform="translate(200,0)">
		<g class="turtle ninja raphael turtle-hover">
			<title id="title-terry"></title>
			<g class="feet">
				<circle class="fl"/>
				<circle class="fr"/>
				<circle class="bl"/>
				<circle class="br"/>
			</g>
			<circle class="body"/>
			<circle class="head"/>
			<polygon class="mask" points="-22,-51 +33,-51 +21,-34  -22,-34"/>
			<g class="eyes">
				<path d="m -3,-38 a 6,6 0 1 0 -10,0 z"/>
				<path d="m +3,-38 a 6,6 0 1 1 +10,0 z"/>
				<circle class="pupil pl"/>
				<circle class="pupil pr"/>
			</g>
		</g>
	</g>
	-->

*/
